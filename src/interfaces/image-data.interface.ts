export interface IImageData {
    imageId: string; 
    imageUrl: string;
    imageName: string;
    size: number; 
    format: string; 
    width?: number;
    height?: number;
    createdAt?: Date; 
    updatedAt?: Date;
}