import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout, selectUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import './NavBar.css'
function NavBar() {
  const user=useSelector(selectUser)
  const dispatch=useDispatch();
  const signOut = () =>{
    auth.signOut().then(() => {
      dispatch(logout());
    })
  }
  return (
    <div className="nav">
        <div className="AppName" style={{paddingLeft:"3%"}} as={Link} to='/'>
            <img src="https://avatars.dicebear.com/api/identicon/custom.svg"/>
            DropIt
        </div>
        <div className="personal">
        <div className="profile" as={Link} to="/user" style={{verticalAlign:"middle"}}>
            {user.displayName}
        </div>
        <div className="profile" as={Link} to="/user">
            <img onClick={signOut} src={user.photoUrl} ></img> 
        </div>
        </div>
    </div>
  )
}

export default NavBar
