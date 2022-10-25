import React, { useState} from 'react'
import './New.css'
import NewFile from './NewFile';
import NewFolder from './NewFolder';
import {FolderState} from '../../Hooks/FolderState'
import { useParams } from 'react-router-dom';
function New() {
    const [open, setOpen] = useState(true);
    const {FolderId} =useParams()
    const {Folder}=FolderState(FolderId)

  return (
    <div className="collapsep">


        
        <div className="mobile" >
        <div  className={`${open ? "chat_mobile" :"chat"  }`} 
              style={{fontSize:'18px',borderBottomLeftRadius:`${open ? '':0 }`}} 
              onClick={() => setOpen(!open)}>
            {open ? <i class="fas fa-plus"></i> : 'Click to create'}  
        </div>
        
        <div style={{cursor:'pointer',display: `${open ? "none" : "flex"}`}} className="talk" onClick={() => setOpen(!open)}>
            
            <NewFolder CurrFolder={Folder} style={{cursor:'pointer'}} onClick={() => setOpen(!open)}/>
            <NewFile CurrFolder={Folder} onClick={() => setOpen(!open)}/>
        </div>
        </div>
    </div>
  )
} 




export default New
