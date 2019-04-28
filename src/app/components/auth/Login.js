import React, { Component } from 'react'
import { Context } from '../../Context'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { login } from '../../actions/auth.actions'

class Login extends Component{
    static contextType = Context

    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    componentDidMount() {
        if (this.props.auth.isAuthenticated) 
            this.props.history.push('/')    
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuthenticated)
            this.props.history.push('/')
        if (nextProps.errors)
            this.setState({ errors: nextProps.errors })
    }

    submit(e){
        e.preventDefault()

        this.props.login({
            username: this.state.username,
            password: this.state.password
        }, this.props.history)
    }

    onChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { errors } = this.state
        const { _loading } = this.context

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.submit}>
                                        <div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input onChange={this.onChange} name="username" type="text" placeholder="Username"
                                                className={'form-control ' + classnames('', {
                                                    'is-invalid': errors.username
                                                })} autoFocus required/>
                                                {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input onChange={this.onChange} name="password" type="password" placeholder="Password" className="materialize-textarea"
                                                className={'form-control ' + classnames('', {
                                                    'is-invalid': errors.password
                                                })} required/>
                                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Log in
                                        </button>
                                    </form>
                                </div>
                                <div className="class">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { login })(Login)