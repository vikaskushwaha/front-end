'use server';

import axios from 'axios';


export async function fetchVehiclesByBrand(brand) {
    try {
        // You can use environment variables for the API URL
        const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle?make=${brand}`);

        // Check if the response has the expected structure
        if (response.data &&
            response.data.data &&
            response.data.data.vehclesList &&
            Array.isArray(response.data.data.vehclesList)) {

            return {
                success: true,
                data: response.data.data.vehclesList
            };
        } else {
            console.warn('Vehicle data not found in expected format:', response.data);
            return {
                success: false,
                data: [],
                error: 'Invalid data format received from API'
            };
        }
    } catch (err) {
        console.error('Error fetching vehicles by brand:', err);
        return {
            success: false,
            data: [],
            error: err.message || 'Failed to load vehicles'
        };
    }
}