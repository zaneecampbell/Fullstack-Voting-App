import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const NotFoundPage = () => {
  return (
    <Fragment>
      <Paper
        style={{
          maxWidth: '750px',
          margin: 'auto',
          marginTop: '50px',
          padding: '10px',
          paddingBottom: '30px',
          textAlign: 'center'
        }}
      >
        <Typography
          style={{ margin: 'auto', padding: '20px' }}
          variant='h4'
          color='inherit'
        >
          404 Poll not found
          <div />
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            <Button
              style={{
                marginTop: '25px',
                fontSize: '15px',
                backgroundColor: '#3f51b5',
                padding: '15px',
                color: 'white'
              }}
            >
              Continue to Home Page
            </Button>
          </Link>
        </Typography>
      </Paper>
    </Fragment>
  );
};

export default NotFoundPage;
