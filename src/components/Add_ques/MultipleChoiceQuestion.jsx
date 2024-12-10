import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addNewQuestions } from '@/store/practiceQuestionAddSlice';
import Lottie from 'lottie-react';
import loader from '@/assets/lottie/loading.json';
import toast from 'react-hot-toast';

export default function MultipleChoiceQuestion({ totalQuestion }) {
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
                url: `${import.meta.env.VITE_API_URL}/questions/choose_correct_sign?page=${currentPage}&limit=2`,
                withCredentials: true,
                credentials: 'include',
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
            (q) => q.practice_question_type === 'choose_correct_sign'
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
            <h2 className="text-xl font-bold">Choose Correct Sign Questions</h2>
            {isLoading ? (
                <Lottie animationData={loader} className="w-1/3 h-1/3" />
            ) : (
                <>
                    <div className="grid gap-4">
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                className="border p-4 rounded border-slate-600 shadow-sm flex flex-col gap-4"
                            >
                                <h1 className='font-semibold'>{question.question}</h1>
                                <div>
                                    <video
                                        controls={false}
                                        autoPlay
                                        src={question.sign_video}
                                        className="w-1/3 rounded-xl border-slate-600 border-2"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2].map((index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center gap-2 border-slate-600 border-2 rounded-xl sp-2"
                                        >
                                            <img
                                                src={question[`option_${index}_image`]}
                                                alt={`Option ${index}`}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <p className="font-medium">
                                                {question[`option_${index}`]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p className='font-semibold  dark:text-white'>Topic : {question.topic}</p>
                                    <p className='font-semibold dark:text-white'>Level : {question.level}</p>
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
