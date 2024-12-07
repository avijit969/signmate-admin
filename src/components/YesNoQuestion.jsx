import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { SelectLabel } from '@radix-ui/react-select';
import { Input } from './ui/input';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { questionLevels } from '../../utils/constant';
import { topics } from '../../utils/constant';
export default function YesNoQuestion({ handelBack }) {
    const [question, setQuestion] = useState('');
    const [signVideo, setSignVideo] = useState(null);
    const [correctOption, setCorrectOption] = useState('');
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!question || !signVideo || !correctOption) {
            toast({
                title: 'Error',
                description: 'All fields are required',
            });
            return;
        }

        const formData = new FormData();
        formData.append('question', question);
        formData.append('sign_video', signVideo);
        formData.append('is_same', correctOption === 'yes' ? true : false);
        formData.append('topic', topic.toLowerCase());
        formData.append("level", level.toLowerCase());
        setIsLoading(true);

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/questions/yes_no`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })

            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                });

                // Reset form fields
                setQuestion('');
                setSignVideo(null);
                setCorrectOption('');
                setTopic('');
                setLevel('');
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
        <div className="flex flex-col items-center justify-center gap-2 w-full">
            {isLoading ? (
                <Lottie animationData={loader} loop={true} className="w-full h-full" />
            ) : (
                <>
                    <dvi className="w-full">
                        {/* Question Input */}
                        <Textarea
                            placeholder="Enter Your Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />

                        {/* Sign Video Upload */}
                        <Label htmlFor="sign_video">Upload Sign Video</Label>
                        <Input
                            id="sign_video"
                            type="file"
                            accept="video/*"
                            onChange={(e) => setSignVideo(e.target.files[0])}
                        />
                        {/* select topic  */}
                        <Label htmlFor="topic">Select Topic</Label>
                        <Select onValueChange={setTopic}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Topics</SelectLabel>
                                    {topics.map((topic) => (
                                        <SelectItem key={topic} value={topic}>
                                            {topic}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* question level */}
                        <Label>Select question Level</Label>
                        <Select onValueChange={setLevel}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Levels</SelectLabel>
                                    {questionLevels.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            {level}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* Correct Option Selection */}
                        <Label>Select Correct Option</Label>
                        <Select onValueChange={setCorrectOption}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Options</SelectLabel>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </dvi>
                    {/* Action Buttons */}
                    <div className="flex items-center justify-end">
                        <button
                            onClick={handleSubmit}
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
