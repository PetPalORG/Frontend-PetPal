export class Appointment {
    constructor(id = 0, petId = 0, vet = "", reason = "", detail = "", date = new Date(), hour = "") {
        this.id = id;
        this.petId = petId;
        this.vet = vet;
        this.reason = reason;
        this.detail = detail;
        this.date = date;
        this.hour = hour;
    }
}