
export type UniqueKey = string | number | null

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
        this.id = null;
        this.tittle = tittle
        this.completed = false
    }
}
