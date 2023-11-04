import React, { useEffect, useState } from "react";
function OrderUser() {
  const styleLi = "text-center pt-3 cursor-pointer";
  const [listLi, setListLi] = useState([
    { isActive: true, name: "Placed" },
    { isActive: false, name: "Confirmed" },
    { isActive: false, name: "Delivering" },
    { isActive: false, name: "Success" },
    { isActive: false, name: "Failed" },
    { isActive: false, name: "Cancelled" },
    { isActive: false, name: "Return" },
  ]);

  return (
    <div className=" w-4/5 bg-white relative h-screen">
      <ul className="absolute h-16 w-full top-0 grid-cols-7 grid border-b-2 text-xl">
        {listLi?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setListLi([
                ...listLi.map((i, ind) => {
                  return { ...i, isActive: ind == index };
                }),
              ]);
              console.log(listLi);
            }}
            className={styleLi}
            style={{ color: item.isActive ? "#E76BFB" : "black" }}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="h-28 w-full bg-red-500 bottom-0 absolute"></div>
    </div>
  );
}
export default OrderUser;
