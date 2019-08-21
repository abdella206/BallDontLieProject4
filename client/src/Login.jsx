import React from 'react'
import axios from 'axios';
import SignInSide from './SignInSide'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("it works")
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if(res.data.type === 'error') {
                this.setState({
                    message: res.data.message
                })
            } else {
                localStorage.setItem('mernToken', res.data.token)
                this.props.liftToken(res.data)
                console.log(res.data)
            }
        }).catch(err => {
            this.setState({
                message: "Maximum login attempts exceeded. Please try again later."
            })
        })
    }


    render() {

        return (
            <div className="Login">
                {/* <h3>Log into your account:
                    <form onSubmit={this.handelSubmit}>
                        <input onChange={this.handleEmailChange} 
                                value={this.state.email} 
                                type="email"
                                name="email"
                                placeholder="Enter your email" /><br />
                        <input onChange={this.handlePasswordChange} 
                                value={this.state.password} 
                                type="password"
                                name="password"
                                placeholder="Enter your password" /><br />
                        <input type="submit" value="log in"/>
                    </form>
                </h3> */}
                <SignInSide  
                            handleSubmit={this.handleSubmit}
                            handlePasswordChange={this.handlePasswordChange} 
                            handleEmailChange={this.handleEmailChange} 
                            password={this.state.password} 
                            email={this.state.email} />
            </div>
        )
    }
}

export default Login
