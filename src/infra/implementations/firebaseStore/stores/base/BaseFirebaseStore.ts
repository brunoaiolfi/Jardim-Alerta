import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IBaseFirebaseStoreImplementation as IBaseFirebaseStoreImplementation } from "./IBaseFirebaseStore";

export class BaseFirebaseStoreImplementation<T> implements IBaseFirebaseStoreImplementation<T> {

    private readonly _collectionName: string;

    constructor(collectionName: string) {
        this._collectionName = collectionName;
    }

    async create(item: T): Promise<FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>> {
        const result = await firebase
            .firestore()
            .collection(this._collectionName)
            .add(item);

        return result
    }

    async update(id: string, item: T): Promise<void> {
        await firebase
            .firestore()
            .collection(this._collectionName)
            .doc(id)
            .set(item, { merge: false });
    }

    async read(userId: string): Promise<T[]> {
        const snapshot = await firebase
            .firestore()
            .collection(this._collectionName)
            .where("userId", "==", userId)
            .get();

        const result: T[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as T[];

        return result;
    }

    async delete(id: string): Promise<void> {
        await firebase
            .firestore()
            .collection(this._collectionName)
            .doc(id)
            .delete();
    }
}