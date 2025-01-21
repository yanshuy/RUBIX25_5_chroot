import { Route, Routes } from "react-router-dom";
import useAuth from "./hook/useAuth"
import MainLayout from "./layout/MainLayout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/chat" element={<h1>chat</h1>} />
      </Route>
    </Routes>
  );
}

export default App
