export class Todo {
    public isToggling: boolean;
    public isDeleting: boolean;
    constructor(
        public id: number,
        public text: string,
        public completed: boolean) {}

    public static copyFrom(other: Todo) {
        return new Todo(other.id, other.text, other.completed)
    }
}