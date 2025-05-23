import { NovelModel } from "../models/novel.model";
import { INovel } from "../interfaces/novel.interface";
import { writer } from "repl";

export const findNovelById = async (id: string) => {
    return NovelModel.findById(id);
}

export const findNovelsByTitleMatch = async (title: string) => {
    return NovelModel.find({ title: { $regex: title, $options: 'i' } });
}

export const findNovelsByWriterAccountId = async (writerAccountId: string) => {
    return NovelModel.find({ writerAccountId });
}

export const saveNovel = async (novelData: INovel) => {
    const newNovel = new NovelModel(novelData);
    return newNovel.save();
}

export const findNovelByIdAndUpdate = async (id: string, updatedNovelData: Partial<INovel>) => { 
    return NovelModel.findByIdAndUpdate(id, updatedNovelData, { new: true });
}

export const findNovelByIdAndDelete = async (id: string) => {
    return NovelModel.findByIdAndDelete(id);
}