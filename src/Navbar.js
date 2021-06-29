import React, { Component } from 'react';

// Components
import Slider from 'rc-slider';
// CSS
import 'rc-slider/assets/index.css';
import './css/Navbar.css';

export class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactColorPicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div></div>
      </header>
    )
  }
}

export default Navbar;
