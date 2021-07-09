import React, { Component } from "react";
import classNames from "classnames";
import arrayMove from 'array-move';
import seedColors from './seedColors';

// Material UI
import {
  Drawer,
  Typography,
  Divider,
  IconButton,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// Components
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import DraggableColorList from "./DraggableColorList";

// Styles
import styles from './styles/NewPaletteFormStyles';


class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      newColorName: "",
      colors: seedColors[0].colors
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addNewColor(newColor) {
    this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
  }
  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }
  clearColors() {
    this.setState({ colors: [] });
  }
  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({ colors: [...this.state.colors, randomColor] });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
              >
                Clear Palette
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              colors={colors}
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);