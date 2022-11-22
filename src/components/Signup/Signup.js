import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAlert } from 'react-alert';

import TextField from '../TextField/TextField';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import { userRegister } from '../../api/ApiService';
import { validateEmail, isEmptyField } from '../../utils/validator';
// import imageSample from '../../images/sampleProfile.jpg'

const Container = styled.div`
   text-align: center;
   width: 100%;
`;

const NameContainer = styled.div`
   display: flex;
`;

const NameSubContainerLeft = styled.div`
   width: 50%;
   margin-right: 10px;
`;

const NameSubContainerRight = styled.div`
   width: 50%;
   margin-left: 10px;
`;

const RadioContainer = styled.div`
    margin-top: 20px;
    text-align: left;
    font-size: 12px;
`;

const RadioContainerHeader = styled.p`
    text-align: left;
    margin: 1px;
    font-size: 10px;
    color: gray;
    font-weight: bold
`;

const RadioButton = styled.input`
    
`;

const ButtonsContainer = styled.div`
   text-align: center;
   width: 100%;
`;

const ShowPass = styled.div`
   text-align: Right;
   width: 91%;
`;

const ShowPassCon = styled.span`
    cursor: pointer;
    user-select:none;
    font-size: 12px;
    color: grey;
`;

// const WorkUrlContainer = styled.div`
//     display: flex;
// `;

// const WorkUrlContainerLeft = styled.div`
//     width: 60%;
// `;

// const WorkUrlContainerRight = styled.div`
//     width: 40%;
// `;
// const WorkUrlContainerTest = styled.p`
//     text-align: left;
//     margin: 24px 0px 0px 10px;
//     font-size: 12px;
//     color: gray;
// `;

// const ImgaeInput = styled.input`
//     visibility: hidden;
// `;

// const PreviwImage = styled.img`
//     border-radius: 50%;
//     cursor: pointer;
// `;

// const TopImageContainer = styled.div`
//     text-align: left;   
// `;

// const ImageChangeTest = styled.span`
//     font-size: 10px;
//     padding: 2px;
//     border: 1px lightgrey solid;
//     border-radius: 4px;
//     margin: 0px 0px 0px 9px;
//     cursor: pointer;
// `;

const Signup = (props) => {
    const workSpaceEndpoint = ".sample.com"
    const alert = useAlert();
    const [showPass, SetShowPass] = useState(false);
    const [showPassText, setShowPassText] = useState('Show');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [role, setRole] = useState('designer');
    // const [workUrl, setWorkUrl] = useState('');
    // const [image, setImage] = useState({ preview: "", raw: "" });

    const registerCall = () => {
        if (!isEmptyField(firstName)) {
            alert.error('Please enter First Name!');
        } else if (!isEmptyField(lastName)) {
            alert.error('Please enter Last Name!');
        } else if (!validateEmail(email)) {
            alert.error("Please Enter Valid Email!")
        } else if (!isEmptyField(password)) {
            alert.error("Please Enter Password!")
        } else if (!isEmptyField(rePassword)) {
            alert.error("Please Enter Repeat Password!")
        } else if (password != rePassword) {
            alert.error("Password not mached!")
        } else {
            let data = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                // work_url: workUrl + workSpaceEndpoint,
                password: password,
                role: role
            }
            userRegister(data).then(res => {
                if (res.code === 200) {
                    alert.success('Sign up sucessfully!');
                    setFirstName('');
                    setLastName('');
                    setPassword('');
                    setEmail('');
                    setRePassword('');
                    // setWorkUrl('');
                    handleSignin();
                } else {
                    console.log(res)
                    if (res.msg === "EMAIL_OR_WORK_URL_EXISTS") {
                        alert.error('User Already Exists!');
                    } else {
                        alert.error('Something Went Wrong!');
                    }
                }
            }).catch(err => {
                console.log("err ==>", err);
                alert.error('Something Went Wrong!');
            })
        }
    }

    // const handleChangeImage = e => {
    //     if (e.target.files.length) {
    //         setImage({
    //             preview: URL.createObjectURL(e.target.files[0]),
    //             raw: e.target.files[0]
    //         });
    //     }
    // };

    const handlePasswordShow = () => {
        SetShowPass(!showPass);
        if (!showPass) {
            setShowPassText('Hide');
        } else {
            setShowPassText('Show');
        }
    }

    const handleSignin = () => {
        props.setActive('Login')
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRePassword = (e) => {
        setRePassword(e.target.value);
    }


    const handleChnageRole = (e) => {
        setRole(e.currentTarget.value);
    }

    return (
        <Container>

            {/* <TopImageContainer>
                <label htmlFor="upload-button">
                    {image.preview ? (
                        <PreviwImage src={image.preview} alt="dummy" width="50" height="50" />
                    ) : (
                        <PreviwImage src={imageSample} alt="dummy" width="50" height="50" />
                    )}
                    <ImageChangeTest>change</ImageChangeTest>
                </label>
                <ImgaeInput
                    type="file"
                    id="upload-button"
                    onChange={handleChangeImage}
                />

            </TopImageContainer> */}

            <NameContainer>
                <NameSubContainerLeft>
                    <TextField value={firstName} onChange={handleFirstName} placeholder={""} heading={"FIRST NAME"} />
                </NameSubContainerLeft>
                <NameSubContainerRight>
                    <TextField value={lastName} onChange={handleLastName} placeholder={""} heading={"LAST NAME"} />
                </NameSubContainerRight>
            </NameContainer>
            <TextField value={email} onChange={handleEmail} placeholder={""} heading={"EMAIL ADDRESS"} />

            <RadioContainer>
                <RadioContainerHeader>WHAT BEST DESCRIES WHAT YOU DO?</RadioContainerHeader>
                <RadioButton type="radio" value={"admin"} checked={role == "admin"} onChange={handleChnageRole} />Admin
                <RadioButton type="radio" value={"user"} checked={role == "user"} onChange={handleChnageRole} />User
            </RadioContainer>

            <TextField value={password} onChange={handlePassword} type={showPass ? 'text' : 'password'} placeholder={""} heading={"ENTER PASSWORD"} />
            <TextField value={rePassword} onChange={handleRePassword} type={showPass ? 'text' : 'password'} placeholder={""} heading={"REPEAT PASSWORD"} />
            <ShowPass>
                <ShowPassCon onClick={handlePasswordShow}>{showPassText} Pass</ShowPassCon>
            </ShowPass>
            <ButtonsContainer>
                <PrimaryButton onClick={registerCall}>Create Feed</PrimaryButton>
                <SecondaryButton onClick={handleSignin}>Login to Feed</SecondaryButton>
            </ButtonsContainer>
        </Container>
    )
}

export default Signup