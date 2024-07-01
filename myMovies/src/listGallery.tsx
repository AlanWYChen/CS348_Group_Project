import { Observer } from "./observer";
import { movieLists } from "./currentlists";

class ListGallery implements Observer {

    update(): void {
        
        // subject has been updated, update the view

        // i.e. update display

        this.mlist.CustomLists.forEach(element => {
            // draw icon and what not 
        });

    }

    constructor(public mlist: movieLists) {

    }

}