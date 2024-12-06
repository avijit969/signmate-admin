import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-3 w-1/3 border-2 p-10 rounded-2xl'>
                <h1 className='text-2xl text-center text-slate-600 font-bold'>Register Your Account</h1>
                <Input type="email" placeholder="Enter Your Email" />
                <Input type="text" placeholder="Enter Your FullName" />
                <Input type="text" placeholder="Enter Your username" />
                <Input type="password" placeholder="password" />
                <Button variant='secondary'>SignUp</Button>
                <p className='text-center text-sm'>Already have an account ?<Link to={"/login"}><Button variant='link'>Login</Button></Link> </p>
            </div>
        </div>
    )
}

export default SignUp