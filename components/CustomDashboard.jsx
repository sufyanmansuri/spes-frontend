import React, { Component } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  background: #00000068;
  width: 100%;
  border-radius: 10px 10px 0 0;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("http://localhost:1337/dashboard-bg.jpg");
  background-size: cover;
  line-height: normal;
  color: white;
  height: 100%;
  padding: 2em;
  padding-top: 10em;
`;

const Subtitle = styled.h1`
  font-size: 24px;
  text-align: center;
  background: #00000068;
  width: 100%;
  padding-bottom: 5px;
  border-radius: 0 0 10px 10px;
`;

export class CustomDashboard extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
          Welcome to SPES
        </Title>
        <Subtitle>
          Student Performance Evaluation System
        </Subtitle>
      </Wrapper>
    )
  }
}

export default CustomDashboard