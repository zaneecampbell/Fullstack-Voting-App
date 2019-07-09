import React, { useState, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: [
      { option: '', count: 0 },
      { option: '', count: 0 },
      { option: '', count: 0 }
    ]
  });

  const { question, options } = formData;

  const onInput = e => {
    // if typing in question field updates question in state
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
        options.push({ option: '', count: 0 });
      }
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
        <form style={{ marginTop: '50px', marginBottom: '50px' }}>
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
        </form>
      </Paper>
      <Button onClick={() => console.log(formData)}>Console Log State</Button>
    </Fragment>
  );
};

export default CreatePage;
