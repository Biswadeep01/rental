import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { useAppStore } from "../../../store";
import "./index.css";

const validationSchema = yup.object({
  pickupDate: yup.string().required("*required"),
  pickupTime: yup.string().required("*required"),
  returnDate: yup
    .string()
    .required("*required")
    .test(
      "is-different-from-pickup-date",
      "Cannot be the same as pickup date",
      function (value) {
        const { pickupDate } = this.parent;
        return value !== pickupDate;
      }
    ),
  returnTime: yup.string().required("*required"),
});

const FindCarForm = () => {
  const navigate = useNavigate();
  const { fetchAvailableCars } = useAppStore();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      pickupDate: "",
      pickupTime: "",
      returnDate: "",
      returnTime: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await fetchAvailableCars({
          pickupDateTime: `${values.pickupDate}T${values.pickupTime}:00`,
          returnDateTime: `${values.returnDate}T${values.returnTime}:00`,
        });
        setLoading(false);
        navigate("/fleet", {
          state: {
            pickupDateTime: `${values.pickupDate}T${values.pickupTime}:00`,
            returnDateTime: `${values.returnDate}T${values.returnTime}:00`,
          },
        });
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    },
  });

  return (
    <>
      <Form className="form" onSubmit={formik.handleSubmit}>
        <div
          style={{ marginTop: "1rem" }}
          className="d-flex align-items-center justify-content-between flex-wrap"
        >
          <FormGroup className="form__group">
            <Label>Pick Up Date</Label>
            <Input
              type="date"
              name="pickupDate"
              min={dayjs(new Date()).format("YYYY-MM-DD")}
              value={formik.values.pickupDate}
              onChange={formik.handleChange}
              style={{ height: "3rem" }}
            />
            {Boolean(formik.errors.pickupDate) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.pickupDate}
              </FormText>
            )}
          </FormGroup>

          <FormGroup className="form__group">
            <Label>Pick Up Time</Label>
            <Input
              type="time"
              name="pickupTime"
              value={formik.values.pickupTime}
              onChange={formik.handleChange}
              style={{ height: "3rem" }}
            />
            {Boolean(formik.errors.pickupTime) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.pickupTime}
              </FormText>
            )}
          </FormGroup>

          <FormGroup className="form__group">
            <Label>Return Date</Label>
            <Input
              type="date"
              name="returnDate"
              min={formik.values.pickupDate}
              value={formik.values.returnDate}
              onChange={formik.handleChange}
              style={{ height: "3rem" }}
            />
            {Boolean(formik.errors.returnDate) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.returnDate}
              </FormText>
            )}
          </FormGroup>

          <FormGroup className="form__group">
            <Label>Return time</Label>
            <Input
              type="time"
              name="returnTime"
              value={formik.values.returnTime}
              onChange={formik.handleChange}
              style={{ height: "3rem" }}
            />
            {Boolean(formik.errors.returnTime) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.returnTime}
              </FormText>
            )}
          </FormGroup>

          <FormGroup className="form__group">
            <Label>Promo Code</Label>
            <input type="text" placeholder="xxx-yyy-zzz" />
          </FormGroup>

          <FormGroup className="form__group">
            <Button
              type="submit"
              className="booking"
              style={{ width: "100%", marginTop: "2rem", height: "2.8rem" }}
              disabled={loading}
            >
              {loading ? (
                <Spinner style={{ color: "#e9ecef" }} />
              ) : (
                <div>
                  <i class="ri-search-line ri-lg" /> Find Car
                </div>
              )}
            </Button>
          </FormGroup>
        </div>
      </Form>
    </>
  );
};

export default FindCarForm;

const styles = {
  helperText: {
    marginLeft: 10,
    color: "#c1121f",
    fontSize: 12,
  },
};
