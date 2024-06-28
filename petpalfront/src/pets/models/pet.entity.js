export class Pet {
    constructor(id = 0, name = "", species = "", breed = "", age = 0, weight = "", imagePath = "", description = "", userId = 1) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = parseInt(age, 10);
        this.weight = weight;
        this.imagePath = imagePath;
        this.description = description;
        this.userId = userId === 0 ? 1 : userId;
    }
}