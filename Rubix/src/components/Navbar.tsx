import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Calendar, LayoutDashboard, LogOut, TrophyIcon } from "lucide-react";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken"); // Clear access token
        navigate("/"); // Redirect to home page
    };
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/80 px-6 backdrop-blur-sm">
    <div className="flex h-fit items-center justify-between">
        <div className="mb-4 mt-2 h-20 cursor-pointer pl-5">
            <Link to={"/"}>
                <img
                    src={Logo}
                    alt="Logo"
                    className="h-[100%] object-cover"
                />
            </Link>
        </div>
        <nav className="hidden space-x-6 md:flex">
            <Link
                to="/"
                className="font-medium hover:text-primary"
            >
                Home
            </Link>
            <Link
                to="/discover"
                className="font-medium hover:text-primary"
            >
                Explore
            </Link>
            <Link
                to="/find-teammates"
                className="font-medium hover:text-primary"
            >
                TeamUp
            </Link>
            <Link
                to="/forum"
                className="font-medium hover:text-primary"
            >
                Forum
            </Link>
        </nav>
        <div className="flex items-center space-x-4">
            {!localStorage.getItem("accessToken") ? (
                <>
                    <Link to={"/user/login"}>
                        <Button variant="outline">Log In</Button>
                    </Link>
                    <Link to={"/user/register"}>
                        <Button>Register Now</Button>
                    </Link>
                </>
            ) : (
                <div className="relative">
                    <IoPersonCircleSharp
                        className="cursor-pointer text-[3rem] text-slate-300"
                        onClick={() =>
                            setIsDropdownOpen(!isDropdownOpen)
                        }
                    />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg">
                            <ul className="py-1">
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                    >
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        User Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/hackathons"
                                        className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                    >
                                        <TrophyIcon className="mr-2 h-4 w-4" />
                                        My Hackathons
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/organizerdashboard"
                                        className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Organizer Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
</header>
  )
}
