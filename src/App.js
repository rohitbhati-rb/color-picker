import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components and Helpers
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = ({ palettes: savedPalettes || seedColors });
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  }
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) =>
            <NewPaletteForm
              {...routeProps}
              palettes={this.state.palettes}
              savePalette={this.savePalette}
            />
          }
        />
        <Route
          exact
          path="/"
          render={(routeProps) =>
            <PaletteList
              palettes={this.state.palettes}
              deletePalette={this.deletePalette}
              {...routeProps}
            />
          }
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) =>
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
          }
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) =>
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
            />
          }
        />
      </Switch>
    );
  };
}

export default App;
