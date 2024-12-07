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
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from './ui/select';
export default function MatchingQuestion({ handelBack }) {
    const [question, setQuestion] = useState('');
    const [level, setLevel] = useState('');
    const [topic, setTopic] = useState('');
    const [column1, setColumn1] = useState([
        { text: '', position: '' },
        { text: '', position: '' },
        { text: '', position: '' },
    ]);
    const [column2, setColumn2] = useState([
        { file: null, position: '' },
        { file: null, position: '' },
        { file: null, position: '' },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const updateColumn = (column, index, key, value) => {
        const updatedColumn = [...column];
        updatedColumn[index][key] = value;
        if (column === column1) setColumn1(updatedColumn);
        else setColumn2(updatedColumn);
    };

    const handelSubmitBtn = async () => {
        if (!question || !level || !topic) {
            toast({
                title: 'Error',
                description: 'Please fill out all fields.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('question', question);
        formData.append('level', level.toLowerCase());
        formData.append('topic', topic.toLowerCase());

        column1.forEach((item, index) => {
            formData.append(`sign_text_${index + 1}`, item.text || '');
            formData.append(`column_1_order`, item.position || '');
        });
        column2.forEach((item, index) => {
            if (item.file) {
                formData.append(`sign_video_${index + 1}`, item.file);
            }
            formData.append(`column_2_order`, item.position || '');
        });

        setIsLoading(true);

        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/questions/match_signs`,
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
                // Reset the form
                setQuestion('');
                setLevel('');
                setTopic('');
                setColumn1([
                    { text: '', position: '' },
                    { text: '', position: '' },
                    { text: '', position: '' },
                ]);
                setColumn2([
                    { file: null, position: '' },
                    { file: null, position: '' },
                    { file: null, position: '' },
                ]);
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error submitting the data:', error);
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

                    <Label>Column 1 (Sign Text)</Label>
                    <div className="flex flex-col gap-2 border-2 border-slate-400 p-2 rounded-lg">
                        {column1.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div>
                                    <Label>Enter Sign Text {index + 1}</Label>
                                    <Input
                                        type="text"
                                        value={item.text}
                                        onChange={(e) =>
                                            updateColumn(column1, index, 'text', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label>Position</Label>
                                    <Input
                                        type="number"
                                        max="3"
                                        min="1"
                                        value={item.position}
                                        onChange={(e) =>
                                            updateColumn(column1, index, 'position', e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Label>Column 2 (Videos)</Label>
                    <div className="flex flex-col gap-2 border-2 border-slate-400 p-2 rounded-lg">
                        {column2.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div>
                                    <Label>Upload Sign Video {index + 1}</Label>
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) =>
                                            updateColumn(column2, index, 'file', e.target.files[0])
                                        }
                                    />
                                </div>
                                <div>
                                    <Label>Position</Label>
                                    <Input
                                        type="number"
                                        max="3"
                                        min="1"
                                        value={item.position}
                                        onChange={(e) =>
                                            updateColumn(column2, index, 'position', e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

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
