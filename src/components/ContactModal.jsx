import React, { Component } from "react";
import Modal from "react-modal";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"; // <-- Add react-toastify
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

class ContactModal extends Component {
  render() {
    const { show, onHide, form, onChange, onSubmit, selected } = this.props;
    return (
      <Modal
        isOpen={show}
        onRequestClose={onHide}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
          },
        }}
      >
        <h2>{selected === null ? "Adding contact" : "Editing contact"}</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please fill this field!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please fill this field!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please fill this field!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={form.gender} onChange={onChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>
          <div
            className="modal-footer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {selected === null ? "Add" : "Save"}
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </Modal>
    );
  }
}

export default ContactModal;
