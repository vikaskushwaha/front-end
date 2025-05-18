"use server";

import axios from 'axios';

export async function fetchCarMakes() {
    try {
        const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/menufactures`);
        if (response.data?.data) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching makes:', error);
        // Fallback data if API fails
        return ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Tesla', 'Audi', 'Chevrolet'];
    }
}
