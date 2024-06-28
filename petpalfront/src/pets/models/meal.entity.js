export class Meal {
    constructor(id = "", petId = 0, food = "", description = "", hour = "") {
        this.id = id;
        this.petId = petId
        this.food = food;
        this.description = description;
        this.hour = hour;
    }
}