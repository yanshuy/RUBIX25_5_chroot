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
import FindTeammates from "./Pages/FindTeammate/TeammateFinder";
import MyOrganizedHackathons from "./Pages/UserDashboard/MyOrganizedHackathons";
import OrganizerDashboardLayout from "./layout/OrganizerDashboardLayout";
import Teams from "./Pages/OrganizerDashboard/Teams";
import SubmittedProjects from "./Pages/OrganizerDashboard/SubmittedProjects";
const queryClient = new QueryClient();

export const baseUrl = "https://live-merely-drum.ngrok-free.app";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route
                        path="/"
                        element={
                            <h1>
                                register ho gaya bhaiiiiiiiiiiiiiiiiiiiiiiiiiiii
                            </h1>
                        }
                    />
                    <Route path="/chat" element={<h1>chat</h1>} />
                    <Route path="/userLogin" element={<UserLogin />} />
                    <Route path="/userRegister" element={<UserRegister />} />
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
                        path="/hackathon/server"
                        element={<HackathonServer />}
                    />
                    <Route path="/interview" element={<Interview />}></Route>
                    <Route path="/find-teammates" element={<FindTeammates />} />
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
                    path="organizer-dashboard"
                    element={<OrganizerDashboardLayout />}
                >
                    <Route index element={<Teams />} />
                    <Route
                        path="/organizer-dashboard/Teams"
                        element={<Teams />}
                    />

                    <Route
                        path="/organizer-dashboard/Projects"
                        element={<SubmittedProjects />}
                    />
                    <Route
                        path="/organizer-dashboard/hackathons/:name"
                        element={<HackathonStatus />}
                    />
                    <Route
                        path="/organizer-dashboard/organizehackathons"
                        element={<OrganizeHackathonForm />}
                    />
                </Route>
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
