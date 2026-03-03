import React, { useContext, useState } from "react";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { toast, Toaster } from "react-hot-toast";
const AdminLogin = () => {
  const { navigate, api, loading, setLoading, setAdmin, admin } =
    useContext(AppContext);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleChange = (e) => {
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/admin/login", formData);
      if (data.success) {
        setAdmin(true);
        toast.success(data.msg);
        navigate("/admin");
      }
    } catch (err) {
      const message = err.response?.data?.msg || "Login failed. Try again.";
      toast.error(message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          Admin Login
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please Login to continue</p>

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail height={16} width={20} className="text-[#6B7280]" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="flex items-center relative mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock height={16} width={20} className="text-[#6B7280]" />
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={formData.password}
            className="border-none outline-none ring-0"
            onChange={(e) => handleChange(e)}
            required
          />

          {!isPasswordVisible ? (
            <Eye
              height={16}
              width={20}
              className="text-[#6B7280] absolute right-2 cursor-pointer hover:text-gray-400 transition-colors"
              onClick={() => setIsPasswordVisible(true)}
            />
          ) : (
            <EyeClosed
              height={16}
              width={20}
              className="text-[#6B7280]  absolute right-2 cursor-pointer  hover:text-gray-400 transition-colors"
              onClick={() => setIsPasswordVisible(false)}
            />
          )}
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-orange-500 cursor-pointer hover:opacity-90 transition-opacity"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            click here
          </button>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
