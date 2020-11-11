import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { connect } from "react-redux";
import { addUser } from "../redux/actions/user-data";
import { Redirect } from 'react-router-dom';
import { ToastsStore } from "react-toasts";

const CLIENT_ID = '350673643485-j13ifkj35b8nqrp1tckkqfs2hlbtuu8g.apps.googleusercontent.com';

class HomePage extends Component {
    state = {
        redirect: false
    }

    login = (response) => {
        if (response.accessToken) {
            let user = {
                name: response.profileObj.name,
                token: response.accessToken,
                email: response.profileObj.email,
                picture: response.profileObj.imageUrl,
                googleId: response.googleId
            }
            this.props.addUser({ user });
            this.setState({ redirect: true });
            ToastsStore.success("Login Successful...");
        }
    }

    handleLoginFailure = (response) => {
        console.log(response);
        ToastsStore.error("Login failed!!!");
    }

    componentClicked = () => {
        console.log('clicked');
    }

    getFacebookResponse = (response) => {
        if (response.accessToken) {
            let user = {
                name: response.name,
                token: response.accessToken,
                email: response.email,
                picture: response.picture.data.url,
                googleId: ''
            }
            this.props.addUser({ user });
            this.setState({ redirect: true });
            ToastsStore.success("Login Successful...");
        } else {
            console.log(response);
            ToastsStore.error("Login failed!!!");
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: '/profile'
                }} />
            );
        }
        return (
            <div>
                <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "lightblue" }}>
                    <div className="container">
                        <h1 className="display-4 text-center" style={{ color: "darkslateblue" }}>
                            Profile Viewer
                    </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText='Login with Google'
                            onSuccess={this.login}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                        />
                    </div>
                    <div className="col-md-6">
                        <FacebookLogin
                            appId="3620120748038075"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.getFacebookResponse}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

