import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout, selectUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import './NavBar.css'
function NavBar() {
  const user=useSelector(selectUser)
  const dispatch=useDispatch();
  const [signDropdown,setSignDropdown] = useState(false)
  
  const signOut = () =>{
    auth.signOut().then(() => {
      dispatch(logout());
    })
  }

  useEffect(()=>{
    const bodyScope = document.querySelector("body");
    bodyScope.addEventListener("click",(event) => {
      if(!event.target.classList.contains("profile"))
        setSignDropdown(false);
    })
  })
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
              <img onClick={(e) => setSignDropdown(!signDropdown)} src={user.photoUrl}></img>
              <div className='dropdown' style={{display : `${signDropdown ? 'block' :'none' }`}}>
                <ul>
                  <li>Logout</li>  
                  <li>Logout</li>  
                  <li>Logout</li>  
                </ul> 
              </div> 
          </div>
        </div>
    </div>
  )
} 

export default NavBar
