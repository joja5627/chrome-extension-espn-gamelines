import React, { Component } from 'react';

export const fetchAsBlob = url => fetch(url).then(response => response.blob());

export const convertBlobToBase64 = blob =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
const imgStyle = {
    height: '50px'
}
export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBlob: null,
      ...props
    };
  }
  componentDidMount() {
    const { url } = this.props;
    fetchAsBlob(url)
      .then(convertBlobToBase64)
      .then(imgBase64 => {
        this.setState({
          imageBlob: imgBase64
        });
      });
  }

  render() {
    const { imageBlob } = this.state;
    return <div>{imageBlob && <img  style={imgStyle} src={imageBlob} />}</div>;
  }
}
