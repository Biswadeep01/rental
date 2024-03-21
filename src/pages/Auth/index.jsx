import React, { useEffect, useState } from "react";

// sections
import SignIn from "./SignIn";
import SingnUp from "./SignUp";
import { useAppContext } from "../../context";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledContent = ({ children }) => (
  <div
    style={{
      maxWidth: 480,
      margin: "auto",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      padding: 12,
    }}
  >
    {children}
  </div>
);

// ----------------------------------------------------------------------

export default function AuthWrapper() {
  const [authNavigation, setAuthNavigation] = useState(0);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const AUTH_SECTION_OBJ = {
    0: <SignIn setAuthNavigation={setAuthNavigation} />,
    1: <SingnUp setAuthNavigation={setAuthNavigation} />,
  };

  useEffect(() => {
    if (user.token) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <>
      {/* <Container maxWidth="sm"> */}
      <StyledContent>{AUTH_SECTION_OBJ[authNavigation]}</StyledContent>
      {/* </Container> */}
    </>
  );
}
