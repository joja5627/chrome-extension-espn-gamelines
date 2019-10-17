
import React from 'react';
import Image from './Image';
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


export default class GameCanvas extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          homeTeam:this.props.teams[0],
          awayTeam:this.props.teams[1],
        homeImageBlob: null,
        awayImageBlob: null
      }
      this.canvasRef = React.createRef();
    }
    componentDidMount() {
        

        fetchAsBlob(this.state.homeTeam.logo)
          .then(convertBlobToBase64)
          .then(imgBase64 => {
            this.setState({
                homeImageBlob: imgBase64
            });
          });

        fetchAsBlob(this.state.awayTeam.logo)
          .then(convertBlobToBase64)
          .then(imgBase64 => {
            this.setState({
                awayImageBlob: imgBase64
            });
          });

      }

    
    renderImages = (homeImageBlob,awayImageBlob)=> {
       
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const awayImg = new Image();
        awayImg.height = 30
        awayImg.width = 40
        awayImg.src = awayImageBlob
        awayImg.onload = () => ctx.drawImage(awayImg,0,0,10,10);

        const homeImg = new Image();
        homeImg.src = homeImageBlob
        homeImg.height = 30 
        homeImg.width = 40
        homeImg.onload = () => ctx.drawImage(homeImg,100,100,10,10);
        ctx.restore();
       
       
        return 
    }
  
    render() {
        const {homeImageBlob,awayImageBlob,homeTeam,awayTeam} = this.state
        
        if(homeImageBlob && awayImageBlob){
            //this.renderImages(homeImageBlob,awayImageBlob)
            console.log(JSON.stringify(homeTeam))
            return 
        }
        return <div>NaN</div>
        // const color = {
        //     backgroundColor = this.state.homeTeam.primary_color
        // }
        //<canvas width="300" height="300" ref={this.canvasRef} />
      
      
      
    }
  }