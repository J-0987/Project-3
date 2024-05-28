import React from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import {
  RocketLaunchIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import supportImage from "../assets/about.png";

const About = () => {
  return (
    <div name="about" className="w-full">
      <div className="w-full h-[700px] bg-gray-900/90 absolute">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src={supportImage}
          alt="/"
        />
      </div>

      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-5">
          <h2 className="text-3xl pt-8 text-slate-300 uppercase text-center">
            What We Do
          </h2>
          <h3 className="text-5xl font-bold py-6 text-center">
            Finding the right products
          </h3>
          <p className="py-4 text-3xl text-slate-300 text-center">
            Our mission is to connect customers with the best products
            available. By leveraging advanced algorithms and user reviews, we
            ensure a curated shopping experience tailored to individual needs.
            Whether you’re looking for the latest tech gadgets or everyday
            essentials, we help you make informed decisions for a satisfying
            shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-10 text-black">
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <ShoppingCartIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">Shopping</h3>
              <p className="text-gray-600 text-xl">
                Our platform provides an extensive catalog of products from
                various categories, ensuring customers find exactly what they
                need. With a user-friendly interface, secure payment options,
                and personalized recommendations, shopping becomes a delightful
                experience.
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600 cursor-pointer">
                <Link
                  Link
                  to="/products"
                  className="text-blue-500 hover:underline" >
                  <p>Shop Now</p>
                </Link>
                <ArrowSmallRightIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <TruckIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">Shipping</h3>
              <p className="text-gray-600 text-xl">
                We offer reliable and fast shipping options to ensure your
                purchases arrive on time. Our partnerships with top logistics
                companies allow us to provide tracking services and handle
                shipping queries efficiently, giving you peace of mind for every
                purchase.
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600 cursor-pointer">
                <Link to="/contact" className="text-blue-500 hover:underline">
                  <p>See More</p>
                </Link>
                <ArrowSmallRightIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <RocketLaunchIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">Returns</h3>
              <p className="text-gray-600 text-xl">
                Our return policy is designed to be hassle-free, ensuring
                customer satisfaction. If you’re not happy with your purchase,
                our easy return process allows you to send back items within a
                specified period for a full refund or exchange, making returns
                stress-free.
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600 cursor-pointer">
                <Link to="/contact" className="text-blue-500 hover:underline">
                  <p>Get In Toutch</p>
                </Link>
                <ArrowSmallRightIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
