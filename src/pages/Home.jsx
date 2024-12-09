import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { FaPersonCircleQuestion, FaUsersLine } from "react-icons/fa6";
import { PiFilesFill } from "react-icons/pi";

function Home() {
    const userData = useSelector((state) => state.auth.userData)
    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className="text-3xl font-bold">Hello {userData?.fullName} 👋,</p>
            <p className="text-lg font-normal w-1/3 text-center">Here, you can upload sign videos and practice questions
                and keep track of activities</p>
            <div>
                <div className='flex gap-4 border-2 p-4 rounded-xl w-[500px] justify-between border-slate-800'>
                    <div className='flex flex-col justify-center items-center border-2 p-2 rounded-2xl bg-green-400 border-slate-700 w-1/3'>
                        <FaUsersLine className='text-3xl' />
                        <p className='text-xl font-semibold'>users</p>
                    </div>
                    <div className='flex flex-col justify-center items-center border-2 p-2 rounded-2xl bg-green-400 border-slate-700 w-1/3'>
                        <FaPersonCircleQuestion className='text-3xl' />
                        <p className='text-xl font-semibold'>Questions</p>
                    </div>
                    <div className='flex flex-col justify-center items-center border-2 p-2 rounded-2xl bg-green-400 border-slate-700 w-1/3'>
                        <PiFilesFill className='text-3xl' />
                        <p className='text-xl font-semibold'>Sign videos</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home