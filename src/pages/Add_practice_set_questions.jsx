import React, { useEffect, useState } from 'react';
import YesNoQuestion from '../components/Add_ques/YesNoQuestion';
import MultipleChoiceQuestion from '../components/Add_ques/MultipleChoiceQuestion';
import MatchingQuestion from '../components/Add_ques/MatchingQuestion';
import TextToSignQuestion from '../components/Add_ques/TextToSignQuestion';
import SignDrawingQuestion from '../components/Add_ques/SignDrawingQuestion';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
import empty from '../assets/lottie/empty.json';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';


const componentMapping = {
    "Yes-No Questions": YesNoQuestion,
    "Multiple Choice Questions": MultipleChoiceQuestion,
    "Matching Questions": MatchingQuestion,
    "Text-to-Sign Questions": TextToSignQuestion,
    "Sign Drawing Questions": SignDrawingQuestion,
};

const AddQuestionsPage = () => {
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [disableNextBtn, setDisableNextBtn] = useState(false);
    const practiceSetDetails = useSelector((state) => state.practiceSet)
    const questionSetData = useSelector((state) => state.practiceSetAddQuestion);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { toast } = useToast()
    const handleNextQuestion = () => {
        if (currentTypeIndex < practiceSetDetails.questionTypes.length - 1) {
            setCurrentTypeIndex(currentTypeIndex + 1);
        }
        else {
            setDisableNextBtn((prev) => !prev)
        }
    };

    const handlePreviousQuestion = () => {
        if (currentTypeIndex > 0) {
            setCurrentTypeIndex(currentTypeIndex - 1);
        }
    };
    const handelSubmit = async () => {
        const payload = {
            name: questionSetData.practiceSetName,
            allQuestionWithItsDetails: questionSetData.questions
        };
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/practice_set/create_practice_set`,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response?.data.message,
                });
                navigate('/create-practice-set')
            } else {
                toast({
                    title: 'Error',
                    description: response?.data.message,
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to submit the question. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const CurrentComponent = practiceSetDetails.questionTypes[currentTypeIndex].count != 0 && componentMapping[practiceSetDetails.questionTypes[currentTypeIndex].type];

    return (
        <div className="p-4 w-full">
            {isLoading ? <Lottie animationData={loader} className='w-1/2 h-1/2 items-center' /> :
                <div>
                    <h1 className="text-2xl font-bold">
                        {practiceSetDetails.questionTypes[currentTypeIndex].count != 0 ? `Add ` + practiceSetDetails.questionTypes[currentTypeIndex].type.toLowerCase() + ` to ${practiceSetDetails.practiceSetName}` : "There is no question to add for " + practiceSetDetails.questionTypes[currentTypeIndex].type + " as per your given choice"}
                    </h1>
                    <div className="my-4">
                        {CurrentComponent ? (
                            <CurrentComponent totalQuestion={practiceSetDetails.questionTypes[currentTypeIndex].count}
                            />
                        ) : <Lottie
                            animationData={empty}
                            loop={true}
                            className='w-1/2 h-[300px]'
                        />}
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="flex gap-2">
                            {currentTypeIndex > 0 && (
                                <Button variant="default" onClick={handlePreviousQuestion}>
                                    Previous Question
                                </Button>
                            )}
                            {currentTypeIndex < practiceSetDetails.questionTypes.length - 1 && (
                                <Button onClick={handleNextQuestion} disabled={disableNextBtn}>
                                    Next Question
                                </Button>
                            )}
                        </div>
                        {currentTypeIndex === practiceSetDetails.questionTypes.length - 1 && (
                            <Button onClick={handelSubmit}>Submit All</Button>
                        )}
                    </div>
                </div>
            }


        </div>
    );
};

export default AddQuestionsPage;
