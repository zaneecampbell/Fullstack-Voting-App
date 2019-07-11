import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

const VotePage = ({ match }) => {
  const id = match.params.id;

  // const [formData, setFormData] = useState({
  //   question: null,
  //   options: null
  // });

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const getData = async () => {
      const res = await axios.get(`/api/get/${id}`, config);
      console.log(res);
    };
    getData();
  });
  console.log(id);
  return (
    <Fragment>
      <h1 style={{ fontSize: '100px' }}>hi</h1>
    </Fragment>
  );
};

export default VotePage;
