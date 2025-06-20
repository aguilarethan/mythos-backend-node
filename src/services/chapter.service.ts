import { ChapterModel } from "../models/chapter.model";
import { IChapter } from "../interfaces/chapter.interface";

export const findChapterById = async (id: string) => {
    return ChapterModel.findById(id);
}

export const saveChapter = async (chapterData: IChapter) => {

    const lastChapter = await ChapterModel.findOne({ novelId: chapterData.novelId }, { chapterNumber: 1 }).sort({ chapterNumber: -1});
    const nextChapterNumber = lastChapter?.chapterNumber ? lastChapter.chapterNumber + 1 : 1;

    const newChapter = new ChapterModel({ ...chapterData, chapterNumber: nextChapterNumber });
    return newChapter.save();
}

export const findChaptersByNovelId = async (novelId: string) => {
  return ChapterModel.find({ novelId }).sort({ chapterNumber: 1 }); // ordenados por número de capítulo ascendente
};