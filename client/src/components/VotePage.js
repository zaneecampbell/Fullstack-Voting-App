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
      } catch (err) {
        console.log(err);
        history.push('/NotFoundPage');
      }
    };
    getData();
  }, [match, history]);

  const handleChange = e => {
    const selected = e.target.value;
    setFormData({ ...formData, selected });
  };

  const onSubmit = async (e, selected, history, id = match.params.id) => {
    e.preventDefault();
    const voted = JSON.parse(localStorage.getItem('id'));

    // if nothing in the id field for voted, creates a new array and adds current poll id,
    // if there is an id field checks to see if youve already voted in this one,
    // else pushes current id to the array and saves it back, so you can't vote again

    if (!voted) {
      const voted = [];
      voted.push(id);
      localStorage.setItem('id', JSON.stringify(voted));
    } else if (voted.includes(id)) {
      alert('You have already voted on this poll, continuing to results');
      return history.push(`/ResultsPage/${id}`);
    } else {
      voted.push(id);
      localStorage.setItem('id', JSON.stringify(voted));
    }

    // sends off the request for your vote
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
      console.log(err.response.statusText);
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
          <div style={{ display: 'inline-block', textAlign: 'left' }}>
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
          <br />
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
