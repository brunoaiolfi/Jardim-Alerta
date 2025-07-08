import { Result } from "../../../domain/result/model/Result";

export enum ImagePickMethod {
    CAMERA = "camera",
    GALLERY = "gallery",
}

export interface IImagePickerImplementation {
    pickImage(method: ImagePickMethod): Promise<Result<string>>;
}
