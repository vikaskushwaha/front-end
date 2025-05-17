import React from 'react';
import { BsPlayCircle } from 'react-icons/bs';
import { HiArrowRight, HiCheck } from 'react-icons/hi';

const VideoSection = () => {
    return (
        <div className="w-full py-24 md:py-32">
            {/* Main container with video and text */}
            <div className="w-full border border-blue-300 rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Video/Image Section (Left) */}
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/video.svg')" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-white p-2 rounded-full text-gray-600 hover:text-gray-800 transition-colors">
                                <BsPlayCircle size={60} />
                            </button>
                        </div>
                    </div>

                    {/* Content Section (Right) */}
                    <div className="w-full md:w-1/2 bg-[#F5F7FF] p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                            Get A Fair Price For Your Car<br />Sell To Us Today
                        </h2>

                        <p className="text-gray-700 mb-6">
                            We are committed to providing our customers with exceptional service, competitive pricing, and a wide range of.
                        </p>

                        <div className="mb-2 flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                <span>x</span>
                            </div>
                            <p className="ml-3 text-gray-700">We are the UK's largest provider, with more patrols in more places</p>
                        </div>

                        <div className="mb-2 flex items-center">
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <HiCheck size={16} />
                            </div>
                            <p className="ml-3 text-gray-700">You get 24/7 roadside assistance</p>
                        </div>

                        <div className="mb-6 flex items-center">
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <HiCheck size={16} />
                            </div>
                            <p className="ml-3 text-gray-700">We fix 4 out of 5 cars at the roadside</p>
                        </div>

                        <button className="w-40 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors">
                            Get Started
                            <HiArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">836M</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">CARS FOR SALE</p>
                </div>

                <div className="p-4 relative">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">738M</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">DEALER REVIEWS</p>
                </div>

                <div className="p-4">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">100M</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">VISITORS PER DAY</p>
                </div>

                <div className="p-4">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">238M</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">VERIFIED DEALERS</p>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;