import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrowAngle: -90,
      arrowSpeed: 15.7,
      arrowPoint: 0,
      canvas: "",
      ctx: "",
    }
    this.arrowInterval = "";
  }

  handleSubmit(e) {
    e.preventDefault()
    clearInterval(this.arrowInterval)

    this.setState({
      arrowPoint: Math.floor(Math.random() * 6),
      // arrowPoint: 5,

    }, function () {
      let arrowSpeed = 0
      switch (this.state.arrowPoint) {
        case 0:
          arrowSpeed = 15.7;
          break;
        case 1:
          arrowSpeed = 16.3;
          break;
        case 2:
          arrowSpeed = 16.8;
          break;
        case 3:
          arrowSpeed = 19.5;
          break;
        case 4:
          arrowSpeed = 12.7;
          break;
        case 5:
          arrowSpeed = 13.1;
          break;
        default:
          arrowSpeed = 0;
      }
      this.setState({ arrowSpeed: arrowSpeed })
      this.arrowInterval = setInterval(() => {
        this.setState(function (state) {
          if (state.arrowSpeed <= 0.1) {
            clearInterval(this.arrowInterval)
          }
          return {
            arrowAngle: state.arrowAngle + state.arrowSpeed,
            arrowSpeed: state.arrowSpeed * 0.98,
          }
        })
      }, 10);
    })
  }

  handleMazeLoad() {
    // console.log("image loaded!");
    let canvas = document.getElementsByTagName("canvas")[0]
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let ctx = canvas.getContext("2d")
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
    let img = document.getElementById("mazeImage")
    ctx.drawImage(img, (window.innerWidth - window.innerHeight) / 2, 0)
  }

  render() {
    const arrowStyle = {
      transform: "rotate(" + this.state.arrowAngle + "deg)"
    }
    return (
      <div>
        <form className="startMenu" onSubmit={(e) => this.handleSubmit(e)} action="">
          <h1>Old House</h1>
          <img src="boy.png" alt="" />
          <div className="wheel">
            <img id="arrow" style={arrowStyle} src="arrow.png" alt="" />
          </div>
          <img src="ghost.png" alt="" />
          <button>Start!</button>
        </form>

        <form className="game" action="">
          <canvas></canvas>
          <img src="kidmaze-01.svg" id="mazeImage" onLoad={() => this.handleMazeLoad()} alt="" />
        </form>
      </div>
    )
  }
}

export default App;