export class Treatment {
    constructor(id = 0, appointmentId = 0, diagnosis = "", startDate = new Date(), endDate = new Date()) {
        this.id = id;
        this.appointmentId = appointmentId;
        this.diagnosis = diagnosis;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}