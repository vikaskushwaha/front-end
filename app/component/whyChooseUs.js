import React from 'react';
import { MdLocalOffer } from 'react-icons/md';
import { GiDiamondHard } from 'react-icons/gi';
import { FaTag, FaCar } from 'react-icons/fa';

const WhyChooseUs = () => {
    return (
        <div className="w-full mt-12 mb-8 px-6 sm:px-10 md:px-16 lg:px-20">



            <div className="px-4 sm:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 py-4">
                    Why Choose Us?
                </h2>
            </div>




            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6">

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                        <MdLocalOffer size={28} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Special Financing Offers</h3>
                    <p className="text-gray-600 text-sm">
                        Our stress-free finance department that can find financial solutions to save you money.
                    </p>
                </div>


                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                        <GiDiamondHard size={28} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Trusted Car Dealership</h3>
                    <p className="text-gray-600 text-sm">
                        Our stress-free finance department that can find financial solutions to save you money.
                    </p>
                </div>


                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                        <FaTag size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Transparent Pricing</h3>
                    <p className="text-gray-600 text-sm">
                        Our stress-free finance department that can find financial solutions to save you money.
                    </p>
                </div>


                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                        <FaCar size={28} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Expert Car Service</h3>
                    <p className="text-gray-600 text-sm">
                        Our stress-free finance department that can find financial solutions to save you money.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;