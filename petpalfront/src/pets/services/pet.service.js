import axios from "axios";

const http = axios.create({
    baseURL: "https://petpalback20240628014256.azurewebsites.net/api/v1",
});

export class PetService {
    getPets() {
        return http.get('/pets');
    }
    getMealsByPetId(petId) {
        return http.get(`/pets/${petId}/meal`)
    }
    getAppointmentsByPetId(petId) {
        return http.get(`/pets/${petId}/appointments`)
    }
    getTreatmentsByAppointmentId(appointmentId) {
        return http.get(`/appointments/${appointmentId}/treatment`)
    }
    getAppointmentsByPetIdToArray(petId) {
        return http.get(`/pets/${petId}/appointments`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    return response.data;
                } else {
                    return response.data ? [response.data] : [];
                }
            })
            .catch(error => {
                console.error("Error fetching appointments:", error);
                return [];
            });
    }
    async submitForm(pet) {
        try {
            const response = await http.post('/pets', pet);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    async saveMeal(meal) {
        try {
            const response = await http.post('/meal', meal);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteMeal(mealId) {
        try {
            const response = await http.delete(`/meal/id/${mealId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async saveAppointments(appointment) {
        try {
            const response = await http.post('/appointments', appointment);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteAppointment(appointmentId) {
        try {
            const response = await http.delete(`/appointments/id/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async saveTreatment(treatment) {
        try {
            const response = await http.post('/treatment', treatment);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteTreatment(treatmentId) {
        try {
            const response = await http.delete(`/treatment/id/${treatmentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async saveMedication(medication) {
        try {
            const response = await http.post('/medication', medication);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async getMedicationById(medicationId) {
        try {
            const response = await http.get(`/medication/id/${medicationId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async getMedicationByTreatmentId(treatmentId) {
        try {
            const response = await http.get(`/treatments/${treatmentId}/medication`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async getPetById(id) {
        try {
            const response = await http.get(`/pets/id/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    getArticles() {
        return http.get('/article')
    }
    async getArticleById(id) {
        try {
            const response = await http.get(`/article/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}