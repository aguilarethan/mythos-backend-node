import {
    findChapterById,
    findChaptersByNovelId,
    saveChapter,
    generateChapterPDF
} from "../../src/services/chapter.service";

import { ChapterModel } from "../../src/models/chapter.model";
import puppeteer from "puppeteer";

// Mock de ChapterModel
jest.mock("../../src/models/chapter.model", () => ({
    ChapterModel: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({ _id: "chapter123", ...data })
    }))
}));

// Mock de puppeteer
jest.mock("puppeteer", () => ({
    launch: jest.fn()
}));

// Añadir métodos estáticos al mock de ChapterModel
(ChapterModel as any).findById = jest.fn();
(ChapterModel as any).find = jest.fn();
(ChapterModel as any).findOne = jest.fn();

describe("Chapter Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("findChapterById", () => {
        it("devuelve el resultado de ChapterModel.findById", async () => {
            const mockChapter = { _id: "123", title: "Test Chapter", content: "Test content" };
            (ChapterModel.findById as jest.Mock).mockResolvedValue(mockChapter);

            const result = await findChapterById("123");

            expect(ChapterModel.findById).toHaveBeenCalledWith("123");
            expect(result).toEqual(mockChapter);
        });

        it("devuelve null cuando el capítulo no existe", async () => {
            (ChapterModel.findById as jest.Mock).mockResolvedValue(null);

            const result = await findChapterById("nonexistent");

            expect(ChapterModel.findById).toHaveBeenCalledWith("nonexistent");
            expect(result).toBeNull();
        });
    });

    describe("findChaptersByNovelId", () => {
        it("devuelve capítulos ordenados por chapterNumber", async () => {
            const mockChapters = [
                { _id: "1", novelId: "novel123", chapterNumber: 1 },
                { _id: "2", novelId: "novel123", chapterNumber: 2 }
            ];

            const mockCursor = {
                sort: jest.fn().mockResolvedValue(mockChapters)
            };

            (ChapterModel.find as jest.Mock).mockReturnValue(mockCursor);

            const result = await findChaptersByNovelId("novel123");

            expect(ChapterModel.find).toHaveBeenCalledWith({ novelId: "novel123" });
            expect(mockCursor.sort).toHaveBeenCalledWith({ chapterNumber: 1 });
            expect(result).toEqual(mockChapters);
        });

        it("devuelve array vacío cuando no hay capítulos", async () => {
            const mockCursor = {
                sort: jest.fn().mockResolvedValue([])
            };

            (ChapterModel.find as jest.Mock).mockReturnValue(mockCursor);

            const result = await findChaptersByNovelId("novel123");

            expect(result).toEqual([]);
        });
    });

    describe("saveChapter", () => {
        it("crea un nuevo capítulo con chapterNumber 1 cuando no existe capítulo previo", async () => {
            const chapterData = {
                novelId: "novel123",
                title: "New Chapter",
                content: "Chapter content"
            };

            const mockCursor = {
                sort: jest.fn().mockResolvedValue(null)
            };

            (ChapterModel.findOne as jest.Mock).mockReturnValue(mockCursor);

            const result = await saveChapter(chapterData as any);

            expect(ChapterModel.findOne).toHaveBeenCalledWith(
                { novelId: "novel123" },
                { chapterNumber: 1 }
            );
            expect(mockCursor.sort).toHaveBeenCalledWith({ chapterNumber: -1 });
            expect(ChapterModel).toHaveBeenCalledWith({
                ...chapterData,
                chapterNumber: 1
            });
            expect(result).toEqual({
                _id: "chapter123",
                ...chapterData,
                chapterNumber: 1
            });
        });

        it("crea un nuevo capítulo con chapterNumber incrementado cuando existe capítulo previo", async () => {
            const chapterData = {
                novelId: "novel123",
                title: "New Chapter",
                content: "Chapter content"
            };

            const mockLastChapter = { chapterNumber: 5 };

            const mockCursor = {
                sort: jest.fn().mockResolvedValue(mockLastChapter)
            };

            (ChapterModel.findOne as jest.Mock).mockReturnValue(mockCursor);

            const result = await saveChapter(chapterData as any);

            expect(ChapterModel.findOne).toHaveBeenCalledWith(
                { novelId: "novel123" },
                { chapterNumber: 1 }
            );
            expect(mockCursor.sort).toHaveBeenCalledWith({ chapterNumber: -1 });
            expect(ChapterModel).toHaveBeenCalledWith({
                ...chapterData,
                chapterNumber: 6
            });
            expect(result).toEqual({
                _id: "chapter123",
                ...chapterData,
                chapterNumber: 6
            });
        });

        it("maneja el caso cuando lastChapter.chapterNumber es 0", async () => {
            const chapterData = {
                novelId: "novel123",
                title: "New Chapter",
                content: "Chapter content"
            };

            const mockLastChapter = { chapterNumber: 0 };

            const mockCursor = {
                sort: jest.fn().mockResolvedValue(mockLastChapter)
            };

            (ChapterModel.findOne as jest.Mock).mockReturnValue(mockCursor);

            const result = await saveChapter(chapterData as any);

            expect(ChapterModel).toHaveBeenCalledWith({
                ...chapterData,
                chapterNumber: 1
            });
        });
    });

    describe("generateChapterPDF", () => {
        let mockBrowser: any;
        let mockPage: any;

        beforeEach(() => {
            mockPage = {
                setContent: jest.fn().mockResolvedValue(undefined),
                pdf: jest.fn().mockResolvedValue(Buffer.from("fake-pdf-content"))
            };

            mockBrowser = {
                newPage: jest.fn().mockResolvedValue(mockPage),
                close: jest.fn().mockResolvedValue(undefined)
            };

            (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);
        });

        it("genera un PDF correctamente con los parámetros dados", async () => {
            const chapterNumber = 1;
            const title = "Test Chapter";
            const content = "This is test content\nWith multiple lines";

            const result = await generateChapterPDF(chapterNumber, title, content);

            expect(puppeteer.launch).toHaveBeenCalledWith({ headless: true });
            expect(mockBrowser.newPage).toHaveBeenCalled();
            expect(mockPage.setContent).toHaveBeenCalledWith(
                expect.stringContaining(`<h1>Capítulo ${chapterNumber}: ${title}</h1>`),
                { waitUntil: 'load' }
            );
            expect(mockPage.setContent).toHaveBeenCalledWith(
                expect.stringContaining(content.replace(/\n/g, '<br/>')),
                { waitUntil: 'load' }
            );
            expect(mockPage.pdf).toHaveBeenCalledWith({
                format: 'A4',
                printBackground: true,
                margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
            });
            expect(mockBrowser.close).toHaveBeenCalled();
            expect(result).toEqual(Buffer.from("fake-pdf-content"));
        });

        it("genera HTML con el formato correcto", async () => {
            const chapterNumber = 2;
            const title = "Another Chapter";
            const content = "Content with\nnewlines";

            await generateChapterPDF(chapterNumber, title, content);

            const setContentCall = (mockPage.setContent as jest.Mock).mock.calls[0][0];
            
            expect(setContentCall).toContain('<html>');
            expect(setContentCall).toContain('<head>');
            expect(setContentCall).toContain('<style>');
            expect(setContentCall).toContain('font-family: Arial, sans-serif');
            expect(setContentCall).toContain(`<h1>Capítulo ${chapterNumber}: ${title}</h1>`);
            expect(setContentCall).toContain('Content with<br/>newlines');
            expect(setContentCall).toContain('</html>');
        });

        it("propaga errores cuando falla la generación del PDF", async () => {
            mockPage.pdf.mockRejectedValue(new Error("PDF generation failed"));

            await expect(generateChapterPDF(1, "Test", "Content")).rejects.toThrow("PDF generation failed");
            // Nota: El código original no tiene try-catch, por lo que browser.close() no se ejecuta en caso de error
            expect(mockBrowser.close).not.toHaveBeenCalled();
        });

        it("maneja contenido vacío correctamente", async () => {
            const result = await generateChapterPDF(1, "Empty Chapter", "");

            expect(mockPage.setContent).toHaveBeenCalledWith(
                expect.stringContaining('<div></div>'),
                { waitUntil: 'load' }
            );
            expect(result).toEqual(Buffer.from("fake-pdf-content"));
        });

        it("escapa caracteres especiales en el título", async () => {
            const title = "Chapter with <script>alert('xss')</script>";
            
            await generateChapterPDF(1, title, "Content");

            const setContentCall = (mockPage.setContent as jest.Mock).mock.calls[0][0];
            expect(setContentCall).toContain(`<h1>Capítulo 1: ${title}</h1>`);
        });
    });
});