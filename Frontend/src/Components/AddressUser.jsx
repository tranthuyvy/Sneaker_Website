import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import validator from "validator";
import axiosApiInstance from "../config/api";
import "../Styles/AddressUser.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const province_vi = require("../config/province_vi.json");
function AddressUser() {
  const [listAddress, setListAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [delay, setDelay] = useState(Math.random() * 4000 + 500);
  const lang = useSelector((state) => state.lang);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState(0);
  const [idAddressDefault, setIdAddressDefault] = useState(0);
  const [addressName, setAddressName] = useState("");
  const [listProvince, setListProvince] = useState([...province_vi]);
  const [listDistrict, setListDictrict] = useState([
    ...province_vi[0].districts,
  ]);
  const [listWard, setListWard] = useState([
    ...province_vi[0].districts[0].wards,
  ]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      height: "60%",
      width: "60%",
      padding: "2rem",
    },
  };
  useEffect(() => {
    function call() {
      getAddress()
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          setTimeout(() => {
            call();
          }, delay);
        });
    }
    call();
  }, []);
  return (
    <div className=" w-2/3 bg-white">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="w-full min-h-full ml-12">
          <div className="flex flex-wrap -mx-3 mb-4 h-24">
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Name address"
                value={addressName}
                onChange={(e) => handleChange(e, 2)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Recipient name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => handleChange(e, 0)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3  md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => handleChange(e, 1)}
                value={phone}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="97 Man Thiện"
                value={address}
                onChange={(e) => handleChange(e, 3)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2 w-4/5">
            <div className="w-1/2 md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                htmlFor="grid-state"
              >
                Province
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setListDictrict([
                      ...province_vi[e.target.value]?.districts,
                    ]);
                    setDistrict(0);
                    setWard(0);
                    setListWard([
                      ...province_vi[e.target.value]?.districts[0].wards,
                    ]);
                  }}
                >
                  {listProvince.length > 0
                    ? listProvince.map((item, index) => {
                        return <option value={index}>{item.name}</option>;
                      })
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                District
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onClick={(e) => {
                    setDistrict(e.target.value);
                    setWard(0);
                    setListWard([
                      ...province_vi[province]?.districts[e.target.value].wards,
                    ]);
                  }}
                >
                  {listDistrict.length > 0
                    ? listDistrict.map((item, index) => {
                        return <option value={index}>{item.name}</option>;
                      })
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Ward
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onClick={(e) => {
                    setWard(e.target.value);
                  }}
                >
                  {listWard.length > 0
                    ? listWard.map((item, index) => {
                        return <option value={index}>{item.name}</option>;
                      })
                    : null}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="flex justify-around font-bold text-lg">
              <button
                className="h-10 w-40 border ml-4 my-4"
                style={{
                  backgroundColor: "#9155FD",
                  borderRadius: 10,
                  color: "white",
                }}
                onClick={(e) =>
                  saveAddress(e).catch((err) => toast(lang["001"]))
                }
              >
                Save
              </button>
            </div>
            <div className="flex justify-around font-bold text-lg">
              <button
                className="h-10 w-40 border ml-4 my-4"
                style={{
                  backgroundColor: "#9155FD",
                  borderRadius: 10,
                  color: "white",
                }}
                onClick={() => setModalIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
      {isLoading ? (
        <Lottie
          style={{
            width: "70%",
            height: "50%",
            cursor: "pointer",
          }}
          animationData={require("../Animation/Loading.json")}
          loop={true}
        />
      ) : null}
      <div className="h-16 border-b-4 flex justify-between justify-items-center px-10 my-10">
        <div className="text-2xl h-full text-center items-center flex">
          <p className="text-2xl text-center align-middle font-bold">
            MY ADDRESS
          </p>
        </div>
        <div className="text-2xl h-full justify-items-center items-center flex">
          <button
            className="text-xl h-2/3 border bg-red-600 justify-between content-center w-32 text-white btn-add rounded-md"
            onClick={() => setModalIsOpen(true)}
          >
            <AddIcon /> NEW
          </button>
        </div>
      </div>
      <ListAddress />
    </div>
  );
  async function getAddress() {
    const data = (await axiosApiInstance.get("/api/v1/address/get")).data.data;
    setListAddress([...(data?.address || [])]);
    setIdAddressDefault(data?.user?.default_address);
  }
  function handleChange(e, type) {
    if (type == 0) {
      setName(e.target.value);
      return;
    }
    if (type == 1) {
      if (validator.isNumeric(e.target.value)) {
        setPhone(e.target.value);
      }
      return;
    }
    if (type == 2) {
      setAddressName(e.target.value);
      return;
    }
    setAddress(e.target.value);
  }

  function ListAddress() {
    return (
      <div className="">
        {listAddress?.length > 0
          ? listAddress.map((item) => {
              return (
                <div
                  className={`h-44 flex px-10 text-xl item py-3 mb-4 ${
                    item.id === idAddressDefault
                      ? "border-2 border-red-500 rounded-lg shadow-md"
                      : "border border-gray-500 rounded-lg shadow-md"
                  }`}
                  key={item.id}
                >
                  <div className="w-full">
                    <p className="text-2xl font-semibold">{item?.name}</p>
                    <div className="flex items-center pt-1">
                      <p className="text-base">{item?.recipient_name}</p>
                      <div
                        className="h-6 bg-slate-300 mx-3"
                        style={{ width: "1px" }}
                      ></div>
                      <p className="text-base">{item?.phone}</p>
                    </div>
                    <div className="text-gray-500">
                      <p className="text-base">{item?.address}</p>
                      <p className="text-base">
                        {item?.ward}, {item?.district}, {item?.province}
                      </p>
                    </div>

                    <div className="text-red-500 font-semibold rounded-lg mt-2 text-md">
                      {item.id === idAddressDefault ? "Default" : ""}
                    </div>
                  </div>
                  <div className="w-1/6 justify-around items-center flex flex-col">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1.5 px-2.5 rounded-lg border border-green-500 transition-colors duration-300 ease-in-out"
                      onClick={() => {
                        setDefaultAddress(item.id).then().catch();
                      }}
                    >
                      <SettingsApplicationsIcon />
                    </button>

                    <button
                      className={`bg-red-500 hover:bg-red-700 text-white font-semibold py-1.5 px-2.5 rounded-lg border border-red-500 transition-colors duration-300 ease-in-out ${
                        item.id === idAddressDefault ? "hidden" : ""
                      }`}
                      onClick={() => {
                        handleDelete(item.id).then().catch();
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              );
            })
          : "You don't have any address yet"}
      </div>
    );
  }

  async function setDefaultAddress(id) {
    const data = (
      await axiosApiInstance.get(`/api/v1/address/set-default?id=${id}`)
    ).data;
    if (data.code.localeCompare("013") == 0) {
      setIdAddressDefault(id);
    }
    toast(lang[data.code]);
  }

  async function handleDelete(id) {
    const data = (await axiosApiInstance.get(`/api/v1/address/delete?id=${id}`))
      .data;
    if (data.code.localeCompare("022") === 0) {
      setListAddress([...listAddress.filter((item) => item.id !== id)]);
    }
    toast(lang[data.code]);
  }

  async function saveAddress(e) {
    e.preventDefault();
    const body = {
      phone,
      name: addressName,
      recipient_name: name,
      address,
      ward: province_vi[province].districts[district].wards[ward].name,
      district: province_vi[province].districts[district].name,
      province: province_vi[province].name,
    };
    // console.log(body)
    const data = (await axiosApiInstance.post("/api/v1/address/create", body))
      .data;
    setListAddress([...listAddress, data.data]);
    setModalIsOpen(false);
    toast(lang[data.code]);
  }
}
export default AddressUser;
