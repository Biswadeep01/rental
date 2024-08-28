import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { v4 as uuid } from "uuid";
import { TestimonalActionDrawer } from "./TestimonialActionDrawer";
import { Testimonial } from "./Testimonial";
import {
  apiGetTestimonials,
  apiPostCreateTestimonial,
  apiDeleteTestimonial,
} from "../../../firebase/firestore/queries";
import { Dialog } from "../../Dialog";
import { Loader } from "../../Loader";

export const TestimaonialSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [testimonials, setTestimonials] = useState([]);

  const handleGetTestimonials = async () => {
    setIsLoading(true);
    const data = await apiGetTestimonials();
    setTestimonials(data);
    setIsLoading(false);
  };

  const handleSubmit = async (values) => {
    await apiPostCreateTestimonial({
      id: uuid(),
      ...values,
      createdAt: new Date().toISOString(),
    });
    setIsCreating(false);
    handleGetTestimonials();
  };

  const handleDelete = async () => {
    await apiDeleteTestimonial(selectedTestimonial.id);
    setIsDeleting(false);
    setSelectedTestimonial(null);
    handleGetTestimonials();
  };

  const handleClose = () => {
    setIsCreating(false);
  };

  useEffect(() => {
    handleGetTestimonials();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}

      <Row>
        <Col lg="3" md="4" sm="6" className="mt-2 mb-2">
          <div
            style={{
              borderRadius: 10,
              borderStyle: "dotted",
              borderColor: "#49505750",
              height: 348,
              background: "#f8f9fa",
              cursor: "pointer",
            }}
            onClick={() => setIsCreating(true)}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                <i class="ri-add-circle-line ri-lg"></i> <br /> Add new
                Testimonial
              </p>
            </div>
          </div>
        </Col>

        {testimonials.map((item) => (
          <Col lg="4" md="4" sm="6" className="mt-2" key={item.id}>
            <Testimonial
              {...item}
              onDelete={() => {
                setSelectedTestimonial({ id: item.id });
                setIsDeleting(true);
              }}
            />
          </Col>
        ))}
      </Row>

      {isCreating && (
        <TestimonalActionDrawer onSubmit={handleSubmit} onClose={handleClose} />
      )}

      {isDeleting && (
        <Dialog
          open
          header="Delete Testimonial"
          message="Are you sure you want to delete this testimonial?"
          action="delete"
          onConfirm={handleDelete}
          onClose={() => {
            setIsDeleting(false);
            setSelectedTestimonial(null);
          }}
          closeBtnText={"Cancel"}
          confirmBtnText={"Delete"}
        />
      )}
    </div>
  );
};
