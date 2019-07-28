import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { VictoryPie } from 'victory';
import useInterval from 'react-useinterval';
import axios from 'axios';

const ResultsPage = ({ match, history }) => {
  const [formData, setFormData] = useState({
    question: 'Loading...',
    options: [{ option: 'Loading...' }, { option: 'Loading...' }]
  });

  const { question, options } = formData;

  // Array for Pie Chart Data
  const pieArray = [];

  // Fills the array for Pie Chart Data
  options.forEach((option, idx) => {
    if (option.count !== 0) {
      pieArray.push({ x: idx, y: option.count, label: option.option });
    } else {
      // Do nothing
    }
  });

  const getData = async () => {
    const id = match.params.id;
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
    } catch (err) {
      history.push('/');
    }
  };

  // npm module that made real time updates and unmounting way easier
  useInterval(getData, 1000);

  return (
    <Fragment>
      <Paper style={{ margin: 'auto', marginTop: '50px', maxWidth: '1345px' }}>
        <Typography
          style={{ paddingTop: '25px', fontSize: '50px', textAlign: 'center' }}
        >
          {question}
        </Typography>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={0}
          style={{ maxWidth: '1345px', margin: 'auto' }}
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
                    <td>{option.option} &nbsp;&nbsp;</td>
                    <td>{option.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                margin: '15px',
                marginBottom: '25px'
              }}
            >
              <VictoryPie
                colorScale={[
                  'red',
                  'blue',
                  'lime',
                  'yellow',
                  'fuchsia',
                  'aqua',
                  'gray',
                  'white',
                  'maroon',
                  'green',
                  'olive',
                  'navy',
                  'purple',
                  'teal',
                  'silver',
                  'black'
                ]}
                data={pieArray}
                labelRadius={90}
                radius={200}
                style={{
                  labels: { fill: 'black', fontSize: 20, fontWeight: 'bold' }
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ResultsPage;
