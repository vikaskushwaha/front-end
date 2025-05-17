"use server";

import axios from 'axios';

/**
 * Search vehicles based on make, model and price range
 */
export async function searchVehicles(make, model, priceRange) {
    try {
        // Build simple query string with available parameters
        const priceMatch = priceRange.match(/\$([0-9,]+)-\$([0-9,]+)/);
        // Remove commas and convert to numbers
        const minPrice = priceMatch[1].replace(/,/g, '');
        const maxPrice = priceMatch[2].replace(/,/g, '');

        // console.log(`Parsed price range: minPrice=${minPrice}, maxPrice=${maxPrice}`);
        const response = await axios.get(`http://localhost:8080/api/v1/vehicle?make=${make}&model=${model}&minPrice${minPrice}&maxPrice=${maxPrice}`);
        console.log(response.data.data);

        return response.data?.data || [];
    } catch (error) {
        console.error('Error searching vehicles:', error);
        // Return empty array on error
        return [];
    }
}
