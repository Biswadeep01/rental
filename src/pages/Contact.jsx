import React from 'react'
import {Link} from "react-router-dom";
import "../styles/contact.css";
import { Container, Col, Form, FormGroup, Button, Label, FormText, Input} from "reactstrap";
const Contact = () => {
  return (
    <section> 
      <Container>
      <Form>
        <FormGroup row>
          <Label for="name"sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input id="name" name="name" placeholder="Full Name" type="text"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="email"
            sm={2}
          >
            Email
          </Label>
          <Col sm={10}>
            <Input
              id="email"
              name="email"
              placeholder="abc@xyz.com"
              type="email"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="exampleText"
            sm={2}
          >
            Message
          </Label>
          <Col sm={10}>
            <Input
              id="exampleText"
              name="text"
              placeholder="Write your message here"
              type="textarea"
            />
          </Col>
        </FormGroup>
        <FormGroup
          row
          tag="fieldset"
        >
          <legend className="col-form-label col-sm-2">
            Choose
          </legend>
          <Col sm={10}>
            <FormGroup check>
              <Input
                name="radio2"
                type="radio"
              />
              {' '}
              <Label check>
                Feedback
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                name="radio2"
                type="radio"
              />
              {' '}
              <Label check>
                Query
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup
          check
          row
        >
          <Col
            sm={{
              offset: 2,
              size: 10
            }}
          >
            <Link to="/"><Button className="contact__btn">Submit</Button></Link>
          </Col>
        </FormGroup>
      </Form>
      </Container>
    </section>
  )
}

export default Contact