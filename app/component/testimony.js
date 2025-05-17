import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Testimony = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sample testimonial data
    const testimonials = [
        {
            id: 1,
            name: 'Ali TUFAN',
            role: 'Designer',
            image: '/tesitimony.svg', // Replace with actual image path
            rating: 5.0,
            text: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team."
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            role: 'Developer',
            image: '/testimonials/person2.jpg', // Replace with actual image path
            rating: 5.0,
            text: "The team at BoxCar made purchasing my new vehicle incredibly easy. The financing options were flexible and the staff was knowledgeable."
        },
        {
            id: 3,
            name: 'Michael Chen',
            role: 'Entrepreneur',
            image: '/testimonials/person3.jpg', // Replace with actual image path
            rating: 4.5,
            text: "Great selection of vehicles and transparent pricing. I appreciate how they handled the entire process from test drive to paperwork."
        }
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <FaStar key={index} className="text-yellow-400" />
        ));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="w-full py-16 px-6 sm:px-10 md:px-16 lg:px-20 bg-[#F9FBFC] mt-14">
            <div className="max-w-6xl mx-auto">
                {/* Header section with title and rating summary */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
                        What our customers say
                    </h2>
                    <p className="text-gray-600">
                        Rated 4.7 / 5 based on 28,370 reviews
                        <span className="block sm:inline ml-0 sm:ml-1">Showing our 4 & 5 star reviews</span>
                    </p>
                </div>

                {/* Testimonial section */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                        {/* Image container */}
                        <div className="w-full md:w-2/5">
                            <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                                <img
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Testimonial';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content container */}
                        <div className="w-full md:w-3/5">
                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">
                                    {renderStars(currentTestimonial.rating)}
                                </div>
                                <span className="bg-yellow-400 text-white text-sm py-1 px-2 rounded font-medium">
                                    {currentTestimonial.rating.toFixed(1)}
                                </span>
                            </div>

                            {/* Customer name and role */}
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {currentTestimonial.name}
                            </h3>
                            <p className="text-gray-600 mb-6">{currentTestimonial.role}</p>

                            {/* Testimonial text */}
                            <p className="text-xl leading-relaxed text-gray-800">
                                {currentTestimonial.text}
                            </p>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 focus:outline-none hover:bg-gray-100"
                    >
                        <HiChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 focus:outline-none hover:bg-gray-100"
                    >
                        <HiChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimony;