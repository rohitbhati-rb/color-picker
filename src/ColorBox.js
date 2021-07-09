import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/styles';

// Styles
import styles from './styles/ColorBoxStyles';


class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const { name, background, moreURL, showingFullPalette, classes } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={classnames(classes.copyOverlay, {
              [classes.showOverlay]: copied
            })}
          />
          <div className={classnames(classes.copyMessage, {
            [classes.showMessage]: copied
          })}>
            <h1>copied!</h1>
            <p className={classes.copyText}>
              {this.props.background}
            </p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && <Link to={`/palette/${moreURL}`} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>}
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox);