import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../Redux/user/authSlice";
import { BsPersonCircle } from "react-icons/bs";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const handleInputs = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: [e.target.value],
    });
  };

  function getImage(e) {
    e.preventDefault();

    // getting image
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setRegisterData({
        ...registerData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      phone,
      address,
      avatar,
    } = registerData;

    if (  !firstName ||  !lastName ||  !username ||  !email ||  !password ||  !confirmPassword ||  !phone ||  !address ||  !avatar) {
      toast.error("All Fields are Required");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("avatar", avatar);

    console.log("FORMDATA: ", formData);

    const response = await dispatch(registerUserAsync(formData));
    if (response?.payload?.success === true) {
      navigate("/");
    }
    setRegisterData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      avatar: ""
    });
  };

  return (
    <div className="w-full bg-gray-200 flex flex-col items-center justify-center gap-8">
      <h1 className="mt-8 py-1 text-center font-bold text-slate-950 text-3xl">
        Register
      </h1>
      <div className="mb-8 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]  text-center px-5 py-8 bg-gray-300 grid shadow-gray-800  shadow-2xl">
        <form noValidate onSubmit={handleSubmit} className="w-full grid gap-5">
          <div className="place-self-center mb-8">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-900 rounded-full m-auto" />
              )}
            </label>
            <input
              className="hidden"
              type="file"
              name="image_uploads"
              id="image_uploads"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={getImage}
            />
          </div>
          <div className="flex sm:items-center justify-between w-full">
            <label
              htmlFor="firstName"
              className="place-self-start text-sm sm:text-lg font-semibold tracking-wider "
            >
              FirstName
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={handleInputs}
              value={registerData.firstName}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>
          <div className="flex sm:items-center justify-between w-full">
            <label htmlFor="lastName" className="place-self-start text-sm sm:text-lg font-semibold tracking-wider ">
              LastName
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={handleInputs}
              value={registerData.lastName}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>{" "}
          <div className="flex sm:items-center justify-between w-full">
            <label htmlFor="username" className="place-self-start text-sm sm:text-lg font-semibold tracking-wider ">
              UserName
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleInputs}
              value={registerData.username}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>{" "}
          <div className="flex sm:items-center justify-between w-full">
            <label htmlFor="email" className="place-self-start text-sm sm:text-lg font-semibold tracking-wider ">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputs}
              value={registerData.email}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>
          <div className="flex sm:items-center justify-between w-full">
            <label htmlFor="password" className="place-self-start text-sm sm:text-lg font-semibold tracking-wider ">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInputs}
              value={registerData.password}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>{" "}
          <div className="flex sm:items-center justify-between w-full">
            <label
              htmlFor="confirmPassword"
              className="place-self-start text-sm sm:text-lg font-semibold tracking-wider "
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputs}
              value={registerData.confirmPassword}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>{" "}
          <div className="flex sm:items-center justify-between w-full">
            <label htmlFor="phone" className="place-self-start text-sm sm:text-lg font-semibold tracking-wider ">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Enter 10 digits Phone No."
              onChange={handleInputs}
              value={registerData.phone}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>{" "}
          <div className="flex sm:items-center justify-between w-full">
            <label htmlFor="address" className="place-self-start text-sm sm:text-lg font-semibold tracking-wider ">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Permanent address"
              onChange={handleInputs}
              value={registerData.address}
              className="text-center py-1 border border-gray-500 text-gray-900 sm:w-[60%]"
            />
          </div>
          <button
            type="submit"
            className="tracking-widest justify-self-center mt-5 px-10 py-2 font-semibold 
                sm:font-bold text-white sm:text-xl text-lg border bg-gray-900
                hover:bg-gray-200 hover:border hover:border-gray-900 hover:text-gray-950 duration-200 ease-linear"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
