import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    padding: 0.5em;
    outline: none;
    border: 1px lightgray solid;
    width: 100%;
    box-sizing: border-box;
    font-size: 10px;
    color: black;
    font-family: 'Montserrat';
    border-radius: 4px;
`;

const Container = styled.div`
    margin-top: 8px;
    width: 100%
`;
const Heading = styled.p`
    text-align: left;
    margin: 1px;
    font-size: 10px;
    color: gray;
    font-weight: bold
`;

const TextField = (props) => {
    return (
        <Container>
            <Heading>{props.heading}</Heading>
            <Input {...props} />
        </Container>
    )
}

export default TextField