import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PreviewQuestion from '@/components/PreviewQuestion';

import { IoChevronBackCircleOutline } from 'react-icons/io5';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import YesNoQuestion from '@/components/YesNoQuestion';
import MatchingQuestion from '@/components/MatchingQuestion';
import TextToSignQuestion from '@/components/TextToSignQuestion';
import SignDrawingQuestion from '@/components/SignDrawingQuestion';

export default function CreateQuestion() {
    const { questionType } = useParams();
    const [createQuestionBtnClicked, setCreateQuestionBtnClicked] = useState(false);

    const questionTypeDetails = [
        { id: 1, title: "Multiple Choice Question" },
        { id: 2, title: "Yes-No Question" },
        { id: 3, title: "Matching Question" },
        { id: 4, title: "Text-to-Sign Question" },
        { id: 5, title: "Sign Drawing Question" },
    ];

    const question = questionTypeDetails.find(
        (q) => q.title.toLowerCase() === questionType?.toLowerCase()
    );

    if (!question) {
        return (
            <h1 className="text-center text-xl text-red-500">
                Invalid Question Type
            </h1>
        );
    }

    const handelCreateQuestionBtn = () => {
        setCreateQuestionBtnClicked(true);
    };

    const handelBack = () => {
        setCreateQuestionBtnClicked(false);
    };

    return (
        <div className="h-screen p-4">
            {!createQuestionBtnClicked ? (
                <PreviewQuestion
                    question={question}
                    handelCreateQuestionBtn={handelCreateQuestionBtn}
                />
            ) : (
                <div className="h-screen p-4">
                    <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <h1 className="text-2xl">
                            Create {question.title} practice question
                        </h1>
                        <div className="w-full max-w-3xl min-h-[350px] border-2 border-slate-500 rounded-lg p-4">
                            {questionType.toLowerCase() === "multiple choice question" && (
                                <MultipleChoiceQuestion handelBack={handelBack} />
                            )}
                            {questionType.toLowerCase() === "yes-no question" && (
                                <YesNoQuestion handelBack={handelBack} />
                            )}
                            {questionType.toLowerCase() === "matching question" && (
                                <MatchingQuestion handelBack={handelBack} />
                            )}
                            {questionType.toLowerCase() === "text-to-sign question" && (
                                <TextToSignQuestion handelBack={handelBack} />
                            )}
                            {questionType.toLowerCase() === "sign drawing question" && (
                                <SignDrawingQuestion handelBack={handelBack} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
