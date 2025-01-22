import { Route, Routes } from "react-router-dom";
import useAuth from "./hook/useAuth"
import MainLayout from "./layout/MainLayout";
import HackathonRegister from "./Pages/Register/Register";
import HackathonInfo from "./Pages/HackathonInfo/HackathonInfo";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/chat" element={<h1>chat</h1>} />
        <Route path="/Register" element={<HackathonRegister />} />
        <Route path="/hackathon-info" element={<HackathonInfo/>} />
      </Route>
    </Routes>
  );
}

export default App
