export class Meal {
    constructor(id = "", petID = "", title = "", description = "", hour = "") {
        this.id = id;
        this.petID = petID
        this.title = title;
        this.description = description;
        this.hour = hour;
    }
}