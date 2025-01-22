import { Route, Routes } from "react-router-dom";
import useAuth from "./hook/useAuth"
import MainLayout from "./layout/MainLayout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<h1>register ho gaya bhaiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>} />
        <Route path="/chat" element={<h1>chat</h1>} />
        <Route path="/hackathonInfo" element={<HackathonInfo/>} />
        <Route path="/userLogin" element={<UserLogin/>} />
        <Route path="/userRegister" element={<UserRegister/>} />

        <Route path="/Register" element={<HackathonRegister />} />
        <Route path="/hackathon-info" element={<HackathonInfo/>} />
      </Route>
    </Routes>
  );
}

export default App
