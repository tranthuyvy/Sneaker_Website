export const color = [
    "white",
    "Black",
    "Red",
    "marun",
    "Being",
    "Pink",
    "Green",
    "Yellow",
  ];
  
  export const filters = [
    // {
    //   id: "color",
    //   name: "Color",
    //   options: [
    //     { value: "white", label: "White" },
    //     { value: "black", label: "Black"},
    //     { value: "red", label: "Red"},
    //     { value: "beige", label: "Beige" },
    //     { value: "blue", label: "Blue" },
    //     { value: "brown", label: "Brown" },
    //     { value: "green", label: "Green" },
    //     { value: "gray", label: "Gray" },
    //     { value: "yellow", label: "Yellow"},
    //     { value: "multi_color", label: "Multi_Color"}
    //   ],
    // },
  
    {
      id: "size",
      name: "Size",
      options: [
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
        { value: "31", label: "31" },
        { value: "32", label: "32" },
        { value: "33", label: "33" },
      ],
    },
    
  ];
  
  export const singleFilter=[
    {
      id: "price",
      name: "Price",
      options: [
        { value: "1-99", label: "$1 - $99" },
        { value: "99-399", label: "$99 - $399" },
        { value: "399-999", label: "$399 - $999" },
        { value: "999-1999", label: "$999 - $1999" },
        { value: "1999-2999", label: "$1999 - $2999" },
      ],
    },
    // {
    //   id: "disccout",
    //   name: "Disccount Range",
    //   options: [
    //     { value: "10", label: "10% And Above" },
    //     { value: "20", label: "20% And Above" },
    //     { value: "30", label: "30% And Above" },
    //     { value: "40", label: "40% And Above" },
    //     { value: "50", label: "50% And Above" },
    //   ],
    // },
  ]
  
  export const sortOptions = [
    
    { name: "Price: Low to High", query: "price_low", current: false },
    { name: "Price: High to Low", query: "price_high", current: false },
  ];
  