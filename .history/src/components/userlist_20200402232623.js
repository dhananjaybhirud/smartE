import React, {Component, useState} from "react";
import Data from './data'
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Userlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Data,
            show: false,
            index: 0,
            edit_data: [],
            name: '',
            username: '',
            email: '',
            touched: {
                name: false,
                username: false,
                email: false
            },
            errors: {
                required: {
                    name: false,
                    username: false,
                    email: false
                },
                valid: {
                    email: true,
                    username: true,
                    name: true
                }
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleModel(show, index) {
        if(!show) { show = true }
       this.setState({
           show,
           index,
           edit_data: Data[index]
       })
    }

    handleClose(show, index){
        show = false
        index = 0
        this.setState({
            show,
            index,
            edit_data: Data[index]
        })

    }

    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);

        this.state.data[this.state.index].name = data.get('name')
        this.state.data[this.state.index].username = data.get('username')
        this.state.data[this.state.index].email = data.get('email')

        this.setState({
            data: this.state.data
        })

        this.handleClose()
    }

    //validation
    handleChange(event) {
        const target = event.target;
        const { value, name } = target;
        const errors = {
            required: { ...this.state.errors.required, [name]: false }
        };
        this.setState({
            [name]: value,
            errors: { ...this.state.errors, ...errors }
        });
    }

    handleBlur(event) {
        const field = event.target.name;
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
        this.validate(event);
    }

    validate(event) {
        const target = event.target;
        const { value, name } = target;

        if (value.length === 0) {
            const errors = {
                required: { ...this.state.errors.required, [name]: true }
            };

            this.setState({
                errors: { ...this.state.errors, ...errors }
            });
            return;
        }

        if (name === 'email') {
            this.validateEmail(value);
        }
    }

    validateEmail(email) {
        const emailIsValid = EMAIL_REGEX.test(this.state.email);
        const errors = {
            valid: { ...this.state.errors.valid, email: emailIsValid }
        };

        this.setState({
            errors: { ...this.state.errors, ...errors }
        });
    }

    hasError(field) {
        return (this.state.errors.required[field] || !this.state.errors.valid[field]) && this.state.touched[field];
    }

    isFormInvalid() {
        const { email, username, name, errors } = this.state;
        const { required, valid } = errors;
        const isSomeFieldRequired = Object.keys(required).some(error => required[error]);
        const isSomeFieldInvalid = Object.keys(valid).some(error => !valid[error]);

        return isSomeFieldInvalid || isSomeFieldRequired;
    }

    displayError(field) {
        const { required, valid } = this.state.errors;
        const errorMessage = `Field ${field} is `;

        if (required[field]) {
            return `${errorMessage} required`;
        }

        if (!valid[field]) {
            return `${errorMessage} not valid`;
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.data.map((x, index)=>{
                    return <tr>
                        <td>{index + 1}</td>
                        <td>{x.name}</td>
                        <td>{x.username}</td>
                        <td>{x.email}</td>
                        <td><Button variant="warning" onClick={this.toggleModel.bind(this, true, index)}>Edit</Button></td>
                    </tr>
                })}



                <Modal show={this.state.show} onHide={this.handleClose.bind(this, false, '')} >
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group as={Row} controlId="name">
                          <Form.Label column sm="2">
                            Name
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control
                                defaultValue={this.state.edit_data.name}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                className={this.hasError('name') ? 'error' : ''}
                                id="name"
                                name="name"
                            />
                          </Col>
                            <Col sm="12">
                                <div className={this.hasError('name') ? 'd-block text-danger error-message':'d-none'}>
                                    Name is required
                                </div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="username">
                          <Form.Label column sm="2">
                            Username
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control
                                defaultValue={this.state.edit_data.username}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                className={this.hasError('username') ? 'error' : ''}
                                id="username"
                                name="username"
                            />
                          </Col>
                            <Col sm="12">
                                <div className={this.hasError('username') ? 'd-block text-danger error-message' : 'd-none'}>
                                    Username is required
                                </div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                          <Form.Label column sm="2">
                            Email
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control
                                defaultValue={this.state.edit_data.email}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                className={this.hasError('email') ? 'error' : ''}
                                id="email"
                                name="email"
                            />
                          </Col>
                            <Col sm="12">
                                <div className={this.hasError('email') ? 'd-block text-danger error-message' : 'd-none'}>
                                    Email is required
                                </div>
                            </Col>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={this.handleClose.bind(this, false, '')}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" disabled={this.isFormInvalid()}>
                        Save
                      </Button>
                    </Modal.Footer>
                    </Form>
                  </Modal>
            </React.Fragment>
        )
    }
}


export default Userlist;
