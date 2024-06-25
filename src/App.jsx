import React, { Component } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"; // <-- Add react-toastify
import ContactModal from "./components/ContactModal";
import ContactTable from "./components/ContactTable";
import Filter from "./components/Filter";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem("contacts")) || [],
      filter: localStorage.getItem("contact_filter") || "all",
      search: "",
      modalShow: false,
      selected: null,
      form: { firstName: "", lastName: "", phone: "", gender: "male" },
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
    if (prevState.filter !== this.state.filter) {
      localStorage.setItem("contact_filter", this.state.filter);
    }
  }

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { contacts, form, selected } = this.state;
    if (selected === null) {
      this.setState({ contacts: [...contacts, form], modalShow: false });
      toast.success("Contact successfully added!", { position: "top-center" });
    } else {
      const updatedContacts = contacts.map((el, i) =>
        i === selected ? form : el
      );
      this.setState({ contacts: updatedContacts, modalShow: false });
      toast.success("Contact successfully updated!", {
        position: "top-center",
      });
    }
    this.setState({
      form: { firstName: "", lastName: "", phone: "", gender: "male" },
      selected: null,
    });
  };

  handleEdit = (index) => {
    this.setState({
      selected: index,
      form: this.state.contacts[index],
      modalShow: true,
    });
  };

  handleDelete = (index) => {
    if (window.confirm("Do you want to delete this contact?")) {
      const updatedContacts = this.state.contacts.filter((_, i) => i !== index);
      this.setState({ contacts: updatedContacts });
      toast.success("Contact successfully deleted!", {
        position: "top-center",
      });
    }
  };

  render() {
    const { contacts, filter, search, modalShow, form, selected } = this.state;
    const filteredContacts = contacts
      .filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone.includes(search)
      )
      .filter((contact) => filter === "all" || contact.gender === filter);
    return (
      <Container>
        <InputGroup className="my-3">
          <FormControl
            className="input"
            placeholder="Searching"
            aria-label="Searching"
            value={search}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
          <div className="buttons">
            <Filter
              filter={filter}
              onChange={(e) => this.setState({ filter: e.target.value })}
            />
            <div className="add-btn">
              <Button
                variant="outline-success"
                onClick={() => this.setState({ modalShow: true })}
              >
                Add contact
              </Button>
            </div>
          </div>
        </InputGroup>
        <ContactTable
          contacts={filteredContacts}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
        <ContactModal
          show={modalShow}
          onHide={() => this.setState({ modalShow: false })}
          form={form}
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
          selected={selected}
        />
        <ToastContainer position="top-right" />
      </Container>
    );
  }
}

export default App;
