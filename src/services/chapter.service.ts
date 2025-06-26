import { ChapterModel } from "../models/chapter.model";
import { IChapter } from "../interfaces/chapter.interface";
import puppeteer from "puppeteer";

export const findChapterById = async (id: string) => {
    return ChapterModel.findById(id);
}

export const saveChapter = async (chapterData: IChapter) => {

    const lastChapter = await ChapterModel.findOne({ novelId: chapterData.novelId }, { chapterNumber: 1 }).sort({ chapterNumber: -1});
    const nextChapterNumber = lastChapter?.chapterNumber ? lastChapter.chapterNumber + 1 : 1;

    const newChapter = new ChapterModel({ ...chapterData, chapterNumber: nextChapterNumber });
    return newChapter.save();
}

export const generateChapterPDF = async (chapterNumber: number, title: string, content: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; font-size: 14px; }
          h1 { font-size: 22px; margin-bottom: 20px; }
          p { margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <h1>Capítulo ${chapterNumber}: ${title}</h1>
        <div>${content.replace(/\n/g, '<br/>')}</div>
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'load' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' },
  });

  await browser.close();

  return pdfBuffer;
};