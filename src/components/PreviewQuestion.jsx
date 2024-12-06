import React from 'react'
import preview_video from '../assets/preview.mp4';
import { FaEye } from 'react-icons/fa';

export default function PreviewQuestion({ question, handelCreateQuestionBtn }) {
    return (
        <div>

            <div className="flex items-center">
                <div className="flex items-center border-2 border-black w-32 rounded-lg p-2 m-2 justify-between">
                    <h1 className="text-lg font-semibold text-slate-600">Preview</h1>
                    <FaEye className="text-lg" />
                </div>
            </div>
            {/* Preview Video */}
            <div className=" flex flex-col items-center w-full">
                <h1 className="text-xl font-semibold text-slate-800 text-center mb-4">
                    Create: {question.title}
                </h1>
                <video
                    src={preview_video}
                    controls={false}
                    loop={true}
                    autoPlay={true}
                    className="border-2 border-black rounded-xl"
                    width="250"
                    height="300"
                />
                <p className='text-center font-semibold w-1/3 text-xl text-slate-800'>
                    This is the preview of how the selected question type will appear to the learners
                </p>
            </div>
            {/* create question btn */}
            <div className="flex items-center justify-end">
                <button
                    onClick={() => handelCreateQuestionBtn()}
                    className="border-2 border-green-400 rounded-lg p-2 m-2 w-48"
                >
                    Create Question
                </button>
            </div>
        </div>
    )
}
