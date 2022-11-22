import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Signin from '../../components/Signin/Signin';
import Signup from '../../components/Signup/Signup';

import wall from '../../images/sample.png'

const Container = styled.div`
    background-color: #C7D2FB;
    height: 90vh;
    padding: 40px;
`;

const SectionContainer = styled.div`
    height: 100%;
    display: flex;
    background-color: #F4F4F4;
    border-radius: 20px;
    max-width: 1200px;
    margin:auto;
`;

const LeftSection = styled.div`
    width: 50%;
`;

const RightSection = styled.div`
    width: 50%;
    padding: 30px 30px 30px 0px;
`;

const TitleContainer = styled.div`
    padding: 90px 0 0 5vw;
`;

const TitleContainerHeader = styled.div`
    font-size: 20px;
`;

const TitleContainerHeaderDown = styled.p`
    margin: 0em;
`;

const TitleContainerSubHeader = styled.div`
    font-size: 14px;
`;

const FormContainer = styled.div`
    background-color: #FFF;
    padding: 20px;
    height: 92%;
    max-width: 370px;
`;

const PreviwImage = styled.img`
    left: 0;
    bottom: 0;
    width: 300px;
    margin-top: 26vh;
`;

const Auth = (props) => {
    const [heading, setHeading] = useState('Register');

    return (
        <Container>
            <SectionContainer>
                <LeftSection>
                    <TitleContainer>
                        <TitleContainerHeader>Welcome! <TitleContainerHeaderDown>First things first</TitleContainerHeaderDown> </TitleContainerHeader>
                        <TitleContainerSubHeader>Create a profile to personalize how you will apper to collaorators</TitleContainerSubHeader>
                    </TitleContainer>
                    <PreviwImage src={wall} alt="dummy" />
                </LeftSection>
                <RightSection>
                    <FormContainer>
                        {
                            heading === 'Login' ? <Signin setActive={setHeading} /> : <Signup setActive={setHeading} />
                        }
                    </FormContainer>
                </RightSection>
            </SectionContainer>
        </Container>
    )
}

export default Auth