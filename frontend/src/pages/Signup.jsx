import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Signup = () => {
  const { api,navigate } = useContext(AppContext);
  const [formData, setformData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", formData);

      setformData({
        email: "",
        name: "",
        password: "",
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        navigate("/login")
      } else {
        toast.error(res.data.msg);
      }
      toast.success(res.data.msg);
    } catch (err) {
      console.log(err);
      toast.error("login failed");
    }
  };
  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 w-full max-w-85 mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          onChange={(e) => handleChange(e)}
          id="email"
          name="email"
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          id="name"
          name="name"
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Username"
          required
        />
        <input
          onChange={(e) => handleChange(e)}
          id="password"
          name="password"
          className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full mb-3 bg-orange-500 hover:bg-orange-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Create Account
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
