import React from 'react';


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

const loadImage = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
        imageBlob: null
    };
  
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
      return (
        <div>{imageBlob &&<WrappedComponent
            imageBlob={this.imageBlob}
          {...this.props}
        />}</div>
      );
    }
  }
    
  return HOC; 
}

export default loadImage;