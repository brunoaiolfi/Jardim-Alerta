import {
    launchCamera,
    launchImageLibrary,
    Asset,
} from "react-native-image-picker";
import { IImagePickerImplementation, ImagePickMethod } from "./IImagePicker";
import { IPermissionsImplementation } from "../permissions/IPermissions";
import { PERMISSIONS } from "react-native-permissions";
import { Result } from "../../../domain/result/model/Result";

export class ImagePickerImplementation implements IImagePickerImplementation {

    private readonly _permissionsImplementation: IPermissionsImplementation;

    constructor(permissionsImplementation: IPermissionsImplementation) {
        this._permissionsImplementation = permissionsImplementation;
    }

    async pickImage(method: ImagePickMethod): Promise<Result<string>> {
        const hasPermission = await this._permissionsImplementation.askPermission(
            method == ImagePickMethod.CAMERA ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );

        if (!hasPermission) return Result.Fail("Ação cancelada ou sem permissão.");

        return new Promise((resolve) => {
            const callback = (response: { assets?: Asset[]; didCancel?: boolean; errorCode?: string }) => {
                if (response.didCancel || response.errorCode || !response.assets?.[0]?.uri) {
                    resolve(Result.Fail("Ação cancelada!"));
                } else {
                    resolve(Result.Ok(response.assets[0].uri!));
                }
            };

            if (method === ImagePickMethod.CAMERA) {
                launchCamera({ mediaType: "photo", quality: 1 }, callback);
            } else {
                launchImageLibrary({ mediaType: "photo", quality: 1 }, callback);
            }
        });
    }
}
