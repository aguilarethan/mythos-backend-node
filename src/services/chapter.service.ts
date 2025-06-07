import { ChapterModel } from "../models/chapter.model";
import { IChapter } from "../interfaces/chapter.interface";

export const findChapterById = async (id: string) => {
    return ChapterModel.findById(id);
}

export const findChaptersSummaryByNovelId = async (novelId: string) => {
    return ChapterModel.find({ novelId }).select('volumeId chapterNumber title isFree createdAt ').sort({ chapterNumber: 1 });
}

export const saveChapter = async (chapterData: IChapter) => {
    const newChapter = new ChapterModel(chapterData);
    return newChapter.save();
}

export const findChapterByIdAndUpdate = async (id: string, updatedChapterData: Partial<IChapter>) => { 
    return ChapterModel.findByIdAndUpdate(id, updatedChapterData, { new: true });
}

export const findChapterByIdAndDelete = async (id: string) => {
    return ChapterModel.findByIdAndDelete(id);
}
