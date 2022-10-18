import { Button } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { WithRouter } from '../utils/WithRouter'

class Homepage extends Component {
    render() {
        const token = localStorage.getItem('token')
        const userEmail = localStorage.getItem('email')
        if (!token) {
            return <Navigate to="/login" />
        }

        return (
            <div className="background-login-pages">
                <div className="form-box-wrapper1">
                    <div className="form-box-name">
                        <div className="title">Homepage</div>
                        {userEmail && <div>{userEmail}</div>}
                        <div className="login-btn">
                            <Button
                                className="logoutBtn"
                                onClick={() => {
                                    localStorage.clear()
                                    this.props.router.navigate('/login')
                                }}
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {})(WithRouter(Homepage))
