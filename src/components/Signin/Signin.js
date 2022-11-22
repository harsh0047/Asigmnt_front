import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAlert } from 'react-alert';

import TextField from '../TextField/TextField';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import { userLogin } from '../../api/ApiService';
import { validateEmail, isEmptyField } from '../../utils/validator';

const Container = styled.div`
   text-align: center;
   width: 100%;
`;

const ButtonsContainer = styled.div`
   text-align: center;
   width: 100%;
`;

const Signin = (props) => {
    const alert = useAlert();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginCall = () => {
        if (!isEmptyField(email)) {
            alert.error('Please enter Email!');
        } else if (!validateEmail(email)) {
            alert.error("Please Enter Valid Email!")
        } else if (!isEmptyField(password)) {
            alert.error("Please Enter Password!")
        } else {
            let data = {
                email: email,
                password: password
            }
            userLogin(data).then(res => {
                console.log("res=>", res)
                if (res.code === 200) {
                    alert.success('Sign up sucessfully!');
                    setPassword('');
                    setEmail('');
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("userid", res.data._id);
                } else {
                    if (res.msg === "USE_NOT_FOUND") {
                        alert.error('User Not Found!');
                    }else{
                        alert.error('Wrong Email Password!');
                    }
                }
            }).catch(err => {
                alert.error('Something Went Wrong!');
                console.log("err ==>", err);
            })
        }
    }

    const handleLogin = () => {
        props.setActive("Register");
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <Container>
            <TextField value={email} onChange={handleEmail} placeholder={"Email"} heading={"EMAIL"}/>
            <TextField value={password} onChange={handlePassword} type={'password'} placeholder={"Password"} heading={"PASSWORD"}/>
            <ButtonsContainer>
                <PrimaryButton onClick={loginCall}>Login to workspace</PrimaryButton>
                <SecondaryButton onClick={handleLogin}>Create Workspace</SecondaryButton>
            </ButtonsContainer>
        </Container>
    )
}

export default Signin