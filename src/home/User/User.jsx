import {useState} from "react";
import {useDispatch  } from "react-redux";
import { deleteUser , updateUser } from "../../features/users/usersSlice";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import './User.scss';

const User = ({ user }) => {
  const [newName, setnewName] = useState('')

  const dispatch = useDispatch();

  const DeleteUser = () => {
    dispatch(deleteUser({
      id : user.id
    }))
  }
  const UpdateUser = () => {
    dispatch(updateUser({
      id : user.id ,
      first_name : newName
    }))
  }

  return (
    <>
      <div className="row">
        <div className="img-box">
          <img className="user-img" src={user.avatar} alt="Yasin" />
        </div>
        <div className="row">
          <h2> {user.first_name} {' '} {user.last_name} </h2>
          <TextField className="update-input" label="New Name..." type="search" variant="standard" 
           placeholder="New Name..." onChange={(e) => setnewName(e.target.value)}
          />
          <div className="buttons">
            <Button  onClick={() => UpdateUser()}  variant="contained" size="small" color="info" startIcon={<CreateIcon />}>
              Change Name
            </Button>
            <Button  onClick={() => DeleteUser()} variant="contained" size="small" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
