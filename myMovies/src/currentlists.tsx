import { Subject } from "./observer";

type MovieLists = {
    listID: number;
    listName: string;
    listIcon: string;
};

export class movieLists extends Subject {

    private mlists:MovieLists[] = [];

    constructor(public currentUID:number) {
        super();
        this.refreshLists();
    }

    refreshLists():void {
        // pulls the lists from database
        this.notifyObservers();
    }

}