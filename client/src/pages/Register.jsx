import { Input } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { RegisterAPI } from '../api'
import { WithRouter } from '../utils/WithRouter'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            conPassword: '',
            formErrors: {},
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value, formErrors: {} })
    }

    handleFormValidation() {
        const { email, password, conPassword } = this.state
        let formErrors = {}
        let formIsValid = true

        //Email validation
        if (!email) {
            formIsValid = false
            formErrors['email'] = 'Email id is required.'
        } else if (
            !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(email)
        ) {
            formIsValid = false
            formErrors['email'] = 'Invalid email id.'
        }

        //Password validation
        if (!password) {
            formIsValid = false
            formErrors['password'] = 'Password is required.'
        } else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/.test(password)) {
            formIsValid = false
            formErrors['password'] =
                'Password must contains atleast 1 uppercase, 1 lowercase & 1 special character'
        }

        //Confirm Password validation
        if (!conPassword) {
            formIsValid = false
            formErrors['conPassword'] = 'Password is required.'
        } else if (password !== conPassword) {
            formIsValid = false
            formErrors['conPassword'] =
                'password and confirm password does not match'
        }

        this.setState({ formErrors: formErrors })
        return formIsValid
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.handleFormValidation()) {
            const res = await RegisterAPI({
                email: this.state.email,
                password: this.state.password,
            })
            if (res.status === 201) {
                this.props.router.navigate('/login', {
                    replace: true,
                    state: { email: this.state.email },
                })
                this.setState({ email: '', password: '', conPassword: '' })
            }
        }
    }

    render() {
        return (
            <div className="background-login-pages">
                <div className="form-box-wrapper">
                    <div className="form-box">
                        <h3>Register</h3>

                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3 form-item">
                                <label htmlFor="email">Email address</label>

                                <Input
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors['email'] && (
                                    <div
                                        style={{
                                            color: 'red',
                                            paddingBottom: 10,
                                        }}
                                    >
                                        {this.state.formErrors['email']}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3 form-item">
                                <label htmlFor="password">Password</label>
                                <Input.Password
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors['password'] && (
                                    <div
                                        style={{
                                            color: 'red',
                                            paddingBottom: 10,
                                        }}
                                    >
                                        {this.state.formErrors['password']}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3 form-item">
                                <label htmlFor="conPassword">
                                    Confirm password
                                </label>
                                <Input.Password
                                    id="conPassword"
                                    name="conPassword"
                                    value={this.state.conPassword}
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors['conPassword'] && (
                                    <div
                                        style={{
                                            color: 'red',
                                            paddingBottom: 10,
                                        }}
                                    >
                                        {this.state.formErrors['conPassword']}
                                    </div>
                                )}
                            </div>
                            <div className="line-link">
                                <Link to="/login">
                                    Already have an account? Sign in
                                </Link>
                            </div>
                            <div className="my-4 btn-box">
                                <button type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default WithRouter(Register)
