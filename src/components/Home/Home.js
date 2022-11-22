
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAlert } from 'react-alert';

import { createBlock, getBlocksSite } from '../../api/ApiService';

import TextField from '../TextField/TextField';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';

const Container = styled.div`
   width: 100%;
`;

const Heading = styled.h1`
    font-size: 45px;
    text-align: center;
`;

const CreateContainer = styled.div`
    max-width: 700px;
    // border: black 1px solid;
    margin: 4em auto;
    display: flex;
    column-gap: 20px
`;

const BlocksContainer = styled.div`
    max-width: 700px;
    // border: black 1px solid;
    margin: 4em auto;
    display: flex;
    flex-direction: column;
    row-gap: 30px
`;

const BlockContainer = styled.div`
   
`;

const BlockWriter = styled.p`
    font-size: 22px;
    margin-bottom: 0px
`;

const BlockDate = styled.p`
    font-size: 15px
`;

const BlockContent = styled.p`
    font-size: 28px
`;

const CommentsContainer = styled.div`
`;

const AddComment = styled.div`
`;

const CommentContainer = styled.div`
`;

const Home = (props) => {
    const alert = useAlert();

    const [whatsMind, setWhatsMind] = useState("");
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        getBlocks();
    }, [])

    const handleWhatsMind = (e) => {
        if (e.target.value.length < 500) {
            setWhatsMind(e.target.value)
        }
    }

    const createBlockHit = () => {
        let data = {
            creator_id: '63767c3c9a9c1b08e049df36',
            user_name: 'Akshay Netake',
            block_content: whatsMind
        }
        if (whatsMind.length > 10) {
            createBlock(data).then(res => {
                console.log("res=>", res)
                if (res.code === 200) {
                    alert.success('Block Updated!');
                    setWhatsMind('');
                } else {
                    alert.error('Something Went Wrong!');
                }
            }).catch(err => {
                alert.error('Something Went Wrong!');
                console.log("err ==>", err);
            })
        } else {
            alert.error('Block Cannot smaller than 10 word!');
        }
    }

    const getBlocks = () => {
        getBlocksSite().then(res => {
            console.log("res=>", res)
            if (res.code === 200) {
                setBlocks(res['data'])
            } else {
                alert.error('Something Went Wrong!');
            }
        }).catch(err => {
            alert.error('Something Went Wrong!');

        })
    }

    return (
        <Container>
            <Heading>Welcome! Harsh</Heading>
            <Heading>Let's Know Thoughts!</Heading>

            <CreateContainer>
                <TextField style={{
                    fontSize: '15px',
                    textTransform: 'capitalize',
                    width: '100%'
                }} placeholder={'Whats in Your Mind? (Limit 500 Words)'}
                    onChange={handleWhatsMind}
                    value={whatsMind}></TextField>
                <PrimaryButton style={{
                    maxWidth: '70px',
                    fontSize: '15px'
                }}
                    onClick={createBlockHit}>POST</PrimaryButton>
            </CreateContainer>

            <BlocksContainer>
                {
                    blocks.length > 0 ?
                        blocks.map((e, i) => {
                            return (
                                <BlockContainer key={i}>
                                    <BlockWriter>Akshay Netake</BlockWriter>
                                    <BlockDate>{new Date(e.created_on).toLocaleDateString('en-US')}</BlockDate>
                                    <BlockContent>{e.block_content}</BlockContent>
                                </BlockContainer>
                            )
                        })
                        : <BlockContent>Be Our First Writer!</BlockContent>
                }

            </BlocksContainer>
        </Container>
    )
}

export default Home