import { IconBaseProps } from "react-icons";
import { Link, NavLink, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Users, Github, Folders, Trophy } from "lucide-react";
import Logo from "../assets/logo.png";
import TeamCommits from "../Pages/OrganizerDashboard/TeamCommits";


const navItems = [
    {
        basePath: "/organizerdashboard/teams",
        label: "Teams",
        icon: (props: IconBaseProps) => <Users {...props} />,
    },
    {
        basePath: "/organizerdashboard/teamscommits",
        label: "Teams Commits",
        icon: (props: IconBaseProps) => <Github {...props} />,
    },
    {
        basePath: "/organizerdashboard/projects",
        label: "Submitted Projects",
        icon: (props: IconBaseProps) => <Folders {...props} />,
    },
    {
        basePath: "/organizerdashboard/result",
        label: "Results",
        icon: (props: IconBaseProps) => <Trophy {...props} />,
    },
];

const OrganizerSidebar = () => {
    const { id } = useParams(); 

    const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

    return (
        <>
            <div className="absolute -left-[22px] top-6 -rotate-90 border-[.7rem] border-transparent border-b-white drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.08)]"></div>
            <div className="sticky top-7 flex flex-col justify-between overflow-y-auto px-4">
                <div>
                    <div className="mb-4 mt-2 h-24 cursor-pointer border-b border-slate-300 pb-3 pl-5">
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
                                to={
                                    id
                                        ? `${item.basePath}/${id}`
                                        : item.basePath
                                }
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
