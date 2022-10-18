import { Input } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { LoginAPI } from '../api'
import { WithRouter } from '../utils/WithRouter'
import './index.css'
import { setUser } from '../store/userSlice'

const passRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/
const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', formErrors: {} }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value, formErrors: {} })
    }

    handleFormValidation() {
        const { email, password } = this.state
        let formErrors = {}
        let formIsValid = true

        //Email Validation
        if (!email) {
            formIsValid = false
            formErrors['email'] = 'Email id is required.'
        } else if (!emailRegex.test(email)) {
            formIsValid = false
            formErrors['email'] = 'Invalid email id.'
        }

        //Password Validation
        if (!password) {
            formIsValid = false
            formErrors['password'] = 'Password is required.'
        } else if (!passRegex.test(password)) {
            formIsValid = false
            formErrors['password'] =
                'Password must contains atleast 1 uppercase, 1  lowercase & 1 special character'
        }
        this.setState({ formErrors: formErrors })
        return formIsValid
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.handleFormValidation()) {
            const res = await LoginAPI({
                email: this.state.email,
                password: this.state.password,
            })
            if (res?.status === 200) {
                this.props.router.navigate('/')
                this.props.setUser(res.data.user)
                this.setState({ email: '', password: '' })
            }
        }
    }

    componentDidMount() {
        const mail = this.props.router.location.state?.email
        if (mail) {
            this.setState({ email: mail })
        }
    }

    render() {
        const token = localStorage.getItem('token')
        if (token) {
            return <Navigate to="/" />
        }
        return (
            <>
                <div className="background-login-pages">
                    <div className="form-box-wrapper">
                        <div className="form-box">
                            <form onSubmit={this.handleSubmit}>
                                <h3>Log In</h3>
                                <div className="mb-3 form-item  ">
                                    <label htmlFor="email">Email address</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    ></Input>
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
                                <div className="mb-3 form-item ">
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
                                <div className="line-link">
                                    <Link to="/register">
                                        Don't have an account? Register
                                    </Link>
                                </div>
                                <div className="my-4 btn-box">
                                    {' '}
                                    <button type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, { setUser })(WithRouter(Login))
