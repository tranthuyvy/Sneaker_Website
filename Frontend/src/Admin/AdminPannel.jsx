import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemIcon from "@mui/material/ListItemIcon";
import { customTheme } from "./them/customThem";
// import AdminNavbar from "./Navigation/AdminNavbar";
import Dashboard from "./Views/dashBoard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./Views/sideBar";
import "./AdminPannel.css";
import ProductsTable from "./componets/Products/ProductsTable";
import AllOrder from "./componets/Order/allOrder";
// import OrderDetail from "./componets/Orders/OrderDetail";
import Customers from "./componets/User/allUser";
// import ProductReview from "./componets/productReview/ProductReview";
import AllStaff from "./componets/Staff/allStaff";
import AllSupplier from "./componets/Supplier/allSupplier";
import CreateSupplier from "./componets/Supplier/createSupplier";
import UpdateSupplier from "./componets/Supplier/updateSupplier";
import StaffProfile from "./componets/Staff/staffProfile";
import CreateStaffAccount from "./componets/Staff/createStaffAccount";
import Login from "./componets/auth/Login";
import { logout } from "../Redux/Admin/Auth/Action";
import { useDispatch } from "react-redux";
import CreateProduct from "./componets/createProduct/CreateProduct";

const drawerWidth = 240;

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Staff", path: "/admin/staff" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Supplier", path: "/admin/supplier" },
  // {name:"Create Account",path:"/admin/staff/create"},
];

export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const handleAccount = () => {
    navigate("/admin/staff/profile");
  };

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        {["Account", "Logout"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={text === "Logout" ? handleLogout : handleAccount}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleSideBarViewInMobile = () => {
    setSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />

        {!isLoginPage && (
          <Drawer
            variant={isLargeScreen ? "permanent" : "temporary"}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                ...(isLargeScreen
                  ? {}
                  : {
                    top: 0,
                    [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                    {
                      position: "fixed",
                      left: 0,
                      right: 0,
                      height: "100%",
                      zIndex: (theme) => theme.zIndex.drawer + 2,
                    },
                  }),
              },
            }}
            open={isLargeScreen || (sideBarVisible && isLoginPage)}
            onClose={handleCloseSideBar}
          >
            {drawer}
          </Drawer>
        )}
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            {/* <Route path="/product/create" element={<CreateProductForm/>}></Route> */}
            {/* <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route> */}
            {/* <Route path="/product/reviews/:productId" element={<ProductReview/>}></Route> */}
            <Route path="/products" element={<ProductsTable />}></Route>
            <Route path="/orders" element={<AllOrder />}></Route>
            {/* <Route path="/orders/:orderId" element={<OrderDetail/>}></Route> */}
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/supplier" element={<AllSupplier />}></Route>
            <Route path="/supplier/create" element={<CreateSupplier />}></Route>
            <Route path="/supplier/update/:id" element={<UpdateSupplier />}></Route>
            <Route path="/staff" element={<AllStaff />}></Route>
            <Route path="/staff/profile" element={<StaffProfile />}></Route>
            <Route path="/staff/create" element={<CreateStaffAccount />}></Route>
            <Route path="/product/create" element={<CreateProduct />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/demo" element={<SideBar />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
