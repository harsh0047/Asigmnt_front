import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

export const PrimaryButton = styled.button`
    text-decoration: none;
    border: none;
    cursor: pointer;
    outline: none;
    height: 30px;
    width: 100%;
    background-color: var(--primary);
    color: var(--white);
    font-size: 12px;
    font-weight: bold;
    margin-top: 10px;
    font-family: 'Montserrat';
`;

export const SecondaryButton = styled.button`
    text-decoration: none;
    border: none;
    cursor: pointer;
    outline: none;
    height: 30px;
    width: 100%;
    background-color: var(--white);
    color: var(--primary);
    border: 2px var(--primary) solid;
    font-size: 12px;
    font-weight: bold;
    margin-top: 10px;
    font-family: 'Montserrat';
`;