import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
import { questionLevels } from '../../utils/constant';
import { topics } from '../../utils/constant';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from './ui/select';
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
            level: level.toLowerCase(),
            question,
            sign_text: correctSignText,
            topic: topic.toLowerCase(),
        };

        setIsLoading(true);

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/questions/sign_to_text`,
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
                <Lottie animationData={loader} loop={true} className='w-[1/2] h-[1/2]' />
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
                    <Label htmlFor="level">Select Level</Label>
                    <Select onValueChange={setLevel}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {questionLevels.map((level) => (
                                    <SelectItem key={level} value={level}>
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Label htmlFor="level">Select Question Topic</Label>
                    <Select onValueChange={setTopic}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {topics.map((topic) => (
                                    <SelectItem key={topic} value={topic}>
                                        {topic}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

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
