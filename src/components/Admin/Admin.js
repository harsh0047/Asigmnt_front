
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAlert } from 'react-alert';

import { getAllBlocksSite, updateBlockStatus, editTheBlock } from '../../api/ApiService';

import TextField from '../TextField/TextField';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';

const Container = styled.div`
   width: 100%;
`;

const Heading = styled.h1`
    font-size: 45px;
    text-align: center;
`;


const TContainer = styled.div`
    max-width: 1000px;
    margin: auto
`;

const Th = styled.th`
    padding: 20px 0px
`

const Td = styled.td`
    padding: 10px 0px
`

const Home = (props) => {
    const alert = useAlert();

    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        getBlocks();
    }, [])

    const getBlocks = () => {
        getAllBlocksSite().then(res => {
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

    const updateStatus = (e) => {
        let data = {
            block_id: e._id,
            is_aproved: !e.is_aproved
        }
        updateBlockStatus(data).then(res => {
            console.log("res=>", res)
            if (res.code === 200) {
                getBlocks();
            } else {
                alert.error('Something Went Wrong!');
            }
        }).catch(err => {
            alert.error('Something Went Wrong!');

        })
    }

    const handleEditBlock = (event, id) => {
        setBlocks(blocks.map(l => l._id == id ? { ...l, block_content: event.target.value } : l));
    }

    const editBlock = (e) => {
        let data = {
            block_content: e.block_content,
            block_id: e._id
        }
        editTheBlock(data).then(res => {
            console.log("res=>", res)
            if (res.code === 200) {
                alert.success('Block Updated!');
                getBlocks();
            } else {
                alert.error('Something Went Wrong!');
            }
        }).catch(err => {
            alert.error('Something Went Wrong!');

        })
    }

    return (
        <Container>
            <Heading>Admin Panel</Heading>
            <TContainer>
                <table style={{ width: '100%', fontSize: '17px', textAlign: 'left' }}>
                    <tr>
                        <Th>Number</Th>
                        <Th>Name</Th>
                        <Th>Content</Th>
                        <Th>Status</Th>
                    </tr>

                    {
                        blocks.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <Td>{i}</Td>
                                    <Td>{e.user_name}</Td>
                                    <Td style={{ paddingRight: '30px' }}>
                                        <TextField value={e.block_content}
                                            onChange={(ev) => handleEditBlock(ev, e._id)}
                                            onBlur={() => editBlock(e)}
                                            style={{ outline: 'none', border: 'none', borderBottom: '1px solid grey', fontSize: '17px' }}
                                        />
                                    </Td>
                                    <Td>{!e.is_aproved ?
                                        <PrimaryButton onClick={() => updateStatus(e)}>Accept</PrimaryButton> :
                                        <SecondaryButton onClick={() => updateStatus(e)}>Disable</SecondaryButton>}</Td>
                                </tr>
                            )
                        })
                    }
                </table>
            </TContainer>
        </Container>
    )
}

export default Home