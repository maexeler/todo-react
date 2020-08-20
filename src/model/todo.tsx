
export type UniqueKey = string | number | undefined

export default interface Todo {
    id: UniqueKey,
    tittle: string,
    completed: boolean
}

export class TodoImpl implements Todo {
    id: UniqueKey;
    tittle: string;
    completed: boolean

    constructor(tittle: string) {
        this.id = undefined;
        this.tittle = tittle
        this.completed = false
    }
}
