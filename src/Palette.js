import React, { Component } from 'react';

// Components
import ColorBox from './ColorBox';

// CSS
import './css/Palette.css';

class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ));
    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* footer eventually */}
      </div>
    )
  }
}

export default Palette;