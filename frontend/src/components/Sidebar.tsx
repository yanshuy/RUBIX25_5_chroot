import { IconBaseProps } from "react-icons";
import { Link, NavLink } from "react-router-dom";
import {
    CodeXml,
    ListTodo,
    LogOut,
    Settings,
    MountainSnow,
    User,
} from "lucide-react";
import Logo from "../assets/Logo-removebg-preview.png";
import { TbLogout2 } from "react-icons/tb";

const navItems = [
    {
        path: "/dashboard/profile",
        label: "Profile",
        icon: (props: IconBaseProps) => <User {...props} />,
    },
    {
        path: "/dashboard/hackathons",
        label: "Hackathons",
        icon: (props: IconBaseProps) => <CodeXml {...props} />,
    },
    {
        path: "/dashboard/organizehackathons",
        label: "Organize a Hackathon",
        icon: (props: IconBaseProps) => <ListTodo {...props} />,
    },
    {
        path: "/dashboard/statistics",
        label: "Hacker’s Journey",
        icon: (props: IconBaseProps) => <MountainSnow {...props} />,
    },
    {
        path: "/",
        label: "Settings",
        icon: (props: IconBaseProps) => <Settings {...props} />,
    },
    {
        path: "/",
        label: "Logout",
        icon: (props: IconBaseProps) => <TbLogout2 {...props} />,
    },
];

const Sidebar = () => {
    const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

    return (
        <>
            <div className="absolute -left-[22px] top-6 -rotate-90 border-[.7rem] border-transparent border-b-white drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.08)]"></div>
            <div className="sticky top-4 flex h-[calc(100vh-32px)] w-fit flex-col justify-between overflow-y-auto pl-4 pr-2">
                <div>
                    <div className="mb-4 mt-2 h-24 cursor-pointer border-b border-slate-300 pb-3 pl-4">
                        <Link to={"/"}>
                            <img
                                src={Logo}
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
                                        {item.label === "Analytics" && (
                                            <>
                                                <span
                                                    className={`flex h-[1.4rem] w-[1.4rem] items-center justify-center rounded-sm border-b-[2.3px] border-l-[2.3px] ${isActive ? "border-blue-500" : "border-slate-600"}`}
                                                >
                                                    <item.icon
                                                        className={`m-[1px] h-[1.35rem] w-[1.35rem] ${isActive ? "text-blue-500" : ""}`}
                                                    />
                                                </span>
                                                <span
                                                    onClick={() => {
                                                        item.label == "Logout"
                                                            ? localStorage.removeItem(
                                                                  "accessToken",
                                                              )
                                                            : "";
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                            </>
                                        )}
                                        {item.label === "Calendar" && (
                                            <>
                                                <span
                                                    className={`flex items-center justify-center rounded-sm`}
                                                >
                                                    <item.icon
                                                        className={`m-[1px] h-[1.45rem] w-[1.45rem] ${isActive ? "text-blue-500" : ""}`}
                                                    />
                                                </span>
                                                <span>{item.label}</span>
                                            </>
                                        )}
                                        {item.label !== "Analytics" &&
                                            item.label !== "Calendar" && (
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

export default Sidebar;
