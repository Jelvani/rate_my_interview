import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Container, Col, Row } from 'react-bootstrap'
import axios from "axios"
import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

require("dotenv").config({ path: "../../../server/config.env" });

const responseGoogle = (response) => {
    alert("Authentication error: ", response);
}

const handleLogin = async (response) => {


    axios.post(`api/validate/google`, {
        token: response.tokenId
    }, { withCredentials: true })
        .then((response) => {
            localStorage.setItem('token', "valid");
            window.location.href = "/";
        }, (error) => {
            alert("Authentication failed: " + error);
        });

}

export const handleLogout = async (response) => {

    axios.get(`api/logout`, {}, { withCredentials: true })
        .then((response) => {
            localStorage.removeItem('token');
            window.location.href = "/";

        }, (error) => {
            alert("Logout failed: " + error);
        });


}

const Login = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="text-center">
                    <GoogleLogin
                        clientId="183627138974-hjler7kmmmtglhulhf6eu6mv2qm5h4db.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={handleLogin}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Col>
            </Row>
        </Container>
    );
};
export default Login;
