import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

// ----------------------------------------------------------------------

const StyledRoot = ({ children }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

const StyledSidebar = ({ children }) => (
  <div
    style={{
      width: "200px",
      height: "80vh",
      position: "relative",
      overflow: "hidden",
      paddingTop: 24,
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
      padding: 28,
      width: "calc(100% - 200px)",
      height: "100vh",
      background: "#f5f5f5",
    }}
  >
    {children}
  </div>
);

const Container = ({ children }) => (
  <div
    style={{
      padding: "0px 0px 0px 12px",
      display: "flex",
      flexDirection: "row",
      gap: 16,
    }}
  >
    {children}
  </div>
);

// ----------------------------------------------------------------------

export function AdminLayout() {
  return (
    <StyledRoot>
      <Header />

      <Container>
        <StyledSidebar>
          <Sidebar />
        </StyledSidebar>

        <Main>
          <Outlet />
        </Main>
      </Container>
    </StyledRoot>
  );
}
