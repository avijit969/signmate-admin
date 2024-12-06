import React from 'react';

const Loader = ({ height, width }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex items-center">
                <div className={`w-${width} h-${height} border-t-4 black border-solid rounded-full animate-spin`}></div>
            </div>
        </div>
    );
};

export default Loader;
