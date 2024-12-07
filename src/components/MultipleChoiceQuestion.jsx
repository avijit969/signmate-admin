import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectValue,
    SelectTrigger,
} from './ui/select';
import axios from 'axios';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
import { useToast } from '@/hooks/use-toast';
import { questionLevels } from '../../utils/constant';
import { topics } from '../../utils/constant';
export default function MultipleChoiceQuestion({ handelBack }) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [signVideo, setSignVideo] = useState(null);
    const [optionImages, setOptionImages] = useState([null, null]);
    const [level, setLevel] = useState('');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (index, file) => {
        const updatedImages = [...optionImages];
        updatedImages[index] = file;
        setOptionImages(updatedImages);
    };

    const updateOption = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handelSubmitBtn = async () => {
        if (!question || !level || !topic || correctOption === '' || !options[0] || !options[1]) {
            toast({
                title: 'Error',
                description: 'Please fill out all required fields.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('question', question);
        formData.append('level', level.toLowerCase());
        formData.append('topic', topic.toLowerCase());
        formData.append('correct_answer', correctOption === '0' ? 'option_1' : 'option_2');
        if (signVideo) formData.append('sign_video', signVideo);
        formData.append('option_1', options[0]);
        formData.append('option_2', options[1]);
        if (optionImages[0]) formData.append('option_1_image', optionImages[0]);
        if (optionImages[1]) formData.append('option_2_image', optionImages[1]);

        setIsLoading(true);

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/questions/choose_correct_sign`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast({
                    variant: 'success',
                    title: "Multiple Choice Question added successfully",
                });

                // Reset form fields
                setQuestion('');
                setOptions(['', '']);
                setCorrectOption('');
                setSignVideo(null);
                setOptionImages([null, null]);
                setLevel('');
                setTopic('');
            } else {
                toast({
                    variant: 'destructive',
                    title: response.data.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: error.response?.data.message || "something went wrong",
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
                    <Textarea
                        placeholder="Enter Your Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
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
                    <Label htmlFor="sign_video">Upload Sign Video</Label>
                    <Input
                        id="sign_video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setSignVideo(e.target.files[0])}
                    />
                    <div className="flex gap-2 w-full">
                        <div>
                            <Label htmlFor="option1">Option 1</Label>
                            <Input
                                id="option1"
                                type="text"
                                value={options[0]}
                                onChange={(e) => updateOption(0, e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="option1img">Option 1 Image</Label>
                            <Input
                                id="option1img"
                                accept="image/*"
                                type="file"
                                onChange={(e) => handleFileChange(0, e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div>
                            <Label htmlFor="option2">Option 2</Label>
                            <Input
                                id="option2"
                                type="text"
                                value={options[1]}
                                onChange={(e) => updateOption(1, e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="option2img">Option 2 Image</Label>
                            <Input
                                id="option2img"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(1, e.target.files[0])}
                            />
                        </div>
                    </div>

                    <Label>Select Correct Option</Label>
                    <Select onValueChange={setCorrectOption}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="0">Option 1</SelectItem>
                                <SelectItem value="1">Option 2</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

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
