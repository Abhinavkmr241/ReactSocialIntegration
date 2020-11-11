import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { ToastsStore } from "react-toasts";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_USERDATA } from '../redux/actions';
import './Profile.css';

const CLIENT_ID = '350673643485-j13ifkj35b8nqrp1tckkqfs2hlbtuu8g.apps.googleusercontent.com';

export const Profile = () => {
    const userData = useSelector(state => state);
    const dispatch = useDispatch()

    const [redirect, setRedirect] = useState(false);

    const logout = () => {
        dispatch({
            type: REMOVE_USERDATA
        })
        setRedirect(true);
        ToastsStore.success("Logged out successfully...");
    }

    const handleLogoutFailure = (response) => {
        console.log(response);
        ToastsStore.error("Log out failure!!!");
    }

    return (
        <div className="profileBody">
            <div className="dataBody">
                {redirect ? <Redirect to={{
                    pathname: '/'
                }} /> : null
                }
                <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "lightblue" }}>
                    <div className="container">
                        <h1 className="display-4 text-center" style={{ color: "darkslateblue" }}>
                            Profile
                    </h1>
                    </div>
                </div>
                <img src={userData.picture} alt={userData.name} />
                <h2>Welcome {userData.name}</h2>
                <h4>Email: {userData.email}</h4>
                {userData.googleId.trim().length ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={() => logout()}
                        onFailure={() => handleLogoutFailure()}
                    /> :
                    <button className="logoutButton"
                        onClick={() => logout()}>
                        Log Out
                    </button>
                }
            </div>
        </div>
    )
}

export default Profile;
