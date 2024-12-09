import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addNewQuestions } from '@/store/practiceQuestionAddSlice';
import Lottie from 'lottie-react';
import loader from '@/assets/lottie/loading.json';
import toast from 'react-hot-toast';

export default function SignDrawingQuestion({ totalQuestion }) {
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
                url: `${import.meta.env.VITE_API_URL}/questions/write_sign?page=${currentPage}&limit=5`,
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
            (q) => q.practice_question_type === 'write_sign'
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
            <h2 className="text-xl font-bold">Write Sign Questions</h2>
            {isLoading ? (
                <Lottie animationData={loader} className="w-1/3 h-1/3" />
            ) : (
                <>
                    <div className="grid gap-4">
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                className="border p-4 rounded shadow-sm flex flex-col gap-4"
                            >
                                <div className='flex gap-4 items-center justify-between' >
                                    <video
                                        controls={false}
                                        loop={true}
                                        autoPlay
                                        src={question.sign_video}
                                        className="w-1/3  rounded-xl"
                                    />
                                    <div>
                                        <p>Question : {question.question}</p>
                                        <div className=''>
                                            <p>Topic : {question.topic}</p>
                                            <p>Level : {question.level}</p>

                                        </div>
                                    </div>
                                    <Button
                                        variant="default"
                                        onClick={() => handleAddQuestion(question)}
                                    >
                                        Add to Set
                                    </Button>
                                </div>
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
