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
      keys: [],

      boyStyle: {
        top: 0,
        left: 0,
      },
    }
    this.arrowInterval = "";
    this.animation = this.animation.bind(this)
  }

  animation() {
    if (this.state.keys.length !== 0){
      this.setState(function (state) {
        let keys = state.keys
        if (keys.includes(39)){
          let boyStyle = state.boyStyle
          boyStyle.left += 3
          return{
            boyStyle: boyStyle,
          }
        }
      })
    }
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      this.setState(function (state) {
        let keys = state.keys
        if (!keys.includes(e.keyCode)) {
          keys.push(e.keyCode)
        }
        console.log(keys)
        return {
          keys: keys,
        }
      })
    }

    document.onkeyup = (e) => {
      this.setState(function (state) {
        let keys = state.keys
        if (keys.includes(e.keyCode)){
          keys.splice(keys.indexOf(e.keyCode), 1)
        }        
      })
    }

    setInterval(this.animation, 10)
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

    const boyStyle = {
      top: this.state.boyStyle.top + "px",
      left: this.state.boyStyle.left + "px",
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
          <div className="characters">
            <img id="characterBoy" style={boyStyle} src="boy.png" alt="" />
          </div>
        </form>
      </div>
    )
  }
}

export default App;

// сделать передвижение для остальных клавиш
// нарисовать дизайн лабиринта