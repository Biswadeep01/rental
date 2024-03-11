import React from "react";
import {
  Button,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";

const Widget = () => {
  return (
    <div>
      <div style={styles.widget}>
        <Button id="PopoverFocus" type="button">
          <i class="ri-phone-fill"></i>
        </Button>
      </div>

      <UncontrolledPopover
        target="PopoverFocus"
        trigger="focus"
        style={{ height: "10rem" }}
      >
        <PopoverHeader>Need Help?</PopoverHeader>
        <PopoverBody>
          <div className="d-flex gap-2">
            <i class="ri-phone-fill"></i> <p>(340) 776-3730</p>
          </div>
          <div className="d-flex gap-2">
            <i class="ri-time-line"></i>{" "}
            <p>
              Mon - Sat : 9:00 AM - 5:00 PM <br /> Sun: Rotating Sundays (Please
              call for reservation)
            </p>
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default Widget;

const styles = {
  widget: {
    position: "fixed",
    width: "65px",
    height: "65px",
    bottom: "55px",
    right: "40px",
    backgroundColor: "#0C9",
    color: "#FFF",
    borderRadius: "50px",
    textAlign: "center",
    boxShadow: "2px 2px 3px #999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    zIndex: 9999,
  },
};
