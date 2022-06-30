import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteButton = (props) => {
  const { deleteHandler } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const onClickHandler = (e) => {
    axios
      .delete(`http://localhost:5001/api/smoothie/${id}`)
      .then((res) => {
        console.log(res);
        deleteHandler(id);
        navigate("/all")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button className="btn bg-red-500 m-2" onClick={onClickHandler}>Delete</button>
    </div>
  );
};

export default DeleteButton;
