import React, { useState } from "react";

// sections
import SignIn from "./SignIn";
import SingnUp from "./SignUp";

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

  const AUTH_SECTION_OBJ = {
    0: <SignIn setAuthNavigation={setAuthNavigation} />,
    1: <SingnUp setAuthNavigation={setAuthNavigation} />,
  };

  return (
    <>
      {/* <Container maxWidth="sm"> */}
      <StyledContent>{AUTH_SECTION_OBJ[authNavigation]}</StyledContent>
      {/* </Container> */}
    </>
  );
}
