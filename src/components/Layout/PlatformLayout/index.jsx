import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

// ----------------------------------------------------------------------

const StyledRoot = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

const Main = ({ children }) => (
  <div
    style={{
      flexGrow: 1,
      overflow: "auto",
      minHeight: "100%",
      paddingBottom: 24,
    }}
  >
    {children}
  </div>
);

// ----------------------------------------------------------------------

export default function PlatformLayout() {
  return (
    <StyledRoot>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledRoot>
  );
}
