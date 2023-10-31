import React from "react";
import { Avatar } from "@mui/material";
import { format } from 'date-fns';
import { Rating, Box, Typography, Grid } from "@mui/material";

const ProductReviewCard = ({item}) => {
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            //   alt={item.id_user}
              src=""
            >
              {/* {item.id_user.toUpperCase()} */}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <div className="">
              {/* <p className="font-semibold text-lg">{item.id_user}</p> */}
              <p className="opacity-70 mt-1">{format(new Date(item.create_at), 'dd/MM/yyyy')}</p>
            </div>
            <div>
            
              <Rating
                value={item.star}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />
             
            </div>
            <p>
              {item.comment}
            </p>
          </div>
        </Grid>
      </Grid>
      <div className="col-span-1 flex"></div>
    </div>
  );
};

export default ProductReviewCard;
