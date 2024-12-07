import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { topics as categories } from '../../utils/constant'; // Ensure the `categories` are imported correctly
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json';
import learning_1 from '@/assets/lottie/learning1.json';
import learning_2 from '@/assets/lottie/learning2.json';
function UploadSign() {
    const [signVideo, setSignVideo] = useState(null);
    const [signImage, setSignImage] = useState(null);
    const [signText, setSignText] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handelSubmit = async () => {
        // Validate form fields
        if (!signVideo || !signImage || !signText || !category) {
            toast({
                title: 'Error',
                description: 'All fields are required.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('sign_video', signVideo);
        formData.append('sign_image', signImage);
        formData.append('sign_text', signText);
        formData.append('category', category);

        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/learning/learning`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                });

                // Reset form fields
                handelReset();
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message,
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while uploading the sign.',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handelReset = () => {

        setSignVideo(null);
        setSignImage(null);
        setSignText('');
        setCategory('');
    };

    return (
        <div className="min-w-screen m-1 border-2 border-slate-300 rounded-lg h-[690px] flex flex-col items-center">
            <h1 className="text-2xl text-center text-slate-600 font-bold">Upload Sign Video</h1>
            {loading ? <Lottie animationData={loader} className="w-1/2 h-1/2" /> : <div className="flex gap-3 flex-col justify-center w-1/2 p-4 border-2 rounded-lg">
                <Label>Upload Sign Video</Label>
                <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setSignVideo(e.target.files[0])}
                />

                <Label>Upload Sign Image</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSignImage(e.target.files[0])}
                />

                <Label>Enter Sign Text</Label>
                <Input
                    type="text"
                    placeholder="Enter Sign Text"
                    value={signText}
                    onChange={(e) => setSignText(e.target.value)}
                />

                {/* Select Category */}
                <Label>Select Category</Label>
                <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Action Buttons */}
                <div className="flex items-center justify-end">
                    <button
                        onClick={handelSubmit}
                        className="border-2 border-green-400 rounded-lg p-2 m-2 w-24"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handelReset}
                        className="border-2 border-red-400 rounded-lg p-2 m-2 w-24"
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>
            </div>}
            <div className='flex justify-between mt-8 w-full'>
                <Lottie animationData={learning_1} className="w-1/2 h-1/2" />
                <Lottie animationData={learning_2} className="w-1/2 h-1/2" />
            </div>
        </div>
    );
}

export default UploadSign;
