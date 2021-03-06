import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const CreatePage = ({ history }) => {
  const [formData, setFormData] = useState({
    question: '',
    options: [
      { option: '', count: 0, index: 0 },
      { option: '', count: 0, index: 1 },
      { option: '', count: 0, index: 2 }
    ]
  });

  // Destructure state variables
  const { question, options } = formData;

  const onInput = e => {
    // If typing in question field updates question in state
    if (e.target.name === 'question') {
      setFormData({ ...formData, [e.target.name]: e.target.value });

      // Otherwise updates the options state
    } else {
      // Creates a copy of the options state
      let copy = options;

      // Updates the copy of the state
      copy[e.target.id].option = e.target.value;

      // Replaces currect options array with updated copy
      setFormData({ ...formData, options: copy });

      // If the field being typed in is the bottom field, automatically adds a new Input by adding a new options object to the state.
      if (parseInt(e.target.id, 10) === options.length - 1) {
        options.push({
          option: '',
          count: 0,
          index: parseInt(e.target.id, 10) + 1
        });
      }
    }
  };

  const onSubmit = async (e, history) => {
    e.preventDefault();

    // setup config headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // make sure the question field isn't empty
    if (formData.question.trim() === '') {
      return alert('Please ask a question.');
    }

    try {
      // make sure none of the options fields aren't empty
      let trimCopy = formData.options.filter(
        option => option.option.trim() !== ''
      );

      // setup object to send to server
      const postData = {
        question,
        options: trimCopy
      };

      // makes sure you have at least 2 options
      if (postData.options.length < 2) {
        return alert('Please add at least 2 options');
      }

      console.log(postData, 'postData');

      // send to server
      const res = await axios.post('/api/create', postData, config);
      console.log(res.data, 'resData - CreatePage End');

      // push you to votepage
      history.push(`/VotePage/${res.data}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginLeft: '5px', marginRight: '5px' }}>
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
        <form
          style={{ marginTop: '50px', marginBottom: '50px' }}
          onSubmit={e => onSubmit(e, history)}
        >
          <Input
            style={{
              fontSize: '50px',
              margin: '15px',
              marginBottom: '50px'
            }}
            type='text'
            value={question}
            name='question'
            placeholder='Question here'
            onInput={e => onInput(e)}
            autoComplete='off'
          />
          <div id='input-container'>
            {/* Maps out option inputs dynamically as more are needed */}
            {options.map((option, idx) => (
              <div key={idx}>
                <Input
                  style={{
                    fontSize: '50px',
                    margin: '15px'
                  }}
                  id={`${idx}`}
                  type='text'
                  value={option.option}
                  placeholder={`Option ${idx + 1}`}
                  onInput={e => onInput(e)}
                  autoComplete='off'
                />
              </div>
            ))}
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
            Creat Poll
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default CreatePage;
