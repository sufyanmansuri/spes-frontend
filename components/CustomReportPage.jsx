import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 4em;
    line-height: normal;
`;

const Title = styled.h1`
    font-size: 48px;
`;

export class CustomReportPage extends Component {
    render() {
        return (
            <Wrapper>
                <Title> PowerBI report goes here... </Title>
            </Wrapper>
        )
    }
}

export default CustomReportPage