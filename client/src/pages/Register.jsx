import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    full_name: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirm_password: "",
    role_id: 1,
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
        "https://smart-asset-backend-1629.onrender.com/api/auth/register",
        formData
      );



      alert(response.data.message);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };



  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-200">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-[500px]"
      >

        <h1 className="text-5xl font-bold text-blue-700 text-center mb-3">
          TATA STEELS
        </h1>

        <h2 className="text-2xl font-bold text-center mb-8">
          Smart Asset Management
        </h2>



        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.full_name}
          onChange={handleChange}
        />



        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.email}
          onChange={handleChange}
        />



        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.mobile}
          onChange={handleChange}
        />



        <input
          type="date"
          name="dob"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.dob}
          onChange={handleChange}
        />



        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.password}
          onChange={handleChange}
        />



        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          className="border w-full p-4 rounded-xl mb-6"
          value={formData.confirm_password}
          onChange={handleChange}
        />



        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white w-full p-4 rounded-xl text-xl"
        >
          Register
        </button>



        <p className="text-center mt-5">

          Already Registered?

          <Link
            to="/"
            className="text-blue-700 font-bold ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;