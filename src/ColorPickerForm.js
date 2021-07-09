import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

// Material UI
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// Styles
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: "teal", newColorName: "" };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) =>
      this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );
  }
  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  }
  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm
          onSubmit={this.handleSubmit}
          className={classes.colorForm}
          instantValidate={false}
        >
          <TextValidator
            placeholder="Color Name"
            variant="filled"
            margin="normal"
            className={classes.colorNameInput}
            name='newColorName'
            value={newColorName}
            onChange={this.handleChange}
            validators={[
              "required",
              "isColorUnique",
              "isColorNameUnique"
            ]}
            errorMessages={[
              "Enter a color name",
              "Color must be Unique",
              "Color Name must be Unique"
            ]}
          />
          <Button
            className={classes.addColor}
            variant="contained"
            color="primary"
            style={{ background: paletteIsFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);