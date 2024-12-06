import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
export default function TextToSignQuestion({ handelBack }) {
    const [question, setQuestion] = useState('');
    const [correctSignText, setCorrectSignText] = useState('');
    const [level, setLevel] = useState('');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handelSubmitBtn = async () => {
        if (!question || !correctSignText || !level || !topic) {
            toast({
                title: 'Error',
                description: 'Please fill out all fields.',
            });
            return;
        }

        const payload = {
            level,
            question,
            sign_text: correctSignText,
            topic,
        };

        setIsLoading(true);

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/questions/write_sign`,
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
                // Reset form fields after successful submission
                setQuestion('');
                setCorrectSignText('');
                setLevel('');
                setTopic('');
            } else {
                toast({
                    title: 'Error',
                    description: response?.data.message,
                });
            }
        } catch (error) {
            console.error('Error submitting the question:', error);
            toast({
                title: 'Error',
                description: 'Failed to submit the question. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {isLoading ? (
                <Lottie animationData={loader} loop={true} className='w-full h-full' />
            ) : (
                <>
                    {/* Question Input */}
                    <Textarea
                        placeholder="Enter Your Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    {/* Correct Sign Text Input */}
                    <Label htmlFor="correct_sign_text">Correct Sign Text</Label>
                    <Input
                        id="correct_sign_text"
                        placeholder="Enter Correct Sign Text"
                        value={correctSignText}
                        onChange={(e) => setCorrectSignText(e.target.value)}
                    />

                    {/* Level Input */}
                    <Label htmlFor="level">Level</Label>
                    <Input
                        id="level"
                        placeholder="Enter Level (e.g., intermediate)"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />

                    {/* Topic Input */}
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                        id="topic"
                        placeholder="Enter Topic (e.g., alphabet)"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end">
                        <button
                            onClick={handelSubmitBtn}
                            className="border-2 border-green-400 rounded-lg p-2 m-2 w-32"
                        >
                            Submit
                        </button>
                        <button
                            onClick={handelBack}
                            className="border-2 border-blue-400 rounded-lg p-2 m-2 w-24"
                        >
                            Back
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
