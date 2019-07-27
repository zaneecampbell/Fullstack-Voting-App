import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { Button } from '@material-ui/core';
import axios from 'axios';

const ResultsPage = ({ match }) => {
  const [formData, setFormData] = useState({
    question: 'Loading...',
    options: [{ option: 'Loading...' }, { option: 'Loading...' }]
  });

  const { question, options } = formData;

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
      <Paper>
        <Typography style={{ fontSize: '50px', textAlign: 'center' }}>
          {question}
        </Typography>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={0}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{
              textAlign: 'center',
              margin: 'auto',
              alignItems: 'center'
            }}
          >
            <table
              style={{ margin: 'auto', textAlign: 'right', fontSize: '30px' }}
            >
              <tbody>
                {options.map((option, idx) => (
                  <tr key={idx}>
                    <td>{option.option}: &nbsp;&nbsp;</td>
                    <td>{option.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            Graph Here
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ResultsPage;
