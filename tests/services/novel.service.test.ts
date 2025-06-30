import {
    findNovelById,
    findNovelsByTitleMatch,
    findNovelsByWriterAccountId,
    findLastThreeNovelsPreview,
    findEightMostViewedNovelsPreview,
    saveNovel,
    findNovelByIdAndUpdate,
    findNovelByIdAndDelete
} from "../../src/services/novel.service";

import { NovelModel } from "../../src/models/novel.model";

jest.mock("../../src/models/novel.model", () => ({
    NovelModel: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({ _id: "456", ...data })
    }))
}));

// Añadir métodos estáticos al mock
(NovelModel as any).findById = jest.fn();
(NovelModel as any).find = jest.fn();
(NovelModel as any).findByIdAndUpdate = jest.fn();
(NovelModel as any).findByIdAndDelete = jest.fn();

describe("Novel Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("findNovelById devuelve el resultado de NovelModel.findById y actualiza las views", async () => {
        const mockNovel = { 
            _id: "123", 
            title: "Test Novel", 
            views: 5,
            save: jest.fn().mockResolvedValue(true)
        };
        
        (NovelModel.findById as jest.Mock).mockResolvedValue(mockNovel);

        const result = await findNovelById("123");

        expect(NovelModel.findById).toHaveBeenCalledWith("123");
        expect(mockNovel.views).toBe(6); // Se incrementó en 1
        expect(mockNovel.save).toHaveBeenCalled();
        expect(result).toEqual(mockNovel);
    });

    it("findNovelById devuelve null cuando la novela no existe", async () => {
        (NovelModel.findById as jest.Mock).mockResolvedValue(null);

        const result = await findNovelById("nonexistent");

        expect(NovelModel.findById).toHaveBeenCalledWith("nonexistent");
        expect(result).toBeNull();
    });

    it("findNovelsByTitleMatch llama a NovelModel.find con el regex correcto", async () => {
        const mockNovels = [{ title: "Test 1" }, { title: "Test 2" }];
        (NovelModel.find as jest.Mock).mockResolvedValue(mockNovels);

        const result = await findNovelsByTitleMatch("Test");

        expect(NovelModel.find).toHaveBeenCalledWith({
            title: { $regex: "Test", $options: "i" }
        });
        expect(result).toEqual(mockNovels);
    });

    it("findNovelsByWriterAccountId llama a NovelModel.find con el writerAccountId", async () => {
        const mockNovels = [{ writerAccountId: "writer123" }];
        (NovelModel.find as jest.Mock).mockResolvedValue(mockNovels);

        const result = await findNovelsByWriterAccountId("writer123");

        expect(NovelModel.find).toHaveBeenCalledWith({
            writerAccountId: "writer123"
        });
        expect(result).toEqual(mockNovels);
    });

    it("findLastThreeNovelsPreview llama a NovelModel.find con campos de preview, sort y limit", async () => {
        const mockCursor = {
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{ title: "Latest Novel" }])
        };

        (NovelModel.find as jest.Mock).mockReturnValue(mockCursor);

        const result = await findLastThreeNovelsPreview();

        expect(NovelModel.find).toHaveBeenCalledWith(
            {},
            {
                _id: 1,
                writerAccountId: 1,
                title: 1,
                description: 1,
                coverImageUrl: 1
            }
        );

        expect(mockCursor.sort).toHaveBeenCalledWith({ createdAt: -1 });
        expect(mockCursor.limit).toHaveBeenCalledWith(3);
        expect(result).toEqual([{ title: "Latest Novel" }]);
    });

    it("findEightMostViewedNovelsPreview llama a NovelModel.find con campos de preview, sort y limit", async () => {
        const mockCursor = {
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{ title: "Most Viewed Novel" }])
        };

        (NovelModel.find as jest.Mock).mockReturnValue(mockCursor);

        const result = await findEightMostViewedNovelsPreview();

        expect(NovelModel.find).toHaveBeenCalledWith(
            {},
            {
                _id: 1,
                writerAccountId: 1,
                title: 1,
                genres: 1,
                coverImageUrl: 1
            }
        );

        expect(mockCursor.sort).toHaveBeenCalledWith({ views: -1 });
        expect(mockCursor.limit).toHaveBeenCalledWith(8);
        expect(result).toEqual([{ title: "Most Viewed Novel" }]);
    });

    it("saveNovel crea una nueva novela y llama a save()", async () => {
        const novelData = { title: "New Novel" };
        const mockSavedNovel = { _id: "456", ...novelData };

        // El constructor mock ya está configurado para devolver un objeto con save()
        const result = await saveNovel(novelData as any);

        expect(NovelModel).toHaveBeenCalledWith(novelData);
        expect(result).toEqual(mockSavedNovel);
    });

    it("findNovelByIdAndUpdate llama a NovelModel.findByIdAndUpdate con los parámetros correctos", async () => {
        const updatedNovel = { _id: "123", title: "Updated Novel" };
        (NovelModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedNovel);

        const result = await findNovelByIdAndUpdate("123", { title: "Updated Novel" });

        expect(NovelModel.findByIdAndUpdate).toHaveBeenCalledWith(
            "123",
            { title: "Updated Novel" },
            { new: true }
        );
        expect(result).toEqual(updatedNovel);
    });

    it("findNovelByIdAndDelete llama a NovelModel.findByIdAndDelete con el id", async () => {
        const deletedNovel = { _id: "123", title: "Deleted Novel" };
        (NovelModel.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedNovel);

        const result = await findNovelByIdAndDelete("123");

        expect(NovelModel.findByIdAndDelete).toHaveBeenCalledWith("123");
        expect(result).toEqual(deletedNovel);
    });
});