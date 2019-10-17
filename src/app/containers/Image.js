import React, { Component } from 'react';
import { stringify } from 'querystring';

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
    height: '50px',
    display: 'inline'
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
    const { imageBlob,backgroundColor } = this.state;
    // let imageStyle = {...{height: '50px'},...{backgroundColor:`#${backgroundColor}`}}
    return <a>{imageBlob  && <img  className="img-fluid" style={imgStyle} src={imageBlob} />}</a>
       
  }
}
