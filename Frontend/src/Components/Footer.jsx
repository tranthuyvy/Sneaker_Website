import React from "react";
import { Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="">
      <Grid
        className="bg-black text-white mt-10 text-center"
        container
        color={"white"}
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" gutterBottom>
            Company
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Blog
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Jobs
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Press
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Partners
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" gutterBottom>
            Solutions
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Marketing
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Analytics
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Commerce
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Insights
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Support
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" gutterBottom>
            Documentation
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Guides
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            API Status
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Claim
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Privacy
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Terms
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6" gutterBottom>
            Maps
          </Typography>
          <Typography>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1058740550257!2d106.7178476758412!3d10.803202589347196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a6df0cb50d%3A0xfae2c84e2e1a4119!2zMTY0IE5ndXnhu4VuIFbEg24gVGjGsMahbmcsIFBoxrDhu51uZyAyNSwgQsOsbmggVGjhuqFuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1695575568267!5m2!1svi!2s"
              width="320px"
              height="150px"
              style={{ border: "0", marginLeft: "30px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </Typography>
        </Grid>

        <Grid className="pt-20" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy; 2023 My Company. All rights reserved.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Made with love by Me.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Icons made by{" "}
            <Link
              href="https://www.freepik.com"
              color="inherit"
              underline="always"
            >
              Freepik
            </Link>{" "}
            from{" "}
            <Link
              href="https://www.flaticon.com/"
              color="inherit"
              underline="always"
            >
              www.flaticon.com
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
