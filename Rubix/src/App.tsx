import { Route, Routes } from "react-router-dom";
import useAuth from "./hook/useAuth";
import MainLayout from "./layout/MainLayout";
import HackathonInfo from "./Pages/HackathonInfo/HackathonInfo";
import DashboardLayout from "./layout/DashboardLayout";
import UserProfile from "./Pages/UserDashboard/UserProfile";
import Hackathons from "./Pages/UserDashboard/Hackathons";
import UserLogin from "./Pages/Auth/UserLogin";
import UserRegister from "./Pages/Auth/UserRegister";
import HackathonRegister from "./Pages/Register/Register";
import DiscoverHackathon from "./Pages/DiscoverHackathon/DiscoverHackathon";
import HackathonServer from "./Pages/HackathonServer/HackathonServer";
// import Interview from "./Pages/Interview/Interview";

export const baseUrl = "https://live-merely-drum.ngrok-free.app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

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
                        path="/hackathon/register"
                        element={<HackathonRegister />}
                    />
                    <Route
                        path="/hackathon/:id/info"
                        element={<HackathonInfo />}
                    />
                    <Route
                        path="/hackathon/server"
                        element={<HackathonServer />}
                    ></Route>
                    {/* <Route path="/interview" element={<Interview />}></Route> */}
                </Route>
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
