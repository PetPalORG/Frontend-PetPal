export class Appointment {
    constructor(petID = "", id = "", vet = "", reason = "", details = [], date = "", hour = "") {
        this.petID = petID;
        this.id = id;
        this.vet = vet;
        this.reason = reason;
        this.details = details;
        this.date = date;
        this.hour = hour;
    }
}