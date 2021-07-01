import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal"
  },
  secondary: {
    backgroundColor: "pink",
    "& h1": {
      color: "white",
      "& span": {
        backgroundColor: "yellow"
      }
    }
  }
};

function MiniPalette(props) {
  const { classes } = props;
  console.log(classes);
  return (
    <div className={classes.main}>
      <h1>Mini Palette</h1>
      <section className={classes.secondary}>
        <h1>
          Mini Palette <span>hululululu</span>
        </h1>
        <span>hululululu</span>
      </section>
    </div>
  );
}
// Below is a higher order component
export default withStyles(styles)(MiniPalette);