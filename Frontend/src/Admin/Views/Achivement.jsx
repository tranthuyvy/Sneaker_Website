import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Achivement = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calculateTotalRevenue = () => {
    const totalRevenue = 0;
    // const validOrders = orders.filter(order => order?.orderStatus !== "CANCELLED");

    // const totalRevenue = validOrders.reduce((total, order) => total + order?.totalDiscountedPrice, 0);

    return totalRevenue;
  };

  const totalRevenue = calculateTotalRevenue();
  const revenue = totalRevenue * 60 / 100;

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
  
       <Card sx={{ position: 'relative' }}>
      <CardContent>
      <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          Sneakers
        </Typography>
        <Typography variant='body2' >Congratulations 🥳</Typography>
        
        <Typography variant='h5' sx={{ my: 3.1, color: 'orange.main' }}>
          {revenue.toLocaleString()} USD
        </Typography>
        <Button size='small' variant='contained'
          onClick={() => navigate("/admin/orders")}
        >
          View Sales
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
   
   
  )
}

export default Achivement;
