import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { filters, singleFilter, sortOptions } from "./FilterData";

function ProductFilter() {
  const [listSize, setListSize] = useState([]);
  const [price, setPrice] = useState({});
  const dispatch = useDispatch();
  function handleFilter(e, sectionId) {
    if (e.target.name.localeCompare("size") == 0) {
      if (e.target.checked) setListSize([...listSize, e.target.value]);
      else setListSize([...listSize.filter((item) => item != e.target.value)]);
    }
  }
  function handleRadioFilterChange(e, sectionId) {
    const [minPrice, Maxprice] = e.target.value.split("-").map(Number);
    setPrice({ minPrice, Maxprice });
  }
  useEffect(() => {
    console.log(listSize, price);
  }, [listSize.length, price.minPrice + price.Maxprice]);
  return (
    <form className="hidden lg:block rounded-md p-4 ml-2">
      <h2 className="py-3 font-semibold opacity-60 text-lg">Filters</h2>
      {filters.map((section) => (
        <Disclosure
          // defaultOpen={false}
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => handleFilter(e, section.id)}
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      {singleFilter.map((section) => (
        <Disclosure
          // defaultOpen={true}
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {section.options.map((option, optionIdx) => (
                      <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        onChange={(e) => handleRadioFilterChange(e, section.id)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

export default ProductFilter;
