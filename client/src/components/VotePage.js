import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const VotePage = ({ match }) => {
  const id = match.params.id;

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.get(`/api/get/${id}`, config);
      setFormData({
        question: res.data.question,
        options: res.data.options
      });
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }, [formData, id]);

  return (
    <Fragment>
      <h1 style={{ fontSize: '100px' }}>hi</h1>
    </Fragment>
  );
};

export default VotePage;
