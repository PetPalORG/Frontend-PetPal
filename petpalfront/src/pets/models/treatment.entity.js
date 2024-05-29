export class Treatment {
    constructor(id = "", petID = "", title = "", startDate = "", duration = "", medicine = "", dose = "", indications = "") {
        this.id = id;
        this.petID = petID;
        this.title = title;
        this.startDate = startDate;
        this.duration = duration;
        this.medicine = medicine;
        this.dose = dose;
        this.indications = indications;
    }
}