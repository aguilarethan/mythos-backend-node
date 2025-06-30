import {
    findPreferencesByAccountId,
    savePreferences,
    findPreferencesByAccountIdAndUpdate
} from "../../src/services/reading-preferences-settings.service";

import { ReadingPreferencesSettingsModel } from "../../src/models/reading-preferences-settings.model";

jest.mock("../../src/models/reading-preferences-settings.model", () => ({
    ReadingPreferencesSettingsModel: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({ _id: "pref123", ...data })
    }))
}));

// Añadir métodos estáticos al mock
(ReadingPreferencesSettingsModel as any).findOne = jest.fn();
(ReadingPreferencesSettingsModel as any).findOneAndUpdate = jest.fn();

describe("Reading Preferences Settings Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("findPreferencesByAccountId llama a ReadingPreferencesSettingsModel.findOne con el accountId", async () => {
        const mockPreferences = { 
            _id: "pref123", 
            accountId: "user123",
            fontSize: 16,
            theme: "light"
        };
        
        (ReadingPreferencesSettingsModel.findOne as jest.Mock).mockResolvedValue(mockPreferences);

        const result = await findPreferencesByAccountId("user123");

        expect(ReadingPreferencesSettingsModel.findOne).toHaveBeenCalledWith({ accountId: "user123" });
        expect(result).toEqual(mockPreferences);
    });

    it("findPreferencesByAccountId devuelve null cuando no se encuentran preferencias", async () => {
        (ReadingPreferencesSettingsModel.findOne as jest.Mock).mockResolvedValue(null);

        const result = await findPreferencesByAccountId("nonexistent");

        expect(ReadingPreferencesSettingsModel.findOne).toHaveBeenCalledWith({ accountId: "nonexistent" });
        expect(result).toBeNull();
    });

    it("savePreferences crea nuevas preferencias y llama a save()", async () => {
        const preferencesData = {
            accountId: "user456",
            fontSize: 18,
            theme: "dark",
            fontFamily: "Arial"
        };
        const mockSavedPreferences = { _id: "pref123", ...preferencesData };

        const result = await savePreferences(preferencesData as any);

        expect(ReadingPreferencesSettingsModel).toHaveBeenCalledWith(preferencesData);
        expect(result).toEqual(mockSavedPreferences);
    });

    it("savePreferences maneja correctamente datos mínimos requeridos", async () => {
        const minimalPreferencesData = {
            accountId: "user789"
        };
        const mockSavedPreferences = { _id: "pref123", ...minimalPreferencesData };

        const result = await savePreferences(minimalPreferencesData as any);

        expect(ReadingPreferencesSettingsModel).toHaveBeenCalledWith(minimalPreferencesData);
        expect(result).toEqual(mockSavedPreferences);
    });

    it("findPreferencesByAccountIdAndUpdate llama a ReadingPreferencesSettingsModel.findOneAndUpdate con los parámetros correctos", async () => {
        const updatedPreferences = { 
            _id: "pref123", 
            accountId: "user123",
            fontSize: 20,
            theme: "dark"
        };
        const updateData = { fontSize: 20, theme: "dark" };
        
        (ReadingPreferencesSettingsModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedPreferences);

        const result = await findPreferencesByAccountIdAndUpdate("user123", updateData);

        expect(ReadingPreferencesSettingsModel.findOneAndUpdate).toHaveBeenCalledWith(
            { accountId: "user123" },
            updateData,
            { new: true }
        );
        expect(result).toEqual(updatedPreferences);
    });

    it("findPreferencesByAccountIdAndUpdate devuelve null cuando no se encuentra el documento", async () => {
        (ReadingPreferencesSettingsModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

        const result = await findPreferencesByAccountIdAndUpdate("nonexistent", { fontSize: 14 });

        expect(ReadingPreferencesSettingsModel.findOneAndUpdate).toHaveBeenCalledWith(
            { accountId: "nonexistent" },
            { fontSize: 14 },
            { new: true }
        );
        expect(result).toBeNull();
    });

    it("savePreferences propaga errores del modelo", async () => {
        const preferencesData = {
            accountId: "user123",
            fontSize: 16
        };

        // Configurar el mock para que save() lance un error
        const mockSave = jest.fn().mockRejectedValue(new Error("Error de base de datos"));
        (ReadingPreferencesSettingsModel as any).mockImplementation((data: any) => ({
            ...data,
            save: mockSave
        }));

        await expect(savePreferences(preferencesData as any)).rejects.toThrow("Error de base de datos");
        expect(ReadingPreferencesSettingsModel).toHaveBeenCalledWith(preferencesData);
    });
});