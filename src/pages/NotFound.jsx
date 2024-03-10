import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Helmet } from "react-helmet-async";
import Page404 from "../assets/svgs/not-found.png";

const NotFound = () => {
  return (
    <StyledContainer>
      <Helmet>
        <title> Just Rent a Car | Page Not Found </title>
      </Helmet>
      <img src={Page404} alt="404" style={{ width: 250, height: 250 }} />
      <p>Sorry, page not found!</p>
      <p>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </p>
      <Link to="/home">
        <Button>Go to Home</Button>
      </Link>
    </StyledContainer>
  );
};

export default NotFound;

const StyledContainer = ({ children, styleProps, props }) => (
  <div
    style={{
      maxWidth: 480,
      margin: "auto",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: 12,
      ...styleProps,
    }}
    {...props}
  >
    {children}
  </div>
);
