import { NovelModel } from "../models/novel.model";
import { ChapterModel } from "../models/chapter.model";
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

export const getAllNovelStats = async (
  contentStats: Array<{
    contentId: string;
    totalPurchases: number;
    totalMythras: number;
    pricePerPurchase: number;
  }>
) => {
  const novels = await NovelModel.find().lean(); // Todas las novelas

  const chapterIds = contentStats.map(stat => stat.contentId);

  const chapters = await ChapterModel.find({
    _id: { $in: chapterIds }
  }).lean();

  const statsMap = new Map(
    contentStats.map(stat => [stat.contentId, stat])
  );

  const response = novels.map(novel => {
    const novelChapters = chapters.filter(ch => ch.novelId.toString() === novel._id.toString());

    const enrichedChapters = novelChapters
      .filter(ch => statsMap.has(ch._id.toString()))
      .map(ch => {
        const stat = statsMap.get(ch._id.toString());
        return {
          id: ch._id.toString(),
          title: ch.title,
          chapterNumber: ch.chapterNumber,
          priceMythras: ch.priceMythras,
          totalPurchases: stat?.totalPurchases ?? 0,
          totalMythras: stat?.totalMythras ?? 0
        };
      });

    const totalMythras = enrichedChapters.reduce((sum, ch) => sum + ch.totalMythras, 0);

    return {
      novelId: novel._id.toString(),
      title: novel.title,
      coverImageUrl: novel.coverImageUrl,
      writerName: novel.writerName, // ← se agrega directamente del documento de novela
      totalMythras,
      chapters: enrichedChapters
    };
  }).filter(novel => novel.chapters.length > 0);

  return response;
};
