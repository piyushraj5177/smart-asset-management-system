import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };



  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop')",
      }}
    >

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/60"></div>



      {/* LOGIN CARD */}

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[480px]"
      >

        {/* LOGO */}

        <div className="flex justify-center mb-5">

          <img
            src="/tata-logo.png"
            alt="TATA Logo"
            className="w-28"
          />

        </div>



        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-blue-800 text-center">
          TATA STEEL
        </h1>

        <p className="text-center text-gray-700 text-xl mt-3 mb-10 font-semibold">
          Smart Asset Management System
        </p>



        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="border-2 border-gray-300 focus:border-blue-700 outline-none w-full p-4 rounded-2xl mb-5 text-lg"
          value={formData.email}
          onChange={handleChange}
        />



        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="border-2 border-gray-300 focus:border-blue-700 outline-none w-full p-4 rounded-2xl mb-8 text-lg"
          value={formData.password}
          onChange={handleChange}
        />



        {/* LOGIN BUTTON */}

        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 transition duration-300 text-white w-full p-4 rounded-2xl text-xl font-semibold shadow-lg"
        >
          Login
        </button>



        {/* LINKS */}

        <div className="flex justify-between mt-8 text-[17px] font-semibold">

          <span
            onClick={() => navigate("/register")}
            className="text-blue-700 cursor-pointer hover:underline"
          >
            New User? Register Here
          </span>



          <span
            onClick={() => navigate("/forgot-password")}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>

        </div>



        {/* FOOTER */}

        <div className="mt-10 border-t pt-5 text-center">

          <p className="text-gray-600 text-sm">
            © 2026 TATA STEEL LIMITED
          </p>

          <p className="text-blue-800 font-bold mt-1 text-sm">
            Developed By Piyush (VT0526850162)
          </p>

        </div>

      </form>

    </div>
  );
}

export default Login;