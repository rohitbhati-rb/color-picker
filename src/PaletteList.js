import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import MiniPalette from './MiniPalette';

export class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <MiniPalette />
        <h1>React Colors</h1>
        {palettes.map(palette => (
          <MiniPalette {...palette} />
        ))}
      </div>
    );
  }
}

export default PaletteList;
