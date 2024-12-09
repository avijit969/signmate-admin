import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addPracticeSet } from '@/store/practiceSetSlice';
import { useNavigate } from 'react-router-dom';
import { createPracticeSet } from '@/store/practiceQuestionAddSlice';

export default function CreatePracticeSet() {
    const [practiceSetName, setPracticeSetName] = useState('');
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [questionTypes, setQuestionTypes] = useState([
        { type: 'Yes-No Questions', count: 0 },
        { type: 'Multiple Choice Questions', count: 0 },
        { type: 'Matching Questions', count: 0 },
        { type: 'Text-to-Sign Questions', count: 0 },
        { type: 'Sign Drawing Questions', count: 0 },
    ]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Update the question count for a specific type
    const handleQuestionCountChange = (index, value) => {
        const sanitizedValue = Math.max(0, Number(value) || 0); // Prevent negative or invalid inputs

        // Update the specific question type's count
        const updatedQuestionTypes = [...questionTypes];
        updatedQuestionTypes[index].count = sanitizedValue;

        // Update total count
        const newTotal = updatedQuestionTypes.reduce((sum, q) => sum + q.count, 0);

        setQuestionTypes(updatedQuestionTypes);
        setTotalQuestions(newTotal);
    };

    const handleCreatePracticeSet = () => {
        dispatch(addPracticeSet({ practiceSetName, totalQuestions, questionTypes }))
        dispatch(createPracticeSet({ practiceSetName }))
        navigate('/add_practice_set_questions');
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl text-slate-600 font-semibold">Create Practice Set</h1>
            <div className="flex flex-col gap-3 w-1/2 rounded-xl border-2 p-4">
                {/* Practice Set Name */}
                <Label>Practice Set Name</Label>
                <Input
                    type="text"
                    placeholder="Enter Your Practice Set Name"
                    value={practiceSetName}
                    onChange={(e) => setPracticeSetName(e.target.value)}
                />

                {/* Total Number of Questions */}
                <Label htmlFor="total_questions">Total Number of Questions</Label>
                <div className="flex items-center justify-between gap-2">
                    <Input
                        id="total_questions"
                        type="number"
                        placeholder="Enter Total Number of Questions"
                        value={totalQuestions}
                        readOnly
                        className="cursor-not-allowed bg-gray-100"
                    />
                    {/* <div className="text-slate-800 w-14 h-8 border-2 rounded-md text-center border-slate-600">
                        {totalQuestions}
                    </div> */}
                </div>

                {/* Question Types */}
                <div className="flex flex-col border-2 border-slate-400 p-4 gap-4 items-center rounded-lg">
                    {questionTypes.map((qType, index) => (
                        <div
                            key={qType.type}
                            className="flex justify-between items-center border-2 border-slate-400 w-[90%] p-2 rounded-lg"
                        >
                            <Label>{qType.type}</Label>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor={`${qType.type}_count`}>No. of Questions</Label>
                                <Input
                                    id={`${qType.type}_count`}
                                    type="number"
                                    placeholder="e.g., 5"
                                    value={qType.count || ''}
                                    onChange={(e) => handleQuestionCountChange(index, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row justify-end w-full p-4">
                <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleCreatePracticeSet}
                >
                    Create Practice Set
                </Button>
            </div>
        </div>
    );
}
