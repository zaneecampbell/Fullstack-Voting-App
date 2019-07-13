import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

const VotePage = ({ match }) => {
  const [formData, setFormData] = useState({
    question: '',
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
        <Typography style={{ marginTop: '50px', fontSize: '50px' }}>
          {question}
        </Typography>
        <form>
          <div>
            <FormGroup style={{ marginTop: '50px' }}>
              {options.map((option, idx) => (
                <div key={idx} id='form-div'>
                  <FormControlLabel
                    style={{ padding: '10px' }}
                    control={
                      <Radio type='radio' value={option.firebaseIndex} />
                    }
                    label={option.option}
                  />
                </div>
              ))}
            </FormGroup>
          </div>
        </form>
      </Paper>
      <Button onClick={() => console.log(options)}>Log Button</Button>
    </Fragment>
  );
};

export default VotePage;
