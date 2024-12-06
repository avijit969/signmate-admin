import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'


function Home() {
    const userData = useSelector((state) => state.auth.userData)
    return (
        <div className=''>
            <p className="text-2xl font-semibold">Hello {userData?.fullName} 👋,</p>
        </div>
    )
}

export default Home