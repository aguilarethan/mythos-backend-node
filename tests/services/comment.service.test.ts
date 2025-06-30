import {
    getCommentsByChapterId,
    saveComment,
    saveReply
} from "../../src/services/comment.service";

import { CommentModel } from "../../src/models/comment.model";
import { CustomError } from "../../src/utils/CustomError";

// Mock de CommentModel
jest.mock("../../src/models/comment.model", () => ({
    CommentModel: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({ _id: "comment123", ...data })
    }))
}));

// Mock de CustomError
jest.mock("../../src/utils/CustomError");

// Añadir métodos estáticos al mock de CommentModel
(CommentModel as any).find = jest.fn();
(CommentModel as any).findById = jest.fn();

describe("Comment Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getCommentsByChapterId", () => {
        it("devuelve comentarios filtrados por chapterId", async () => {
            const mockComments = [
                { _id: "1", chapterId: "chapter123", content: "Great chapter!" },
                { _id: "2", chapterId: "chapter123", content: "Loved it!" }
            ];

            (CommentModel.find as jest.Mock).mockResolvedValue(mockComments);

            const result = await getCommentsByChapterId("chapter123");

            expect(CommentModel.find).toHaveBeenCalledWith({ chapterId: "chapter123" });
            expect(result).toEqual(mockComments);
        });

        it("devuelve array vacío cuando no hay comentarios", async () => {
            (CommentModel.find as jest.Mock).mockResolvedValue([]);

            const result = await getCommentsByChapterId("chapter123");

            expect(CommentModel.find).toHaveBeenCalledWith({ chapterId: "chapter123" });
            expect(result).toEqual([]);
        });
    });

    describe("saveComment", () => {
        it("crea y guarda un nuevo comentario", async () => {
            const commentData = {
                chapterId: "chapter123",
                content: "This is a test comment",
                authorId: "user123"
            };

            const result = await saveComment(commentData as any);

            expect(CommentModel).toHaveBeenCalledWith(commentData);
            expect(result).toEqual({
                _id: "comment123",
                ...commentData
            });
        });

        it("saveComment propaga errores del modelo", async () => {
            const commentData = {
                chapterId: "chapter123",
                content: "This is a test comment",
                authorId: "user123"
            };

            // Configurar el mock para que save() lance un error
            const mockSave = jest.fn().mockRejectedValue(new Error("Error de base de datos"));
            (CommentModel as any).mockImplementation((data: any) => ({
                ...data,
                save: mockSave
            }));

            await expect(saveComment(commentData as any)).rejects.toThrow("Error de base de datos");
            expect(CommentModel).toHaveBeenCalledWith(commentData);
        });
    });

    describe("saveReply", () => {
        it("agrega una respuesta a un comentario existente", async () => {
            const mockComment = {
                _id: "comment123",
                content: "Original comment",
                replies: [],
                save: jest.fn().mockResolvedValue({
                    _id: "comment123",
                    content: "Original comment",
                    replies: [{ content: "Test reply", authorId: "user456" }]
                })
            };

            const replyData = {
                content: "Test reply",
                authorId: "user456"
            };

            (CommentModel.findById as jest.Mock).mockResolvedValue(mockComment);

            const result = await saveReply("comment123", replyData as any);

            expect(CommentModel.findById).toHaveBeenCalledWith("comment123");
            expect(mockComment.replies).toContain(replyData);
            expect(mockComment.save).toHaveBeenCalled();
            expect(result).toEqual({
                _id: "comment123",
                content: "Original comment",
                replies: [{ content: "Test reply", authorId: "user456" }]
            });
        });

        it("lanza CustomError cuando el comentario no existe", async () => {
            const replyData = {
                content: "Test reply",
                authorId: "user456"
            };

            (CommentModel.findById as jest.Mock).mockResolvedValue(null);
            (CustomError as any).mockImplementation((message: string, statusCode: number) => {
                const error = new Error(message);
                (error as any).statusCode = statusCode;
                return error;
            });

            await expect(saveReply("nonexistent", replyData as any))
                .rejects
                .toThrow("El comentario no se encontró");
            
            expect(CommentModel.findById).toHaveBeenCalledWith("nonexistent");
            expect(CustomError).toHaveBeenCalledWith("El comentario no se encontró", 404);
        });
    });
});