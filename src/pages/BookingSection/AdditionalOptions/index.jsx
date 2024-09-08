import React from "react";
import {
  Button,
  Col,
  FormText,
  FormGroup,
  Row,
  Label,
  Input,
} from "reactstrap";
import isEmpty from "lodash.isempty";

const AdditionalOptions = ({ options = [], formik, handleStepChange }) => {
  const handleCheckbox = (paramsOption) => {
    const selectecOptions = formik.values.options;

    if (!formik.values.options.includes(paramsOption)) {
      formik.setValues({
        ...formik.values,
        options: [...formik.values.options, paramsOption],
      });
    } else {
      const remainingOptions = selectecOptions.filter(
        (option) => option !== paramsOption
      );

      formik.setValues({
        ...formik.values,
        options: remainingOptions,
      });
    }
  };

  return (
    <div className="my-4">
      {!isEmpty(options) && (
        <Col md="12">
          <Row className="g-4">
            {options.map((item) => (
              <Col
                md="6"
                sm="6"
                xs="6"
                key={item.label}
                onClick={() => handleCheckbox(item)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 48,
                    paddingLeft: 16,
                    paddingRight: 16,
                    background: "#e9ecef",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  <i
                    class="ri-car-line ri-lg"
                    style={{
                      marginRight: 12,
                      color: "#6c757d",
                      marginTop: 2,
                    }}
                  />

                  <FormGroup check>
                    <Input
                      type="checkbox"
                      checked={formik.values.options.includes(item)}
                      style={{
                        marginRight: 8,
                        height: 20,
                        width: 20,
                        cursor: "pointer",
                      }}
                    />
                  </FormGroup>

                  <Label check>{item.label}</Label>

                  <FormText
                    style={{
                      marginLeft: "auto",
                      marginTop: 0,
                      fontWeight: 600,
                    }}
                  >
                    $ {item.price}
                  </FormText>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      )}
      <Col md="12" className="my-4">
        <Button
          type="submit"
          className="booking"
          style={{ width: "100%" }}
          onClick={() => handleStepChange(3)}
        >
          Next
        </Button>
      </Col>
    </div>
  );
};

export default AdditionalOptions;
