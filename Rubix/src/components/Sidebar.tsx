import { IconBaseProps } from "react-icons";
import { GoHome, GoOrganization } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { TbBrandGoogleAnalytics, TbClockCheck } from "react-icons/tb";
import { Link, NavLink} from "react-router-dom";
// import {useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CodeXml, List, ListTodo, LucideSquareBottomDashedScissors, User } from "lucide-react";
import { LuListTodo, LuOrigami } from "react-icons/lu";
// import Logo1 from "../assets/Logo1.png"

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
];

const Sidebar = () => {
  // const location = useLocation();
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

//   const decoded = jwtDecode(accessToken);

//   console.log(decoded);

  return (
    <>
      {/* useless div below*/}
      {/* <div
        className={`sticky top-20 z-50 ml-[228px] ${location.pathname == "/dashboard/home" ? "block" : "hidden"}`}
      >
        {/* <p className="absolute w-[65ch] rounded-lg bg-white p-3 shadow-[0px_0px_2px_rgba(0,0,0,0.15)]">
          <strong>For Devansh:</strong> DashBoard is everything here isko home
          karna hai idhar ke components nikalke availabilty mai daal diyo,{" "}
          <br /> <strong>NOT-IMPORTANT:</strong> tune yaha pe div's pe onClick
          lagaya tha logically links ke hona chahiye na?!
          <span className="sr-only">
            yaha matlab ye iska parent div nai iska arrow jisko point karra hai
            woh
          </span>
        </p> */}
      <div className="absolute -left-[22px] top-6 -rotate-90 border-[.7rem] border-transparent border-b-white drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.08)]"></div>
      {/* </div> */}
      <div className="sticky top-4 flex h-[calc(100vh-32px)] flex-col justify-between overflow-y-auto px-4">
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
                    {item.label === "Analytics" && (
                      <>
                        <span
                          className={`flex h-[1.4rem] w-[1.4rem] items-center justify-center rounded-sm border-b-[2.3px] border-l-[2.3px] ${isActive ? "border-blue-500" : "border-slate-600"}`}
                        >
                          <item.icon
                            className={`m-[1px] h-[1.35rem] w-[1.35rem] ${isActive ? "text-blue-500" : ""}`}
                          />
                        </span>
                        <span>{item.label}</span>
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
