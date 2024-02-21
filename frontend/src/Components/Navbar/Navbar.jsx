import logo from "../../images/logo2.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function Navbar() {
  const navLinks = [
    {
      id: 1,
      name: "MEN",
      link: "products/men",
    },
    {
      id: 2,
      name: "WOMEN",
      link: "products/women",
    },
  ];

  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="w-full grid py-5 px-10 bg-[#131921ff]">
      <nav className="grid grid-cols-12 justify-between items-center text-white">
        <div id="sidebar" className="col-span-2 sm:col-span-3">
          <GiHamburgerMenu
            className="text-2xl sm:text-3xl hover:scale-125 sm:hover:scale-110 duration-200 ease-linear "
            onClick={toggleSidebar}
          />
        </div>
        <div
          id="logo"
          className="col-span-8 sm:col-span-6 grid items-center justify-center"
        >
          <Link
            to={"/"}
            className="px-5 py-1 rounded-xl text-white font-bold text-xl shadow-sm shadow-gray-200 max-w-fit"
          >
            Fashion Hub
          </Link>
        </div>
        <div
          id="cart_auth"
          className="col-span-2 sm:col-span-3 flex items-center justify-end gap-10"
        >
          <Link
            to="/register"
            className="hidden sm:flex font-semibold px-4 py-1 border border-white hover:bg-white hover:text-[#131921ff] ease-in-out duration-200"
          >
            Register
          </Link>
          <Link className="flex items-center gap-1 px-4 py-1 border border-transparent hover:border hover:border-white ease-in-out duration-200">
            <span className="hidden sm:flex">Cart</span>{" "}
            <FaShoppingCart className="text-2xl" />
          </Link>
        </div>
      </nav>

      {/* sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>
      {/* sidebar-content */}
      <div
        className={`fixed inset-y-0 left-0 w-[80%] sm:w-64 bg-gray-300 transform transition-transform ease-in-out duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col px-4 py-8 gap-8 justify-between">
          <div>
            <Link
              to="/products/men"
              className="block py-2 px-4 hover:bg-slate-900 hover:text-white"
              onClick={toggleSidebar}
            >
              MEN
            </Link>
            <Link
              to="products/women"
              className="block py-2 px-4 hover:bg-slate-900 hover:text-white"
              onClick={toggleSidebar}
            >
              WOMEN
            </Link>
          </div>
          <div className="grid gap-4">
            <Link
              to="/register"
              onClick={toggleSidebar}
              className="flex items-center justify-between font-semibold px-4 py-1 border border-[#131921ff] hover:bg-[#131921ff] hover:text-white ease-in-out duration-200"
            >
              Register <FaRegUser className="text-xl" />
            </Link>
            <Link
              to="/cart"
              onClick={toggleSidebar}
              className="flex items-center justify-between gap-1 px-4 py-1 border border-[#131921ff] hover:bg-[#131921ff] hover:text-white ease-in-out duration-200"
            >
              <span className="">Cart</span>{" "}
              <FaShoppingCart className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
