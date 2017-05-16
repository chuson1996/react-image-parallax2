import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageParallax extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    reduceHeight: PropTypes.number.isRequired,
    onLoad: PropTypes.func,
    style: PropTypes.object
  };
  
  constructor(props) {
    super(props);

    this.state = {
      parentHeight: 'auto',
      transformY: 0,
      imageHeight: 0
    };

    this.onScroll = this.onScroll.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    const { reduceHeight } = this.props;
    if (reduceHeight >= 1 || reduceHeight <= 0) {
      return console.error('reduceHeight should be smaller than 1 and bigger than 0');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(({ imageHeight }) => ({
      parentHeight: imageHeight * (1 - nextProps.reduceHeight)
    }));
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onLoad({ target: { clientHeight }}) {
    if (this.props.onLoad) this.props.onLoad();
    window.addEventListener('scroll', this.onScroll);
    this.setState({
      parentHeight: clientHeight * (1 - this.props.reduceHeight),
      imageHeight: clientHeight
    });
    this.onScroll();
  }

  inRange(min, max, val) {
    return Math.min(Math.max(val, min), max);
  }

  onScroll(e) {
    this.setState((state, props) => {
      const { reduceHeight } = props;
      const { parentHeight } = state;
      const ratio = this.inRange(
        0, 1,
        (this.container.getBoundingClientRect().top + parentHeight) / (window.innerHeight + parentHeight)
      );
      const transformY = ratio * reduceHeight - reduceHeight;
      return {
        transformY: transformY
      };
    });
  }

  render() {
    const { src, reduceHeight, onLoad, style, ...rest } = this.props;
    const { parentHeight, transformY } = this.state;
    return (
      <div ref={(elem) => this.container = elem} style={{
        position: 'relative',
        overflow: 'hidden',
        height: parentHeight || 'auto'
      }}>
        <img style={{
          ...style,
          width: '100%',
          transform: `translate(0, ${transformY * 100}%)`
        }} src={src} {...rest} onLoad={this.onLoad}/>
      </div>
    );
  }
}

export default ImageParallax;