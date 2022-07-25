import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate(); // used to navigate user to home page after successful login

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      setCredentials({
        username: username,
        email: email,
        password: password,
      });

      try {
        const res = await axios.post("/auth/register", credentials);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }

    console.log(passwordMatch)
  };

  console.log(formData)
  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://picsum.photos/id/845/2000/900')] bg-cover">
      <div className="flex flex-col gap-2.5 items-center mx-5">
        <div className="flex flex-col items-center space-y-10 mb-10 text-cyan-700">
          <h1 className="font-bold text-3xl ">Welcome to <span onClick={() => navigate('/')} className='cursor-pointer'>BestBooking.com</span></h1>
          <h2 className="text-xl ">
            Please register to make best reservations for you
          </h2>
        </div>
        {!passwordMatch ? <p className=" text-[#ffffff]  md:text-xl md:text-black">Passwords do not match!</p> : null}
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-2.5 w-full"
        >
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            className="h-10 p-2.5 border rounded-[5px] w-full"
          />
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="h-10 p-2.5 border rounded-[5px] w-full"
          />
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="h-10 p-2.5 border rounded-[5px] w-full"
          />
          <input
            type="password"
            placeholder="Confirm password"
            id="password2"
            name="password2"
            value={password2}
            onChange={handleChange}
            className="h-10 p-2.5 border rounded-[5px] w-full"
          />
          <button
            disabled={loading}
            type="submit"
            className="border-none px-5 py-2.5 bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] disabled:cursor-not-allowed disabled:bg-[#0071c28c] w-full"
          >
            Register
          </button>
        </form>
        
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Register;
