import { FormEvent, useState } from "react";
// import imgSrc from "../../assets/freelancer-working-laptop-her-house.png";
import loginImg from "../../assets/login.jpg"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// import loadingAnimation from "../../assets/Animation - 1726660821372.webm";
// import { useLogin } from "../../context/LoginContext";
// import { baseURL } from "../../App";
import loginImage from "../../assets/authImage.png"

const UserLogin = () => {
//   const { isLoggedIn, setIsLoggedIn } = useLogin();
//   console.log(isLoggedIn);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {auth , setAuth} =useAuth();

  const navigate = useNavigate();

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);   
    const formData = {
        email,
        password,
    };

    const response = await fetch("https://live-merely-drum.ngrok-free.app/api/token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    }); 
    const data = await response.json();
    
    if (response.status == 200) {
  setLoading(false);

  console.log(data);

  setAuth({
    accessToken: data.access,
    refreshToken: data.refresh,
  });


  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);

  navigate("/");
}

  }


  return (
    <>
      <div className="main flex h-screen items-center justify-center">
        <div className="signIn flex  flex-col">
          <h1 className="mb-7 text-4xl font-bold text-[#1f1f1f]">Login</h1>

          <div className="form">
            <form onSubmit={handleForm} >
              <div className="mb-4 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  email
                </label>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>

              <button
                type="submit"
                className="mb-5 h-10 w-96 rounded-lg bg-black text-center text-white"
              >
                {loading ? (
                  <video
                    autoPlay
                    loop
                    className="mx-auto h-10"
                  ></video>
                ) : (
                  "Login"
                )}
              </button>
              <p>
                Not a member?
                <Link to={"/userRegister"}>
                  {" "}
                  <span className="text-base text-blue-500 hover:underline">
                    Register
                  </span>
                </Link>
              </p>
            </form>
          </div>

        

          
        </div>

        <div className="hidden w-1/2 items-center justify-center lg:flex">
          <img
            className="max-w-lg rounded-lg"
            src={loginImage}
            alt="Freelancer working"
          />
        </div>
      </div>
    </>
  );
};

export default UserLogin;
