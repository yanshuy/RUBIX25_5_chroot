import { IconBaseProps } from "react-icons";
import { GoHome } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { TbBrandGoogleAnalytics, TbClockCheck } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
// import {useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CodeXml, Trophy, Folders, Users } from "lucide-react";
// Remove or complete the incomplete import
// import notification


const navItems = [
    {
        path: "/organizerdashboard/teams",
        label: "Teams",
        icon: (props: IconBaseProps) => <Users {...props} />,
    },
    {
        path: "/organizerdashboard/projects",
        label: "Submitted Projects",
        icon: (props: IconBaseProps) => <Folders {...props} />,
    },
    {
        path: "/organizerdashboard/result",
        label: "Results",
        icon: (props: IconBaseProps) => <Trophy {...props} />,
    },
];

const OrganizerSidebar = () => {
    const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

    return (
        <>
            <div className="absolute -left-[22px] top-6 -rotate-90 border-[.7rem] border-transparent border-b-white  drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.08)]"></div>
            <div className="sticky  top-7 flex  flex-col justify-between overflow-y-auto px-4">
                <div>
                    <div className="mb-4 mt-2 h-[3.2rem] cursor-pointer border-b border-slate-300 pb-3 pl-5">
                        <Link to={"/"}>
                            <img
                                src={""}
                                alt="Logo"
                                className="h-[100%] object-cover"
                            />
                        </Link>
                    </div>
                    <div className="relative flex flex-col gap-2">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex w-full cursor-pointer items-center justify-start gap-4 rounded-md px-4 py-2 transition-[box-shadow,_background-color,_color] ${
                                        isActive
                                            ? "bg-white font-medium text-neutral-950 ring-1 ring-slate-300/20"
                                            : "bg-transparent text-slate-700 shadow-none hover:bg-slate-200"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={`flex items-center justify-center rounded-sm`}
                                        >
                                            <item.icon
                                                className={`m-[1px] h-[1.55rem] w-[1.55rem] ${isActive ? "text-blue-500" : ""}`}
                                            />
                                        </span>
                                        <span>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrganizerSidebar;
