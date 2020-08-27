
export type UniqueKey = string | number | undefined

export default interface Todo {
    id: UniqueKey,
    title: string,
    completed: boolean
}

export class TodoImpl implements Todo {
    id: UniqueKey;
    title: string;
    completed: boolean

    constructor(title: string) {
        this.id = undefined;
        this.title = title
        this.completed = false
    }
}
