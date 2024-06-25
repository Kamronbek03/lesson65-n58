import React, { Component } from "react";
import { Form } from "react-bootstrap";

class Filter extends Component {
  render() {
    const { filter, onChange } = this.props;
    return (
      <div className="select">
        <Form.Select value={filter} onChange={onChange}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
      </div>
    );
  }
}

export default Filter;
