"use server";

import axios from 'axios';


export async function searchVehicles(make, model, priceRange, condition = '', vehicleType = '') {
    try {
        let minPrice = '0';
        let maxPrice = '1000000';
        if (priceRange) {
            const standardRangeMatch = priceRange.match(/\$([0-9,]+)-\$([0-9,]+)/);
            const plusRangeMatch = priceRange.match(/\$([0-9,]+)\+/);

            if (standardRangeMatch) {

                minPrice = standardRangeMatch[1].replace(/,/g, '');
                maxPrice = standardRangeMatch[2].replace(/,/g, '');
            } else if (plusRangeMatch) {

                minPrice = plusRangeMatch[1].replace(/,/g, '');

            } else if (priceRange !== '') {

                console.warn(`Unrecognized price range format: ${priceRange}`);
            }
        }

        // Build the query URL
        let url = `https://back-end-edj4.onrender.com/api/v1/vehicle?make=${make}&model=${model}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

        // Add condition if specified
        if (condition) {
            url += `&condition=${condition}`;
        }

        // Add vehicleType if specified

        if (vehicleType) {
            if (vehicleType == "Hybrid") {
                url += `&fuelType=${vehicleType}`;
            }
            else {
                url += `&vehicleType=${vehicleType}`;
            }

        }
        console.log(`Searching with URL: ${url}`);
        const response = await axios.get(url);


        return response.data?.data || [];
    } catch (error) {
        console.error('Error searching vehicles:', error);

        return [];
    }
}
