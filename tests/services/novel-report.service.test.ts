import { saveNovelReport } from "../../src/services/novel-report.service";
import { NovelReportModel } from "../../src/models/novel-report.model";

jest.mock("../../src/models/novel-report.model", () => ({
    NovelReportModel: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({ _id: "report123", ...data })
    }))
}));

describe("Novel Report Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("saveNovelReport crea un nuevo reporte de novela y llama a save()", async () => {
        const novelReportData = {
            novelId: "novel123",
            reporterAccountId: "user456",
            reason: "Contenido inapropiado",
            description: "La novela contiene contenido ofensivo"
        };
        const mockSavedReport = { _id: "report123", ...novelReportData };

        // El constructor mock ya está configurado para devolver un objeto con save()
        const result = await saveNovelReport(novelReportData as any);

        expect(NovelReportModel).toHaveBeenCalledWith(novelReportData);
        expect(result).toEqual(mockSavedReport);
    });

    it("saveNovelReport maneja correctamente datos mínimos requeridos", async () => {
        const minimalReportData = {
            novelId: "novel789",
            reporterAccountId: "user999",
            reason: "Spam"
        };
        const mockSavedReport = { _id: "report123", ...minimalReportData };

        const result = await saveNovelReport(minimalReportData as any);

        expect(NovelReportModel).toHaveBeenCalledWith(minimalReportData);
        expect(result).toEqual(mockSavedReport);
    });

    it("saveNovelReport propaga errores del modelo", async () => {
        const novelReportData = {
            novelId: "novel123",
            reporterAccountId: "user456",
            reason: "Violación de términos"
        };

        // Configurar el mock para que save() lance un error
        const mockSave = jest.fn().mockRejectedValue(new Error("Error de base de datos"));
        (NovelReportModel as any).mockImplementation((data: any) => ({
            ...data,
            save: mockSave
        }));

        await expect(saveNovelReport(novelReportData as any)).rejects.toThrow("Error de base de datos");
        expect(NovelReportModel).toHaveBeenCalledWith(novelReportData);
    });
});