import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class ContactTable extends Component {
  render() {
    const { contacts, onEdit, onDelete } = this.props;
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Gender</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phone}</td>
              <td>{contact.gender}</td>
              <td className="text-end">
                <Button variant="primary" onClick={() => onEdit(i)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => onDelete(i)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default ContactTable;
