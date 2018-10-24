import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './../css/components/Register.css';

// This is a class that handles the registrationto the website, 
// It takes information about the user: username, password, email
class Register extends Component {

    // constctor for the class
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            checkPassword: "",
            email: "",
        };
    }

    // form check - check for empty username or password
    validateForm() {
        console.log(this.enableColor)
        if (this.state.username.length > 0 && this.state.password.length > 0 &&
        this.state.checkPassword.length > 0 && this.state.email.length> 0) {
            return true
        }
    }

    // handle changes in the four fields
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    // handle submiting the form
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.password !== this.state.checkPassword) {
            console.log("Passwords don't match")
        }
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup className="input" controlId="username" bsSize="large">
                        <FormControl autoFocus type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="input" controlId="password" bsSize="large">
                        <FormControl type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="input" controlId="checkPassword" bsSize="large">
                        <FormControl type="password" placeholder="password" value={this.state.checkPassword} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="input" controlId="email" bsSize="large">
                        <FormControl type="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">Register</Button>
                </form>
            </div>
        );
    }
}

export default Register; 