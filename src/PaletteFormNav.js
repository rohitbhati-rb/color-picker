import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import PaletteMetaForm from "./PaletteMetaForm";

// Styles
import styles from './styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
      formShowing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  showForm() {
    this.setState({ formShowing: true });
  }
  hideForm() {
    this.setState({ formShowing: false });
  }
  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="default"
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtn}>
            <Link to="/">
              <Button variant="contained" color="secondary" className={classes.button}>
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={this.showForm}>
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          hideForm={this.hideForm}
        />}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
