import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ImageParallax from './react-image-parallax2';

const Flex = styled.div`
  display: flex;
`;

const Box = styled.div`
  margin-top: 100vh;
  width: 50vw;
  height: 200vh;
`;
const BoxRight = styled.div`
  position: fixed;
  left: 50vw;
`;

const Input = styled.input`
  border: 4px solid black;
  padding: 10px;
  font-size: 30px;
  ${({ valid }) => valid ? css`
    background-color: #a5ffd6;
  ` : css`
    background-color: #ff686b;
  `}
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reduceHeight: 1/4,
      valid: true,
      imageSrc: 'http://lorempixel.com/700/600/sports/'
    };

    this.onReduceHeightChange = this.onReduceHeightChange.bind(this);
    this.onSrcChange = this.onSrcChange.bind(this);
  }

  onReduceHeightChange(e) {
    const value = parseFloat(e.target.value);
    console.log(value);
    if (value > 0 && value < 1) {
      this.setState({
        valid: true,
        reduceHeight: value
      });
      return;
    }
    this.setState({ valid: false, reduceHeight: value });
  }

  onSrcChange(e) {
    this.setState({ imageSrc: e.target.value });
  }

  render() {
    const { valid, reduceHeight, imageSrc } = this.state;
    return (
      <Flex>
        <Box>
          <ImageParallax
            reduceHeight={reduceHeight}
            src={imageSrc}/>
        </Box>
        <BoxRight>
          <p>(Scroll down)</p>
          <h1>
            <small>0 &lt; </small>reduceHeight: <small>&lt; 1</small>
          </h1>
          <Input
            valid={valid}
            type="number"
            value={reduceHeight}
            onChange={this.onReduceHeightChange}/>
          <br/>
          <br/>
          <h1>src:</h1>
          <Input valid value={imageSrc} onChange={this.onSrcChange}/>
        </BoxRight>
      </Flex>
    );
  }
}

export default App;
