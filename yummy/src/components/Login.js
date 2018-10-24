import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './../css/components/Login.css';

// This is a class that handles the login to the website, using a username and a password
class Login extends Component {

    // constctor for the class
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    // form check - check for empty username or password
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    // handle changes in the two fields
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    // handle submiting the form
    handleSubmit = event => {
        event.preventDefault();
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
                    <a href="/">Lost your password?</a>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">Login</Button>
                </form>
            </div>
        );
    }
}

export default Login; 