import axios from "axios";  
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate(); // used to navigate user to home page after successful login

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://picsum.photos/id/218/2000/900')] bg-cover">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col items-center space-y-10 mb-10 text-cyan-700">
          <h1 className="font-bold text-3xl ">Welcome to <span onClick={() => navigate('/')} className='cursor-pointer'>BestBooking.com</span></h1>
          <h2 className="text-xl ">Make your best reservation after login</h2>
        </div>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="h-10 p-2.5 border rounded-[5px]"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="h-10 p-2.5 border rounded-[5px]"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="border-none px-5 py-2.5 bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] disabled:cursor-not-allowed disabled:bg-[#0071c28c] active:scale-95"
        >
          Login
        </button>
        <Link to="/api/register">
          <p className="text-white lg:text-black">
            Don't have an account yet, please{" "}
            <span className="underline text-[#0071c2]">register.</span>
          </p>
        </Link>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
