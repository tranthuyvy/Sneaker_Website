import Grid from "@mui/material/Grid";
import AdminPannel from "../../Styles/AdminPannelWrapper";
// import Achivement from "../tables/Achivement";
// import MonthlyOverview from "../tables/MonthlyOverView";
// import CardStatsVertical from "../../Styles/CardStatsVertical";
// import SalesByCountries from "../tables/SalesByContry";
// import DepositWithdraw from "../tables/DepositeAndWithdraw";
// import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme, darkTheme } from "../them/customThem";
import "./dashBoard.css";
// import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
// import SalesOverTime from "../tables/SalesOverTime";
// import RecentOrders from "../tables/RecentOrders";
// import {AssuredWorkloadIcon }from '@mui/icons-material';
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from "mdi-material-ui";

const darkTheme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#312d4b',
    },
    secondary: {
      main: '#ff0000',
    },
  },
});

// bg-[#28243d]
const Dashboard = () => {
  return (
    <div className="adminContainer ">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {/* <Achivement /> */}
            </Grid>
            <Grid item xs={12} md={8}>
              {/* <MonthlyOverview /> */}
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              {/* <SalesOverTime/> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <CustomersTable /> */}
            </Grid>
            {/* <Grid item xs={12} md={12} lg={8}>
              <RecentlyAddeddProducts />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <SalesByCountries/>
            </Grid> */}
            <Grid item xs={12} md={12} lg={12}>
              {/* <SalesByCountries/> */}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {/* <RecentOrders /> */}
            </Grid>
            
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;