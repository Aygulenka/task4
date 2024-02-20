import React from 'react';
import axios from 'axios';

const Delete = () => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/user`);
      console.log(response.data); // or do something with the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
