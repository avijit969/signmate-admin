import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
import { useToast } from '@/hooks/use-toast';
import { questionLevels } from '../../utils/constant';
import { topics } from '../../utils/constant';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
export default function SignDrawingQuestion({ handelBack }) {
    const [question, setQuestion] = useState('');
    const [signVideo, setSignVideo] = useState(null);
    const [correctSignText, setCorrectSignText] = useState('');
    const [level, setLevel] = useState('');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handelSubmitBtn = async () => {
        if (!question || !signVideo || !correctSignText || !level || !topic) {
            toast({
                title: 'Error',
                description: 'All fields are required',
            });
            return;
        }

        const formData = new FormData();
        formData.append('question', question);
        formData.append('sign_text', correctSignText);
        formData.append('level', level.toLowerCase());
        formData.append('topic', topic.toLowerCase());
        formData.append('sign_video', signVideo);

        setIsLoading(true);

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/questions/write_sign`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                });

                // Reset form fields
                setQuestion('');
                setSignVideo(null);
                setCorrectSignText('');
                setLevel('');
                setTopic('');
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message,
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data.message || 'An error occurred.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {isLoading ? (
                <Lottie animationData={loader} loop={true} className="w-full h-full" />
            ) : (
                <>
                    {/* Question Input */}
                    <Textarea
                        placeholder="Enter Your Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    {/* Sign Video Upload */}
                    <Label htmlFor="sign_video">Upload Sign Video</Label>
                    <Input
                        type="file"
                        accept="video/*"
                        id="sign_video"
                        onChange={(e) => setSignVideo(e.target.files[0])}
                    />

                    {/* Correct Sign Text Input */}
                    <Label htmlFor="sign_text">Correct Sign Text</Label>
                    <Input
                        placeholder="Enter Correct Sign Text"
                        id="sign_text"
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
