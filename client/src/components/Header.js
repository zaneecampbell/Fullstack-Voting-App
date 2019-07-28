import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function SimpleAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            style={{ margin: 'auto', padding: '20px' }}
            variant='h4'
            color='inherit'
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              Voting App
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
