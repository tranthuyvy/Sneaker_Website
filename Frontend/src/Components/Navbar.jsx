import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../config/axios";
function Navbar() {
  const [isNavigation, setIsNavigation] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const lang = useSelector((state) => state.lang);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    (async () => {
      const data = (await axios.get("/api/v1/category/get")).data;
      if (data.code.localeCompare("002") == 0) {
        setListCategory([...data.data]);
      }
    })().catch((err) => {
      alert("Loi");
    });
  }, []);
  return (
    <Fragment>
      {/* Navigation bar */}
      <nav className="bg-blue-700 text-white border-b border-gray-200 lg:px-20 px-2">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center py-6">
              <img
                src="https://cdn.printgo.vn/uploads/media/774255/logo-giay-1_1586510617.jpg"
                alt="Ecommerce"
                className="h-8 w-8 mr-2"
              />
              <span className="font-bold text-white text-lg">Ecommerce</span>
            </Link>

            {/* Navigation menu */}
            <ul className="hidden md:flex items-center space-x-4">
              {listCategory.length > 0
                ? listCategory.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={`/category/${item.name}`}
                          className="font-medium text-white hover:text-black"
                        >
                          {`${item.name}`}
                        </Link>
                      </li>
                    );
                  })
                : null}
            </ul>
            {/* Search bar */}
            <form className="hidden md:block flex-grow max-w-sm">
              <div className="relative w-full">
                <input
                  type="search"
                  className="block w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:text-gray-900 sm:text-sm"
                  placeholder="Search"
                />
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.716 14.966A7.25 7.25 0 1114.35 8.33a7.25 7.25 0 01-6.634 6.635zM15.5 9.75a5.75 5.75 0 10-11.5 0 5.75 5.75 0 0011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </form>

            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <Link
                to={`cart`}
                className="font-medium text-white hover:text-black"
              >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8, ml-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              </Link>   
            </div>

            {/* Mobile navigation menu */}
            <div className="md:hidden flex items-center">
              <button onClick={handleShowMenu} className="text-white p-2">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu */}
      {showMenu && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col py-4 space-y-2 px-5">
            <li>
              <Link
                to="/men"
                className="font-medium text-white hover:text-black"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/women"
                className="font-medium text-white hover:text-black"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/kids"
                className="font-medium text-white hover:text-black"
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                to="/home-living"
                className="font-medium text-white hover:text-black"
              >
                Home & Living
              </Link>
            </li>
            <li>
              <Link
                to="/beauty"
                className="font-medium text-white hover:text-black"
              >
                Beauty
              </Link>
            </li>
            <li>
              <Link
                to="/offers"
                className="font-medium text-white hover:text-black"
              >
                Offers
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
}
export default Navbar;
