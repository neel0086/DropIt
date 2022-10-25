import React from 'react'
import {  useNavigate } from 'react-router-dom'
import './Sidebar.css'
function SideBar() {
    const navigate = useNavigate();
  return (
    <div className='option'>
      
      <ul>
      <li><a  onClick={() => navigate('/')}><i class="fas fa-user" title="Home"></i></a></li>
      <li><a  onClick={() => navigate('/trash')}><i class="fas fa-trash" title="Trash"></i></a></li>
      <li><a  onClick={() => navigate('/favourite')}><i class="fas fa-star" title="Favourites"></i></a></li>
      </ul>
      
    </div>
  )
}

export default SideBar
