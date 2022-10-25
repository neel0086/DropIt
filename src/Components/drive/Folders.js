import {Button} from 'react-bootstrap'
import React from 'react'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Folders.css'

function Folders({Folder}) {
  return (
    <Button to={`/Folder/${Folder.id}`} as={Link} className="Fchild"
    style={{
      border: "none",
      backgroundColor: "rgb(35, 33, 47)",
      textAlign:"start",
      color: "white",
      height:'auto',
      fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
      borderRadius: '7px',
      content:">"
      }}
    >
      <i class="fas fa-folder"></i>
      {Folder.name}
    </Button>
  )
}

export default Folders
