import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000",
});

export class PetService {
    getPets() {
        return http.get('/pets');
    }
    getMeals() {
        return http.get('/meals')
    }
    getAppointments() {
        return http.get('/appointments')
    }
    getTreatments() {
        return http.get('/treatments')
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
            const response = await http.post('/meals', meal);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteMeal(mealId) {
        try {
            const response = await http.delete(`/meals/${mealId}`);
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
            const response = await http.delete(`/appointments/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async saveTreatment(treatment) {
        try {
            const response = await http.post('/treatments', treatment);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteTreatment(treatmentId) {
        try {
            const response = await http.delete(`/treatments/${treatmentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async getPetById(id) {
        try {
            const response = await http.get(`/pets/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    getArticles() {
        return http.get('/articles')
    }
    async getArticleById(id) {
        try {
            const response = await http.get(`/articles/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}