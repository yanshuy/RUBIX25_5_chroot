import { Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
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

export const baseUrl = "https://live-merely-drum.ngrok-free.app/";

function App() {

    return (
        <Routes>
          <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/userLogin" element={<UserLogin />} />
              <Route path="/userRegister" element={<UserRegister />} />
              <Route path="/chat" element={<h1>chat</h1>} />
              <Route path="/discover" element={<DiscoverHackathon />} />
              <Route path="/hackathon/register" element={<HackathonRegister />} />
              <Route path="/hackathon/info" element={<HackathonInfo />} />
              <Route path="/hackathon/server" element={<HackathonServer />}></Route>
          </Route>
          <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<UserProfile />} />
              <Route path="/dashboard/profile" element={<UserProfile />} />
              <Route path="/dashboard/hackathons" element={<Hackathons />} />
              <Route path="/dashboard/hackathons/:name" element={<HackathonStatus />} />
            </Route>
        </Routes>
    );
}

export default App;
