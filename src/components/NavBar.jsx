import React from 'react'
import { Button } from './ui/button'
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from './mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/authSlice';
import { SidebarTrigger } from './ui/sidebar';
function NavBar() {
    const userData = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch()
    return (
        <div className='flex justify-between pr-8 py-2 border-b border-slate-300 align-middle items-center'>
            <div className=''>
                <SidebarTrigger />
            </div>
            <div className='flex gap-2'>

                <ModeToggle />
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={'w-64'}>
                        <DropdownMenuItem>
                            <div className='w-full flex items-center flex-col gap-3 '>
                                <Avatar className='w-20 h-20'>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png" />
                                    <AvatarFallback>user avatar</AvatarFallback>
                                </Avatar>
                                <h3 className='text-xl font-semibold text-slate-600'>Hello,{userData?.fullName}</h3>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button variant='ghost' onClick={() => {
                                dispatch(logout())
                            }}>
                                <CiLogout className='text-red-900 w-24 h-24' />
                                Logout</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default NavBar