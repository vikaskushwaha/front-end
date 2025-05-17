import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaApple, FaGooglePlay, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0A0F1F] text-white py-16 px-6 rounded-2xl">
            <div className="container mx-auto max-w-7xl">
                {/* Newsletter Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Join BoxCar</h2>
                        <p className="text-gray-400">Receive pricing updates, shopping tips & more!</p>
                    </div>
                    <div className="mt-6 md:mt-0 w-full md:w-auto flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-gray-800/50 rounded-l-full px-6 py-3 w-full md:w-72 outline-none"
                        />
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-r-full px-6 py-3 transition-colors duration-200">
                            Sign Up
                        </button>
                    </div>
                </div>

                <hr className="border-gray-800 mb-16" />

                {/* Footer Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Get in Touch</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Live chat</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it works</a></li>
                        </ul>
                    </div>

                    {/* Our Brands */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Our Brands</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Toyota</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Porsche</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Audi</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">BMW</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ford</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nissan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Peugeot</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Volkswagen</a></li>
                        </ul>
                    </div>

                    {/* Vehicles Type */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Vehicles Type</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sedan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hatchback</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SUV</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hybrid</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electric</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Coupe</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Truck</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Convertible</a></li>
                        </ul>
                    </div>

                    {/* Mobile App */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Our Mobile App</h3>
                        <div className="space-y-4">
                            <a href="#" className="flex items-center bg-black rounded-lg px-4 py-2 border border-gray-700 hover:border-gray-500 transition-colors">
                                <FaApple className="text-xl mr-3" />
                                <div>
                                    <p className="text-xs text-gray-400">Download on the</p>
                                    <p className="text-sm font-semibold">Apple Store</p>
                                </div>
                            </a>
                            <a href="#" className="flex items-center bg-black rounded-lg px-4 py-2 border border-gray-700 hover:border-gray-500 transition-colors">
                                <FaGooglePlay className="text-xl mr-3" />
                                <div>
                                    <p className="text-xs text-gray-400">Get it on</p>
                                    <p className="text-sm font-semibold">Google Play</p>
                                </div>
                            </a>
                        </div>

                        {/* Connect with us */}
                        <h3 className="text-lg font-semibold mt-10 mb-6">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 example.com. All rights reserved.</p>
                    <div className="flex space-x-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <span>•</span>
                        <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
                    </div>
                </div>
            </div>

            {/* Scroll to top */}
            <button
                className="fixed bottom-6 right-6 bg-indigo-500 hover:bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default Footer;