import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addNewQuestions } from '@/store/practiceQuestionAddSlice';
import Lottie from 'lottie-react';
import loader from '@/assets/lottie/loading.json';
import toast from 'react-hot-toast';

export default function MatchingQuestion({ totalQuestion }) {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const questionSetData = useSelector((state) => state.practiceSetAddQuestion);

    // Fetch questions from the API
    const fetchQuestions = async (currentPage) => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_API_URL}/questions/match_sign?page=${currentPage}&limit=5`,
                withCredentials: true,
            });
            const { docs, totalPages } = response.data.data;
            setQuestions(docs);
            setTotalPages(totalPages);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions(page);
    }, [page]);

    // Add a question to the Redux store
    const handleAddQuestion = (question) => {
        const existingQuestions = questionSetData.questions.filter(
            (q) => q.practice_question_type === 'match_sign'
        );

        if (existingQuestions.length < totalQuestion) {
            const isAlreadyAdded = existingQuestions.some((q) => q._id === question._id);
            if (isAlreadyAdded) {
                toast.error('This question is already in the set!');
            } else {
                dispatch(addNewQuestions([question]));
                toast.success('Question added to the set!');
            }
        } else {
            toast.error(`You can only add up to ${totalQuestion} questions.`);
        }
    };

    return (
        <div className="flex flex-col gap-4 border-2 border-black rounded-md p-4">
            <h2 className="text-xl font-bold">Matching Questions</h2>
            {isLoading ? (
                <Lottie animationData={loader} className="w-1/3 h-1/3" />
            ) : (
                <>
                    <div className="grid gap-4">
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                className="border p-4 rounded shadow-sm flex flex-col gap-2"
                            >
                                <h1 className='text-lg font-semibold text-slate-600 text-center'>Match the both columns</h1>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-sm font-semibold">Column 1</h3>
                                        {[
                                            question.sign_video_1,
                                            question.sign_video_2,
                                            question.sign_video_3,
                                        ].map((video, index) => (
                                            <video
                                                controls={false}
                                                loop
                                                key={index}
                                                autoPlay
                                                src={video}
                                                className="w-1/2 h-1/3 rounded-xl border-2 border-slate-600"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-sm font-semibold">Column 2</h3>
                                        {[
                                            question.sign_text_1,
                                            question.sign_text_2,
                                            question.sign_text_3,
                                        ].map((text, index) => (
                                            <p key={index} className="p-2 bg-gray-200  w-1/2 h-1/2 text-center border-2 border-slate-600 rounded-xl flex items-center justify-center">
                                                <p className='text-6xl font-bold'>{text}</p>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-lg text-gray-800">
                                    <p>Topic: {question.topic}</p>
                                    <p>Level: {question.level}</p>
                                </div>
                                <Button
                                    variant="default"
                                    onClick={() => handleAddQuestion(question)}
                                >
                                    Add to Set
                                </Button>
                            </div>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </Button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
