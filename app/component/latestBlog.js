import React from 'react';
import Image from 'next/image';
import { HiArrowRight, HiArrowNarrowRight } from 'react-icons/hi';

const LatestBlog = () => {
    const blogPosts = [
        {
            id: 1,
            image: '/blog1.svg',
            category: 'Sound',
            author: 'Admin',
            date: 'November 22, 2023',
            title: '2024 BMW ALPINA XB7 with exclusive details, extraordinary'
        },
        {
            id: 2,
            image: '/blog2.svg',
            category: 'Accessories',
            author: 'Admin',
            date: 'November 22, 2023',
            title: 'BMW X6 M50i is designed to exceed your sportiest.'
        },
        {
            id: 3,
            image: '/background2.jpg',
            category: 'Exterior',
            author: 'Admin',
            date: 'November 22, 2023',
            title: 'BMW X5 Gold 2024 Sport Review: Light on Sport'
        }
    ];

    return (
        <div className="w-full py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h2>
                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900">
                        View All <HiArrowRight className="ml-2" />
                    </a>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                            <div className="relative">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f0f0f0'/%3E%3C/svg%3E"
                                    onError={() => {/* error handled by Next.js */ }}
                                />
                                <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>


                            <div className="p-5">
                                <div className="flex text-gray-500 text-sm mb-2">
                                    <span>{post.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                                    {post.title}
                                </h3>
                                <a href="#" className="inline-block mt-2 text-blue-600 hover:text-blue-800">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-blue-50 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Are You Looking<br />For a Car?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            We are committed to providing our customers with exceptional service.
                        </p>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center hover:bg-blue-700 transition-colors">
                                Get Started <HiArrowNarrowRight className="ml-2" />
                            </button>
                            <div className="w-24 h-24 text-blue-400">

                            </div>
                        </div>
                    </div>


                    <div className="bg-pink-50 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Do You Want to<br />Sell a Car?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            We are committed to providing our customers with exceptional service.
                        </p>
                        <div className="flex items-center justify-between">
                            <button className="bg-gray-900 text-white px-6 py-3 rounded-md flex items-center hover:bg-gray-800 transition-colors">
                                Get Started <HiArrowNarrowRight className="ml-2" />
                            </button>
                            <div className="w-24 h-24 text-pink-400">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestBlog;