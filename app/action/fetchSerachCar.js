"use server";

import axios from 'axios';


export async function searchVehicles(make, model, priceRange) {
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
        console.log(`Searching with price range: $${minPrice} to $${maxPrice}`);

        const response = await axios.get(`http://localhost:8080/api/v1/vehicle?make=${make}&model=${model}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        console.log(response.data.data);

        return response.data?.data || [];
    } catch (error) {
        console.error('Error searching vehicles:', error);

        return [];
    }
}
