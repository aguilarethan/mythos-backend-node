import { NovelReportModel } from "../models/novel-report.model";
import { INovelReport } from "../interfaces/novel-report.interface";

export const saveNovelReport = async (novelReportData: INovelReport) => {
    const newNovelReport = new NovelReportModel(novelReportData);
    return newNovelReport.save();
}