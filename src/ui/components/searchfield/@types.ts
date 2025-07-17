import { ReactElement, ReactNode } from "react";
import { Result } from "../../../domain/result/model/Result";

export type SearchfieldProps<T> = {
    IsOpen: boolean;

    Title: string;

    OnList: (page: number, limit: number, search?: string) => Promise<Result<T[]>>;
    OnSelect: (item: T) => void;

    OnClose: () => void;

    RenderItem: (item: T) => ReactElement;
}