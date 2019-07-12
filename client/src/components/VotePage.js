import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

const VotePage = ({ match }) => {
  const [formData, setFormData] = useState(null);

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
      <h1 style={{ fontSize: '100px' }}>hi</h1>
      <Button onClick={() => console.log(formData)}>Log Button</Button>
    </Fragment>
  );
};

export default VotePage;
