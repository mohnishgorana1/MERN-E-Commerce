import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../Redux/user/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    console.log("loginData", loginData);
    if (!email || !password) {
      toast.error("All Fields are Required");
      return;
    }

    const response = await dispatch(loginUserAsync(loginData));
    if (response?.payload?.success === true) {
      navigate("/");
    }
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full bg-gray-200 flex flex-col items-center justify-center gap-8">
      <h1 className="mt-8 py-1 text-center font-bold text-slate-950 text-3xl">
        Register
      </h1>
      <div className="mb-8 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]  text-center px-5 py-8 bg-gray-300 grid shadow-gray-800  shadow-2xl">
        <form noValidate onSubmit={handleSubmit} className="w-full grid gap-5">
          <div className="flex sm:items-center justify-between w-full">
            <label
              htmlFor="email"
              className="place-self-start text-sm sm:text-lg font-semibold tracking-wider "
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputs}
              value={loginData.email}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>
          <div className="flex sm:items-center justify-between w-full">
            <label
              htmlFor="password"
              className="place-self-start text-sm sm:text-lg font-semibold tracking-wider "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInputs}
              value={loginData.password}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>{" "}
          <button
            type="submit"
            className="tracking-widest justify-self-center mt-5 px-10 py-2 font-semibold 
                sm:font-bold text-white sm:text-xl text-lg border bg-gray-900
                hover:bg-gray-200 hover:border hover:border-gray-900 hover:text-gray-950 duration-200 ease-linear"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
