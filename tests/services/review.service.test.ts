import {
    findReviewsByNovelId,
    saveReview
} from "../../src/services/review.service";

import { ReviewModel } from "../../src/models/review.model";

jest.mock("../../src/models/review.model", () => ({
    ReviewModel: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({ _id: "review123", ...data })
    }))
}));

// Añadir métodos estáticos al mock
(ReviewModel as any).find = jest.fn();

describe("Review Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("findReviewsByNovelId llama a ReviewModel.find con novelId y sort por createdAt", async () => {
        const mockCursor = {
            sort: jest.fn().mockResolvedValue([
                { _id: "review1", novelId: "novel123", rating: 5, comment: "Excelente" },
                { _id: "review2", novelId: "novel123", rating: 4, comment: "Muy buena" }
            ])
        };

        (ReviewModel.find as jest.Mock).mockReturnValue(mockCursor);

        const result = await findReviewsByNovelId("novel123");

        expect(ReviewModel.find).toHaveBeenCalledWith({ novelId: "novel123" });
        expect(mockCursor.sort).toHaveBeenCalledWith({ createdAt: -1 });
        expect(result).toEqual([
            { _id: "review1", novelId: "novel123", rating: 5, comment: "Excelente" },
            { _id: "review2", novelId: "novel123", rating: 4, comment: "Muy buena" }
        ]);
    });

    it("findReviewsByNovelId devuelve array vacío cuando no hay reviews", async () => {
        const mockCursor = {
            sort: jest.fn().mockResolvedValue([])
        };

        (ReviewModel.find as jest.Mock).mockReturnValue(mockCursor);

        const result = await findReviewsByNovelId("nonexistent");

        expect(ReviewModel.find).toHaveBeenCalledWith({ novelId: "nonexistent" });
        expect(mockCursor.sort).toHaveBeenCalledWith({ createdAt: -1 });
        expect(result).toEqual([]);
    });

    it("saveReview crea una nueva reseña y llama a save()", async () => {
        const reviewData = {
            novelId: "novel123",
            reviewerAccountId: "user456",
            rating: 5,
            comment: "Increíble historia, muy recomendada"
        };
        const mockSavedReview = { _id: "review123", ...reviewData };

        const result = await saveReview(reviewData as any);

        expect(ReviewModel).toHaveBeenCalledWith(reviewData);
        expect(result).toEqual(mockSavedReview);
    });

    it("saveReview maneja correctamente datos mínimos requeridos", async () => {
        const minimalReviewData = {
            novelId: "novel789",
            reviewerAccountId: "user999",
            rating: 3
        };
        const mockSavedReview = { _id: "review123", ...minimalReviewData };

        const result = await saveReview(minimalReviewData as any);

        expect(ReviewModel).toHaveBeenCalledWith(minimalReviewData);
        expect(result).toEqual(mockSavedReview);
    });

    it("saveReview propaga errores del modelo", async () => {
        const reviewData = {
            novelId: "novel123",
            reviewerAccountId: "user456",
            rating: 4,
            comment: "Buena novela"
        };

        // Configurar el mock para que save() lance un error
        const mockSave = jest.fn().mockRejectedValue(new Error("Error de base de datos"));
        (ReviewModel as any).mockImplementation((data: any) => ({
            ...data,
            save: mockSave
        }));

        await expect(saveReview(reviewData as any)).rejects.toThrow("Error de base de datos");
        expect(ReviewModel).toHaveBeenCalledWith(reviewData);
    });
});