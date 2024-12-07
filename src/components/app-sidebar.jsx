import { ArrowDown, Book, Calendar, Home, Inbox, ListOrdered, Search, Settings, UploadCloudIcon } from "lucide-react"
import { TbPhotoSquareRounded } from "react-icons/tb";
import { LuAlbum } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { DashboardIcon } from "@radix-ui/react-icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { SubContent } from "@radix-ui/react-dropdown-menu";
import snapstore from '../assets/light_logo.png'

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: DashboardIcon,
    },
    {
        title: "Upload Sign",
        url: "/upload-sign",
        icon: UploadCloudIcon,

    },
    {
        title: "Create Practice Question",
        url: "#",
        icon: Book,
        sumContentItems: [
            {
                title: "Yes-No Question",
                url: "/create-question",
                icon: UploadCloudIcon,
            },
            {
                title: "Multiple Choice Question",
                url: "/create-question",
                icon: UploadCloudIcon,
            },
            {
                title: "Matching Question",
                url: "/create-question",
                icon: UploadCloudIcon,
            },
            {
                title: "Text-to-Sign Question",
                url: "/create-question",
                icon: UploadCloudIcon,
            },
            {
                title: "Sign Drawing Question",
                url: "/create-question",
                icon: UploadCloudIcon,
            },
        ]
    },
    {
        title: "Create Practice Set",
        url: "#",
        icon: Search,
    },
    {
        title: "Orders",
        url: "#",
        icon: ListOrdered,
    },
]

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarHeader className="bg-slate-400 dark:bg-black">
                <img
                    className='cursor-pointer rounded-xl '
                    src={snapstore}
                    height={10} width={150}
                />
            </SidebarHeader>
            <SidebarContent className="bg-slate-400 dark:bg-black">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-black dark:text-white ">
                            <Collapsible defaultOpen={false} className="group/collapsible">
                                {items.map((item) => (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="flex justify-between" >
                                            <Link to={item.url}>
                                                <div className="flex items-center text-black dark:text-white  ">
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    {item.title}
                                                </div>
                                            </Link>
                                            {item.sumContentItems && <CollapsibleTrigger asChild >
                                                <IoIosArrowForward />
                                            </CollapsibleTrigger>}
                                        </SidebarMenuButton>
                                        <CollapsibleContent >
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem isOpen>
                                                    {item.sumContentItems?.map((subItem) => (
                                                        <Link to={`${subItem.url}/${subItem.title}`} className="flex items-center mt-2 bg-gray-50 px-4 py-2 hover:bg-gray-100 rounded-lg text-black dark:text-white dark:bg-black dark:hover:bg-gray-800">
                                                            <p>{subItem.title}</p>
                                                        </Link>
                                                    ))}
                                                </SidebarMenuSubItem>

                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                ))}
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
