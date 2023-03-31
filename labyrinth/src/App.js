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
      timeLeft: 0,

      catcher: "ghost",
      winner: "",

      startMenuClass: "menuShow",
      endMenuClass: "",
      gameFormClass: "",
      endImgClass: "",

      potionCoordinates: [
        [18.5, 18],
        [64.4, 10.5],
        [18.5, 79],
        [64.4, 94],
        [49, 41],
      ],
      potionsCollected: [],
      potionTimer: 0,

      boyStyle: {
        top: 2,
        left: 2,
        transform: -1,
        opacity: 1,
      },
      boySpeed: 0,
      boyClass: "",

      ghostStyle: {
        top: 93,
        left: 93,
        transform: 1,
        opacity: 1,
      },
      ghostSpeed: 0,
      ghostClass: "",
    }
    this.arrowInterval = "";
    this.timerInterval = "";
    this.collectAudio = new Audio("/Collect.mp3")
    this.animation = this.animation.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.timer = this.timer.bind(this);
  }

  animation() {
    let ctx = this.state.ctx
    let boy = document.getElementById("characterBoy")
    let ghost = document.getElementById("characterGhost")

    let gameHeight = window.innerHeight / 10 * 9


    if (this.state.keys.length > 0 && this.state.gameFormClass !== "") {
      this.setState(function (state) {
        let endMenuClass = state.endMenuClass
        let gameFormClass = state.gameFormClass
        let endImgClass = state.endImgClass
        let keys = state.keys
        let winner = state.winner

        let boyStyle = state.boyStyle
        let ghostStyle = state.ghostStyle

        let boySpeed = 0.33
        let ghostSpeed = 0.37
        let boyColorCheck = 255
        let ghostColorCheck = 10
        if (state.catcher === "boy") {
          ghostSpeed = 0.33
          boySpeed = 0.37
          boyColorCheck = 10
          ghostColorCheck = 255
        }

        let runnerStyle = (state.catcher === "boy" ? ghostStyle : boyStyle)

        let potionsCollected = state.potionsCollected
        let potionTimer = state.potionTimer

        for (let i in state.potionCoordinates) {
          if (!potionsCollected.includes(parseInt(i))) {
            if (Math.abs(state.potionCoordinates[i][0] - runnerStyle.left) < 5 && Math.abs(state.potionCoordinates[i][1] - runnerStyle.top) < 5) {
              potionsCollected.push(parseInt(i))
              setTimeout(function () {
                potionsCollected.splice(potionsCollected.indexOf(parseInt(i)), 1)
              }, 5000)
              this.collectAudio.play()
              potionTimer = 300
            }
          }
        }

        if (potionTimer > 0) {
          if (state.catcher === "boy") {
            ghostSpeed = 0.45
          }
          else {
            boySpeed = 0.45
          }
          potionTimer -= 1
        }


        if (keys.includes(37)) {
          boyStyle.left -= boySpeed
          boyStyle.transform = -1
          if (ctx.getImageData((boyStyle.left * gameHeight / 100), (boyStyle.top * gameHeight / 100), 1, boy.offsetHeight).data.includes(boyColorCheck)) {
            boyStyle.left += boySpeed
          }
        }
        if (keys.includes(38)) {
          boyStyle.top -= boySpeed
          if (ctx.getImageData((boyStyle.left * gameHeight / 100), (boyStyle.top * gameHeight / 100), boy.offsetWidth, 1).data.includes(boyColorCheck)) {
            boyStyle.top += boySpeed
          }
        }
        if (keys.includes(39)) {
          boyStyle.left += boySpeed
          boyStyle.transform = 1
          if (ctx.getImageData((boyStyle.left * gameHeight / 100) + boy.offsetWidth, (boyStyle.top * gameHeight / 100), 1, boy.offsetHeight).data.includes(boyColorCheck)) {
            boyStyle.left -= boySpeed
          }
        }
        if (keys.includes(40)) {
          boyStyle.top += boySpeed
          if (ctx.getImageData((boyStyle.left * gameHeight / 100), (boyStyle.top * gameHeight / 100) + boy.offsetHeight, boy.offsetWidth, 1).data.includes(boyColorCheck)) {
            boyStyle.top -= boySpeed
          }
        }

        if (keys.includes(65)) {
          ghostStyle.left -= ghostSpeed
          ghostStyle.transform = 1
          if (ctx.getImageData((ghostStyle.left * gameHeight / 100), (ghostStyle.top * gameHeight / 100), 1, ghost.offsetHeight).data.includes(ghostColorCheck)) {
            ghostStyle.left += ghostSpeed
          }
        }
        if (keys.includes(87)) {
          ghostStyle.top -= ghostSpeed
          if (ctx.getImageData((ghostStyle.left * gameHeight / 100), (ghostStyle.top * gameHeight / 100), ghost.offsetWidth, 1).data.includes(ghostColorCheck)) {
            ghostStyle.top += ghostSpeed
          }
        }
        if (keys.includes(68)) {
          ghostStyle.left += ghostSpeed
          ghostStyle.transform = -1
          if (ctx.getImageData((ghostStyle.left * gameHeight / 100) + ghost.offsetWidth, (ghostStyle.top * gameHeight / 100), 1, ghost.offsetHeight).data.includes(ghostColorCheck)) {
            ghostStyle.left -= ghostSpeed
          }
        }
        if (keys.includes(83)) {
          ghostStyle.top += ghostSpeed
          if (ctx.getImageData((ghostStyle.left * gameHeight / 100), (ghostStyle.top * gameHeight / 100) + ghost.offsetHeight, ghost.offsetWidth, 1).data.includes(ghostColorCheck)) {
            ghostStyle.top -= ghostSpeed
          }
        }

        return {
          endImgClass: endImgClass,
          endMenuClass: endMenuClass,
          gameFormClass: gameFormClass,
          boyStyle: boyStyle,
          boySpeed: boySpeed,
          ghostStyle: ghostStyle,
          winner: winner,
          potionsCollected: potionsCollected,
          potionTimer: potionTimer,
        }
      }, function () {
        if (Math.abs(this.state.ghostStyle.left - this.state.boyStyle.left) < 5 && Math.abs(this.state.ghostStyle.top - this.state.boyStyle.top) < 5) {
          this.gameOver(this.state.catcher)
        }
      })
    }
  }

  gameOver(currentWinner) {
    this.setState(function (state) {
      let boyStyle = state.boyStyle
      let ghostStyle = state.ghostStyle
      let endImgClass = state.endImgClass
      let endMenuClass = state.endMenuClass
      let gameFormClass = state.gameFormClass
      let timeLeft = (1200 - state.timerInfo) / 10

      clearInterval(this.timerInterval)

      console.log("game over")
      endMenuClass = "menuShow"
      endImgClass = "endImgClass"
      gameFormClass = ""
      return {
        timeLeft: timeLeft,
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
      let minutes = Math.floor(state.timerInfo / 600)
      let seconds = Math.floor(state.timerInfo / 10) - minutes * 60

      return {
        timerInfo: state.timerInfo - 1,
        timerFinal: minutes + ":" + seconds + "," + state.timerInfo % 10
      }
    }, function () {
      if (this.state.timerInfo < 1) {
        this.gameOver(this.state.catcher === "boy" ? "ghost" : "boy")
      }
    })
  }

  componentDidMount() {
    this.collectAudio.volume = 0.2

    document.onkeydown = (e) => {
      this.setState(function (state) {
        let keys = state.keys
        if (!keys.includes(e.keyCode)) {
          keys.push(e.keyCode)
        }
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
  }


  restartGame(e) {
    e.preventDefault()
    this.setState(function (state) {
      let boyStyle = state.boyStyle
      boyStyle.top = 20
      boyStyle.left = 30

      let ghostStyle = state.ghostStyle
      ghostStyle.top = window.innerHeight - 55 - 20
      ghostStyle.left = window.innerHeight - 46 - 30

      return {
        arrowAngle: -90,
        boyStyle: boyStyle,
        timerInfo: 2 * 600,
        startMenuClass: "menuShow",
        endMenuClass: "",
        catcher: "",
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    clearInterval(this.arrowInterval)

    this.setState({
      arrowPoint: Math.floor(Math.random() * 6),

    }, function () {
      let catcher = this.state.catcher
      let boyClass = this.state.boyClass
      let ghostClass = this.state.ghostClass
      let arrowSpeed = 0
      let startMenuClass = this.state.startMenuClass
      let gameFormClass = this.state.gameFormClass

      switch (this.state.arrowPoint) {
        case 0:
          arrowSpeed = 15.7;
          catcher = "ghost"
          break;
        case 1:
          arrowSpeed = 16.3;
          catcher = "ghost"
          break;
        case 2:
          arrowSpeed = 16.8;
          catcher = "ghost"
          break;
        case 3:
          arrowSpeed = 19.5;
          catcher = "boy"
          break;
        case 4:
          arrowSpeed = 12.7;
          catcher = "boy"
          break;
        case 5:
          arrowSpeed = 13.1;
          catcher = "boy"
          break;
        default:
          arrowSpeed = 0;
      }

      this.setState({
        arrowSpeed: arrowSpeed,
        catcher: catcher
      }, function () {
        console.log(catcher)
      })
      this.arrowInterval = setInterval(() => {
        this.setState(function (state) {

          if (state.arrowSpeed <= 0.1) {
            if (catcher === "ghost") {
              ghostClass = "catcherSelect"
            }
            else {
              boyClass = "catcherSelect"
            }

            this.timerInterval = setInterval(this.timer, 100)
            clearInterval(this.arrowInterval)
          }
          return {
            startMenuClass: startMenuClass,
            gameFormClass: gameFormClass,
            arrowAngle: state.arrowAngle + state.arrowSpeed,
            arrowSpeed: state.arrowSpeed * 0.98,
            boyClass: boyClass,
            ghostClass: ghostClass
          }
        }, function () {
          if (boyClass === "catcherSelect" || ghostClass === "catcherSelect")
            setTimeout(() => {
              startMenuClass = ""
              gameFormClass = "menuShow"
              this.setState({
                startMenuClass: startMenuClass,
                gameFormClass: gameFormClass,
              })
            }, 1500);
        })
      }, 10);
    })
  }

  handleMazeLoad() {
    let canvas = document.getElementsByTagName("canvas")[0]
    let gameContainer = document.getElementsByClassName("gameContainer")[0]
    gameContainer.style.width = window.innerHeight / 10 * 9 + "px"

    canvas.width = window.innerHeight / 10 * 9
    canvas.height = window.innerHeight / 10 * 9
    let ctx = canvas.getContext("2d", { willReadFrequently: true })
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
    let img = document.getElementById("mazeImage")
    ctx.drawImage(img, 0, 0, window.innerHeight / 10 * 9, window.innerHeight / 10 * 9)
  }

  render() {
    const arrowStyle = {
      transform: "rotate(" + this.state.arrowAngle + "deg)"
    }

    const boyStyle = {
      top: this.state.boyStyle.top + "%",
      left: this.state.boyStyle.left + "%",
      transform: "scaleX(" + this.state.boyStyle.transform + ")",
      opacity: this.state.boyStyle.opacity,

    }

    const ghostStyle = {
      top: this.state.ghostStyle.top + "%",
      left: this.state.ghostStyle.left + "%",
      transform: "scaleX(" + this.state.ghostStyle.transform + ")",
      opacity: this.state.ghostStyle.opacity,
    }

    let endingText = "You catched your opponent in " + this.state.timeLeft + " seconds"
    if (this.state.timerInfo < 1) {
      endingText = "You ran away from your opponent"
    }

    return (
      <div>
        <form className={"startMenu " + this.state.startMenuClass} onSubmit={(e) => this.handleSubmit(e)} action="">
          <h1>Old House</h1>
          <img className={this.state.boyClass} src="boy.png" alt="" />
          <div className="wheel">
            <img id="arrow" style={arrowStyle} src="arrow.png" alt="" />
          </div>
          <img className={this.state.ghostClass} src="ghost.png" alt="" />
          <button>Start!</button>
        </form>

        <form className={"endMenu " + this.state.endMenuClass} action="">
          <p id="endTimer">{endingText}</p>
          <img className={this.state.endImgClass} src={this.state.winner + ".png"} alt="" />
          <h2>You won!</h2>
          <button onClick={(e) => this.restartGame(e)}>Restart</button>
        </form>

        <form className={"game " + this.state.gameFormClass} action="">
          <div onClick={(e) => console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)} className="gameContainer">
            <canvas></canvas>
            <p id="timer">{this.state.timerFinal}</p>
            <img src="kidmaze.png" id="mazeImage" onLoad={() => this.handleMazeLoad()} alt="" />
            <img className={this.state.boyClass} id="characterBoy" style={boyStyle} src="boy.png" alt="" />
            <img className={this.state.ghostClass} id="characterGhost" style={ghostStyle} src="ghost.png" alt="" />
            {
              this.state.potionCoordinates.map((coordinate, id) => {
                if (!this.state.potionsCollected.includes(id)) {
                  return <img style={{ left: coordinate[0] + "%", top: coordinate[1] + "%" }} key={id} className="potionSpeed" src="potionSpeed.svg" alt="" />
                }
                return null
              })
            }
          </div>
        </form>
      </div>
    )
  }
}

export default App;

// заменить все цифры на % в размерах экрана