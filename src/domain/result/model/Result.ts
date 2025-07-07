export class Result<T> {
    public Content?: T;
    public Success: boolean;
    public Message?: string;

    private constructor(success: boolean, content?: T, message?: string) {
        this.Success = success;
        this.Content = content;
        this.Message = message;
    }

    public static Ok<U>(content: U): Result<U> {
        return new Result<U>(true, content);
    }

    public static Fail<U>(message: string): Result<U> {
        return new Result<U>(false, undefined, message);
    }
}