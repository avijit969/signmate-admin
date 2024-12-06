import React from 'react'

function ErrorPage() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl'>Page Not Found</h1>
            <p className='text-xl'>The page you are looking for does not exist.</p>
        </div>
    )
}

export default ErrorPage