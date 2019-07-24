import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import axios from 'axios';

const ResultsPage = ({ match }) => {
  const [formData, setFormData] = useState({
    question: '',
    options: [{ option: 'Loading...' }, { option: 'Loading...' }]
  });

  useEffect(() => {
    try {
      const id = match.params.id;
      const getData = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

          const res = await axios.get(`/api/get/${id}`, config);
          console.log(res);
          setFormData({
            question: res.data.question,
            options: res.data.options
          });
        } catch (err) {}
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [match]);

  return (
    <Fragment>
      <Grid>
        <Paper>hi</Paper>
        <Button onClick={() => console.log(formData)}>Log Button</Button>
      </Grid>
    </Fragment>
  );
};

export default ResultsPage;
