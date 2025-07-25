import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface IBaseFirebaseStore<T> {
    create(item: T): Promise<FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>>;
    update(id: string, item: T): Promise<void>;
    read(userId: string): Promise<T[]>
    delete(id: string): Promise<void>
}