import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const audioClipSources = [
"https://www.raphaeluziel.com/sounds/piano.wav",
"https://www.raphaeluziel.com/sounds/baby.wav",
"https://www.raphaeluziel.com/sounds/collision.wav",
"https://www.raphaeluziel.com/sounds/ding.wav",
"https://www.raphaeluziel.com/sounds/dog.wav",
"https://www.raphaeluziel.com/sounds/explosion.wav",
"https://www.raphaeluziel.com/sounds/meow.wav",
"https://www.raphaeluziel.com/sounds/ouch.wav",
"https://www.raphaeluziel.com/sounds/yikes.wav"];

const soundNames = ["piano", "baby", "collision", "ding", "dog", "explosion", "meow", "ouch", "yikes"];

const letters = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

var volume = 0.5;
var slider;
var output;

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(index) {
    document.getElementById(letters[index]).volume = volume;
    document.getElementById(letters[index]).play();
    document.getElementById("display").innerHTML = soundNames[index];
  }
  render() {
    return (
      <div>
        <button className="drum-pad"
          type="button"
          id={soundNames[this.props.number]}
          onClick={() => this.handleClick(this.props.number)}
          >
          {letters[this.props.number]}
          <audio
            class="clip"
            src={audioClipSources[this.props.number]}
            id={letters[this.props.number]}
            />
        </button>
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
  }
  componentDidMount() {
    // Set slider to default value on load
    slider = document.getElementById("volume");
    output = document.getElementById("showVolume");
    output.innerHTML = slider.value; // Display the default slider value

    // Check if key was pressed
    document.addEventListener('keypress', (event) => {
      let index = letters.indexOf(event.key.toUpperCase());
      document.getElementById("display").innerHTML = soundNames[index];
      document.getElementById(letters[index]).volume = volume;
      document.getElementById(letters[index]).play();
    });
  }

  handleSlide() {
    slider = document.getElementById("volume");
    output = document.getElementById("showVolume");
    // Update the current slider value (each time you drag the slider handle)
    output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
    }
    // Set volume of sound
    volume = slider.value / 100;
  }

  render() {
    return (
      <div>
        <h1>Drum Machine</h1>
        <h2>by Raphael</h2>
        <div class="nine">
          <div class="three">
            <DrumPad number={0} />
            <DrumPad number={1} />
            <DrumPad number={2} />
          </div>
          <div class="three">
            <DrumPad number={3} />
            <DrumPad number={4} />
            <DrumPad number={5} />
          </div>
          <div class="three">
            <DrumPad number={6} />
            <DrumPad number={7} />
            <DrumPad number={8} />
          </div>
        </div>
        <p>This sound is named: <span id="display" /></p>
        <div class="slidecontainer">
          <p>Volume: <span id="showVolume"></span></p>
          <input type="range" min="1" max="100" class="slider" id="volume" onChange={this.handleSlide}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById('drum-machine'));
