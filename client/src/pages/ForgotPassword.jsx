import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    mobile: "",
    dob: "",
    new_password: "",
    confirm_password: "",
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

        "http://localhost:5000/api/auth/forgot-password",

        formData
      );



      alert(response.data.message);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed"
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
          Reset Password
        </h2>



        <input
          type="email"
          name="email"
          placeholder="Registered Email"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.email}
          onChange={handleChange}
        />



        <input
          type="text"
          name="mobile"
          placeholder="Registered Mobile Number"
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
          name="new_password"
          placeholder="New Password"
          className="border w-full p-4 rounded-xl mb-4"
          value={formData.new_password}
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
          className="bg-red-600 hover:bg-red-700 text-white w-full p-4 rounded-xl text-xl"
        >
          Reset Password
        </button>



        <p className="text-center mt-5">

          Remember Password?

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

export default ForgotPassword;