import React, { Component } from 'react';
import DonutSpinner from './DonutSpinner';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
`;

class FullScreenSpinner extends Component {
  render() {
    return <Container><DonutSpinner /></Container>
  }
}

export default FullScreenSpinner;
