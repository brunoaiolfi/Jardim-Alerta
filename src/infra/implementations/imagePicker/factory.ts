import { GetPermissionsImplementation } from '../permissions/factory';
import { ImagePickerImplementation } from './ImagePicker';

export function GetImagePickerImplementation() {
    const permissionsImplementation = GetPermissionsImplementation();
    return new ImagePickerImplementation(permissionsImplementation);
}