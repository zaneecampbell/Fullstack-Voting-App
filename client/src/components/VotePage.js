// sending the index off to the server-side to increment the count in the poll for their vote

import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

const VotePage = ({ match, history }) => {
  const [formData, setFormData] = useState({
    question: '',
    options: [{ option: 'Loading...' }, { option: 'Loading...' }],
    selected: ''
  });

  const { question, options, selected } = formData;

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
          setFormData({
            question: res.data.question,
            options: res.data.options,
            selected: ''
          });
        } catch (err) {}
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [match]);

  const handleChange = e => {
    const selected = e.target.value;
    setFormData({ ...formData, selected });
  };

  const onSubmit = async (e, selected, history, id = match.params.id) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ selected });

      await axios.patch(`/api/patch/${id}`, body, config);
      history.push(`/ResultsPage/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

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
        <Typography style={{ marginTop: '25px', fontSize: '50px' }}>
          {question}
        </Typography>
        <form onSubmit={e => onSubmit(e, selected, history)}>
          <div>
            <FormGroup style={{ marginTop: '25px' }}>
              {options.map((option, idx) => (
                <div key={idx} id='form-div'>
                  <FormControlLabel
                    style={{ padding: '10px' }}
                    value={idx}
                    control={
                      <Radio
                        type='radio'
                        value={option.idx}
                        checked={selected === `${idx}`}
                        onChange={handleChange}
                      />
                    }
                    label={option.option}
                    onClick={() => option.idx}
                  />
                </div>
              ))}
            </FormGroup>
          </div>
          <Button
            style={{
              marginTop: '25px',
              fontSize: '30px',
              backgroundColor: '#3f51b5',
              padding: '15px',
              color: 'white'
            }}
            type='submit'
          >
            Vote
          </Button>
        </form>
      </Paper>
      <Button onClick={() => console.log(formData)}>Log Button</Button>
    </Fragment>
  );
};

export default VotePage;
