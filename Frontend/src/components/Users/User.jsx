import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../context/UserContext';

function User() {

  const params = useParams(); 

  const{user,getUser} = useContext(UserContext);

  useEffect(() => {

    getUser(params.id);
    
  },[])
    
  

  return (
    <div>{user.username}</div>
  )
}

export default User