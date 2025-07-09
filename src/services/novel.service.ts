import { NovelModel } from "../models/novel.model";
import { INovel } from "../interfaces/novel.interface";

export const findNovelById = async (id: string) => {
    const novel = await NovelModel.findById(id);
    if (novel) {
        novel.views += 1;
        await novel.save();
    }
    return novel;
}

export const findNovelsByTitleMatch = async (title: string) => {
    return NovelModel.find({ title: { $regex: title, $options: 'i' } }, { _id: 1, writerAccountId: 1, writerName: 1, title: 1, genres: 1, coverImageUrl: 1 }).sort({ createdAt: -1 });
}

export const findNovelsByWriterAccountId = async (writerAccountId: string) => {
    return NovelModel.find({ writerAccountId }, { _id: 1, writerAccountId: 1, title: 1, coverImageUrl: 1, genres: 1}).sort({ createdAt: -1 });
}

export const findNovelsByGenre = async (genre: string) => {
    return NovelModel.find({ genres: genre }, { _id: 1, writerAccountId: 1, writerName: 1, title: 1, coverImageUrl: 1, genres: 1, }).sort({ createdAt: -1 });
}


export const findLastThreeNovelsPreview = async () => {
    return NovelModel.find({}, { _id: 1, writerAccountId: 1, writerName: 1, title: 1, description: 1, coverImageUrl: 1 }).sort({ createdAt: -1 }).limit(3);
}

export const findEightMostViewedNovelsPreview = async () => {
    return NovelModel.find({}, { _id: 1, writerAccountId: 1, title: 1, genres: 1, coverImageUrl: 1 }).sort({ views: -1 }).limit(8);
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