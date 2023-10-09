import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from "mdi-material-ui";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrders } from '../../Redux/Admin/Orders/Action'
import { getUsers } from '../../Redux/Admin/Users/Action'
import { getProducts } from '../../Redux/Admin/Product/Action'

const MonthlyOverview = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orders } = useSelector((store) => store.adminsOrder);
  const { users } = useSelector((store) => store.adminsUser);
  const { products } = useSelector((store) => store.adminsProduct);

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt]);

  const calculateTotalDiscounted = () => {
    const validOrders = orders.filter(order => order?.orderStatus !== "CANCELLED");

    const totalDiscounted = validOrders.reduce((total, order) => total + order?.discounte, 0);

    return totalDiscounted;
  };

  const totalDiscounted = calculateTotalDiscounted();

  const calculateNewOrders = () => {
    const validOrders = orders.filter(order => order?.orderStatus === "PLACED");

    const totalNewOrders = validOrders.length;

    return totalNewOrders;
  };
  
  const totalNewOrders = calculateNewOrders();

  useEffect(() => {
    dispatch(getUsers({ jwt }));
  }, [jwt]);

  const totalUsers = users.length;

  useEffect(() => {
    dispatch(getProducts({ jwt }));
  }, [jwt]);

  const totalProducts = products.length;

  const salesData = [
    {
      stats: totalNewOrders.toLocaleString(),
      title: 'New Orders',
      color: 'primary',
      icon: <BriefcaseVariantOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: totalUsers.toLocaleString(),
      title: 'Customers',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: totalProducts.toLocaleString(),
      color: 'warning',
      title: 'Products',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '$ ' + totalDiscounted.toLocaleString(),
      color: 'info',
      title: 'Discounted',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
  ]
  
  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 45,
              height: 45,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Overview'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MonthlyOverview
