import { Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HackathonInfo from "./Pages/HackathonInfo/HackathonInfo";
import DashboardLayout from "./layout/DashboardLayout";
import UserProfile from "./Pages/UserDashboard/UserProfile";
import Hackathons from "./Pages/UserDashboard/UserHackathons";
import UserLogin from "./Pages/Auth/UserLogin";
import UserRegister from "./Pages/Auth/UserRegister";
import HackathonRegister from "./Pages/Register/Register";
import DiscoverHackathon from "./Pages/DiscoverHackathon/DiscoverHackathon";
import HackathonServer from "./Pages/HackathonServer/HackathonServer";
import HackathonStatus from "./Pages/UserDashboard/HackathonStatus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrganizeHackathonForm } from "./Pages/UserDashboard/OrganizeHackathonForm";
import Interview from "./Pages/Interview/Interview";

import MyOrganizedHackathons from "./Pages/UserDashboard/MyOrganizedHackathons";
import OrganizerDashboardLayout from "./layout/OrganizerDashboardLayout";
import Teams from "./Pages/OrganizerDashboard/Teams";
import SubmittedProjects from "./Pages/OrganizerDashboard/SubmittedProjects";
import Result from "./Pages/OrganizerDashboard/Result";
import RoomPage from "./Pages/Videocalling/RoomPage";
import FindTeammates from "./Pages/FindTeammate/FindTeammate";
import ProjectSubmission from "./Pages/UserDashboard/ProjectSubmission";
import ProjectsPage from "./Pages/Projects/Project";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Forum from "./Pages/forums/Forums";
const queryClient = new QueryClient();

export const baseUrl = "https://live-merely-drum.ngrok-free.app";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/chat" element={<h1>chat</h1>} />
                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/user/register" element={<UserRegister />} />
                    <Route path="/discover" element={<DiscoverHackathon />} />
                    <Route
                        path="/hackathon/:id/register"
                        element={<HackathonRegister />}
                    />
                    <Route
                        path="/hackathon/:id/info"
                        element={<HackathonInfo />}
                    />
                    <Route
                        path="/hackathon/:id/server"
                        element={<HackathonServer />}
                    />
                    <Route
                        path="/dashboard/hackathons/room/:hackathonid/:teamid"
                        element={<RoomPage />}
                    />
                    <Route
                        path="/dashboard/hackathons/room/:roomid"
                        element={<RoomPage />}
                    />
                    <Route
                        path="/hackathon/:id/interview"
                        element={<Interview />}
                    ></Route>
                    <Route path="/find-teammates" element={<FindTeammates />} />
                    <Route
                        path="/project/submission"
                        element={<ProjectSubmission />}
                    ></Route>

                    {/* <Route path="/project" element={<ProjectsPage />}></Route> */}
                    <Route path="/forum" element={<Forum />}></Route>
                </Route>

                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<UserProfile />} />
                    <Route
                        path="/dashboard/profile"
                        element={<UserProfile />}
                    />
                    <Route
                        path="/dashboard/hackathons"
                        element={<Hackathons />}
                    />
                    <Route
                        path="/dashboard/hackathons/:id"
                        element={<HackathonStatus />}
                    />
                    <Route
                        path="/dashboard/organizehackathons"
                        element={<MyOrganizedHackathons />}
                    />
                    <Route
                        path="/dashboard/organizehackathons/new"
                        element={<OrganizeHackathonForm />}
                    />
                </Route>
                <Route
                    path="organizerdashboard"
                    element={<OrganizerDashboardLayout />}
                >
                    <Route index element={<Teams />} />
                    <Route
                        path="/organizerdashboard/teams/:id"
                        element={<Teams />}
                    />

                    <Route
                        path="/organizerdashboard/projects/:id"
                        element={<SubmittedProjects />}
                    />
                    <Route
                        path="/organizerdashboard/result/:id"
                        element={<Result />}
                    />
                </Route>
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
