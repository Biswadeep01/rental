import React from "react";
import { Offcanvas, OffcanvasBody } from "reactstrap";

export const Drawer = ({
  children,
  open,
  toggle,
  placement = "start",
  width = "408px",
  ...rest
}) => {
  return (
    <Offcanvas
      isOpen={open}
      toggle={toggle}
      direction={"right"}
      style={{ height: "100vh", right: 0 }}
      {...rest}
    >
      <OffcanvasBody style={{ width }}>{children}</OffcanvasBody>
    </Offcanvas>
  );
};
