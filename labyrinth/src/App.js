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
      timerInfo: 2 * 600,
      timerFinal: "",

      catcher: "ghost",
      winner: "",

      endMenuClass: "",
      startMenuClass: "",
      gameFormClass: "menuShow",
      endImgClass: "",


      boyStyle: {
        top: 20,
        left: 30,
        transform: -1,
        opacity: 1,
      },

      ghostStyle: {
        top: window.innerHeight - 55 - 20,
        left: window.innerHeight - 46 - 30,
        transform: 1,
        opacity: 1,
      }
    }
    this.arrowInterval = "";
    this.timerInterval = "";
    this.animation = this.animation.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.timer = this.timer.bind(this);
  }

  animation() {
    let ctx = this.state.ctx
    let boy = document.getElementById("characterBoy")
    let ghost = document.getElementById("characterGhost")


    if (this.state.keys.length !== 0) {
      this.setState(function (state) {
        let endMenuClass = state.endMenuClass
        let gameFormClass = state.gameFormClass
        let endImgClass = state.endImgClass
        let keys = state.keys

        let boyStyle = state.boyStyle
        let boySpeed = 3

        let ghostStyle = state.ghostStyle
        let ghostSpeed = 3

        let winner = state.winner

        if (Math.abs(ghostStyle.left - boyStyle.left) < 30 && Math.abs(ghostStyle.top - boyStyle.top) < 50) {
          this.gameOver(state.catcher)
        }

        if (keys.includes(37)) {
          boyStyle.left -= boySpeed
          boyStyle.transform = 1
          if (ctx.getImageData(boyStyle.left, boyStyle.top, 1, boy.offsetHeight).data.includes(255)) {
            boyStyle.left += boySpeed
          }
        }
        if (keys.includes(38)) {
          boyStyle.top -= boySpeed
          if (ctx.getImageData(boyStyle.left, boyStyle.top, boy.offsetWidth, 1).data.includes(255)) {
            boyStyle.top += boySpeed
          }
        }
        if (keys.includes(39)) {
          boyStyle.left += boySpeed
          boyStyle.transform = -1
          if (ctx.getImageData(boyStyle.left + boy.offsetWidth, boyStyle.top, 1, boy.offsetHeight).data.includes(255)) {
            boyStyle.left -= boySpeed
          }
        }
        if (keys.includes(40)) {
          boyStyle.top += boySpeed
          if (ctx.getImageData(boyStyle.left, boyStyle.top + boy.offsetHeight, boy.offsetWidth, 1).data.includes(255)) {
            boyStyle.top -= boySpeed
          }
        }


        if (keys.includes(65)) {
          ghostStyle.left -= ghostSpeed
          ghostStyle.transform = 1
          if (ctx.getImageData(ghostStyle.left, ghostStyle.top, 1, ghost.offsetHeight).data.includes(255)) {
            ghostStyle.left += ghostSpeed
          }
        }
        if (keys.includes(87)) {
          ghostStyle.top -= ghostSpeed
          if (ctx.getImageData(ghostStyle.left, ghostStyle.top, ghost.offsetWidth, 1).data.includes(255)) {
            ghostStyle.top += ghostSpeed
          }
        }
        if (keys.includes(68)) {
          ghostStyle.left += ghostSpeed
          ghostStyle.transform = -1
          if (ctx.getImageData(ghostStyle.left + ghost.offsetWidth, ghostStyle.top, 1, ghost.offsetHeight).data.includes(255)) {
            ghostStyle.left -= ghostSpeed
          }
        }
        if (keys.includes(83)) {
          ghostStyle.top += ghostSpeed
          if (ctx.getImageData(ghostStyle.left, ghostStyle.top + ghost.offsetHeight, ghost.offsetWidth, 1).data.includes(255)) {
            ghostStyle.top -= ghostSpeed
          }
        }

        return {
          endImgClass: endImgClass,
          endMenuClass: endMenuClass,
          gameFormClass: gameFormClass,
          boyStyle: boyStyle,
          ghostStyle: ghostStyle,
          winner: winner
        }
      })
    }
  }

  gameOver(currentWinner) {
    this.setState(function (state) {
      let boyStyle = state.boyStyle
      let ghostStyle = state.ghostStyle
      let endMenuClass = state.endMenuClass
      let endImgClass = state.endImgClass
      let gameFormClass = state.gameFormClass

      clearInterval(this.timerInterval)

      console.log("game over")
      boyStyle.opacity = 0
      ghostStyle.opacity = 0
      endMenuClass = "menuShow"
      endImgClass = "endImgClass"
      gameFormClass = ""
      // winner = currentWinner //state.catcher === "boy" ? "ghost" : "boy"
      return {
        boyStyle: boyStyle,
        ghostStyle: ghostStyle,
        endMenuClass: endMenuClass,
        endImgClass: endImgClass,
        gameFormClass: gameFormClass,
        winner: currentWinner,
      }
    })
  }

  timer() {
    this.setState(function (state) {
      // console.log(Math.floor(state.timerInfo / 10) + ":" + state.timerInfo % 10)
      let minutes = Math.floor(state.timerInfo / 600)
      let seconds = Math.floor(state.timerInfo / 10) - minutes * 60

      if (state.timerInfo < 1) {
        this.gameOver(state.catcher === "boy" ? "ghost" : "boy")
      }

      return {
        timerInfo: state.timerInfo - 1,
        timerFinal: minutes + ":" + seconds + "," + state.timerInfo % 10
      }
    })
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      // console.log(e.keyCode)
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
        if (keys.includes(e.keyCode)) {
          keys.splice(keys.indexOf(e.keyCode), 1)
        }
      })
    }
    setInterval(this.animation, 10)
    this.timerInterval = setInterval(this.timer, 100)
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
    let gameContainer = document.getElementsByClassName("gameContainer")[0]
    gameContainer.style.width = window.innerHeight + "px"

    canvas.width = window.innerHeight
    canvas.height = window.innerHeight
    let ctx = canvas.getContext("2d")
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
    let img = document.getElementById("mazeImage")
    ctx.drawImage(img, 0, 0, window.innerHeight, window.innerHeight)
  }

  render() {
    const arrowStyle = {
      transform: "rotate(" + this.state.arrowAngle + "deg)"
    }

    const boyStyle = {
      top: this.state.boyStyle.top + "px",
      left: this.state.boyStyle.left + "px",
      transform: "scaleX(" + this.state.boyStyle.transform + ")",
      opacity: this.state.boyStyle.opacity,

    }

    const ghostStyle = {
      top: this.state.ghostStyle.top + "px",
      left: this.state.ghostStyle.left + "px",
      transform: "scaleX(" + this.state.ghostStyle.transform + ")",
      opacity: this.state.ghostStyle.opacity,
    }
    return (
      <div>
        <form className={"startMenu " + this.state.startMenuClass} onSubmit={(e) => this.handleSubmit(e)} action="">
          <h1>Old House</h1>
          <img src="boy.png" alt="" />
          <div className="wheel">
            <img id="arrow" style={arrowStyle} src="arrow.png" alt="" />
          </div>
          <img src="ghost.png" alt="" />
          <button>Start!</button>
        </form>

        <form className={"endMenu " + this.state.endMenuClass} action="">
          <p id="timer">You catched your opponent in {this.state.timeLeft}</p>
          <img className={this.state.endImgClass} src={this.state.winner + ".png"} alt="" />
          <h2>You won!</h2>
        </form>

        <form className={"game " + this.state.gameFormClass} action="">
          <div className="gameContainer">
            <canvas></canvas>
            <p id="timer">{this.state.timerFinal}</p>
            <img src="kidmaze-01.png" id="mazeImage" onLoad={() => this.handleMazeLoad()} alt="" />
            <img id="characterBoy" style={boyStyle} src="boy.png" alt="" />
            <img id="characterGhost" style={ghostStyle} src="ghost.png" alt="" />
          </div>
        </form>
      </div>
    )
  }
}

export default App;

// нарисовать дизайн лабиринта
// доделать меню в конце игры (таймер и кнопку Restart)