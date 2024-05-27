import React from 'react'
import { ArrowSmallRightIcon, PuzzlePieceIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { CpuChipIcon } from '@heroicons/react/24/solid';

import supportImage from '../assets/about.png';

const About = () => {
    return (
        <div name='about' className='w-full'>
            <div className='w-full h-[700px] bg-gray-900/90 absolute'>
                <img className='w-full h-full object-cover mix-blend-overlay' src={supportImage} alt="/" />
            </div>

            <div className='max-w-[1240px] mx-auto text-white relative'>
                <div className='px-4 py-5'>
                    <h2 className='text-3xl pt-8 text-slate-300 uppercase text-center'>What We Do</h2>
                    <h3 className='text-5xl font-bold py-6 text-center'>Finding the right products</h3>
                    <p className='py-4 text-3xl text-slate-300 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-10 text-black'>
                    <div className='bg-white rounded-xl shadow-2xl'>
                        <div className='p-8'>
                            <PuzzlePieceIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
                            <h3 className='font-bold text-2xl my-6'>Shopping</h3>
                            <p className='text-gray-600 text-xl'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                        <div className='bg-slate-100 pl-8 py-4'>
                            <p className='flex items-center text-indigo-600 cursor-pointer'>Contact Us <ArrowSmallRightIcon className='w-5 ml-2' /></p>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-2xl'>
                        <div className='p-8'>
                            <ServerStackIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
                            <h3 className='font-bold text-2xl my-6'>Shipping</h3>
                            <p className='text-gray-600 text-xl'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                        <div className='bg-slate-100 pl-8 py-4'>
                            <p className='flex items-center text-indigo-600 cursor-pointer'>Contact Us <ArrowSmallRightIcon className='w-5 ml-2' /></p>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-2xl'>
                        <div className='p-8'>
                            <CpuChipIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
                            <h3 className='font-bold text-2xl my-6'>Returns</h3>
                            <p className='text-gray-600 text-xl'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                        <div className='bg-slate-100 pl-8 py-4'>
                            <p className='flex items-center text-indigo-600 cursor-pointer'>Contact Us <ArrowSmallRightIcon className='w-5 ml-2' /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;