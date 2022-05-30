import {useState} from "react";
import { useSelector , useDispatch  } from "react-redux";
import { getAllUsers , fetchAsyncUsers , addUser , Load} from "../../features/users/usersSlice";
import User from "../User/User";
import Loading from "../../Loading/Loading";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Grid from '@mui/material/Grid';
import './Users.scss';

const Users = () => {

  const userList = useSelector(getAllUsers);
  const loading = useSelector(Load);
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userValue, setUserValue] = useState(false)

  const GetUsers = () => {
    setUserValue(true)
    dispatch(fetchAsyncUsers());
  }

  const addUsers = () => {
    if(userValue === false ){
      alert('ابتدا کاربران را فراخوانی کنید')
      return
    }
    if(userList.length === 0 ){
      setUserValue(false)
      alert('ابتدا کاربران را فراخوانی کنید')
      return
    }
    dispatch(addUser({
      avatar : 'https://reqres.in/img/faces/2-image.jpg' ,
      first_name : name ,
      last_name : lastName,
      id : userList[userList.length - 1].id +1
    }));
    setName('')
    setLastName('')
  }

  let renderUsers = "" ;

   renderUsers = 
    userList.length ? userList.slice(0, 20).map((user) =>
    <User key={user.id} user={user} /> ) : '' ;

  return (
    <>
      {loading === true ? (<Loading/>) :
        <div>
          <div className="user-settings">
            <Button  onClick={() => GetUsers()}  variant="contained" size="small" color="success" startIcon={<CloudDownloadIcon />}>
              Get Users
            </Button>
            <input type='text' placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
            <input type='text' placeholder="LastName..." value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Button  onClick={() => addUsers()}  variant="contained" size="small" color="info" startIcon={<AddIcon />}>
              Add Users
            </Button>
          </div>
          <Grid className="user-container">
            {renderUsers}
          </Grid>
        </div>
      }
    </>
  );
};

export default Users;