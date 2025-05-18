'use server'

import axios from "axios";

export async function fetchCarModels(make) {
    if (!make) return [];
    try {
        // Adjust the endpoint to match your backend API structure
        const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle?make=${make}&distinct=model`);
        if (response.data?.data) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error(`Error fetching models for ${make}:`, error);
        return fallbackModels[make] || [];
    }
}