import React from "react";
import axios from "axios";

const DeleteButton = (props) => {
  const { deleteHandler, id } = props;
  const onClickHandler = (e) => {
    axios
      .delete(`http://localhost:5001/api/smoothies/${id}`)
      .then((res) => {
        console.log(res);
        deleteHandler(id);
      })
      .catrch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={onClickHandler}></button>
    </div>
  );
};

export default DeleteButton;
