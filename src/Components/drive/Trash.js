import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db } from '../../firebase'
import Files from './Files'
import './Trash.css'
import TrashFiles from './TrashFiles'
function Trash() {
  const user=useSelector(selectUser)
  const [messages,setMessages] = useState([]);
  useEffect(()=>{
    db.bin.where("userId","==",user.uuid).onSnapshot(snapshot=>(
        setMessages(snapshot.docs.map(db.formatDoc))
    ))
  },[user])
  console.log(messages.length)
  
        
    
    
  
  return (
    <div className='container'>
      
      <p className='head'>TRASH</p>
            
            {messages.length>0 && (
              <div className="flexx">
                {messages.map(files => (
                  <div 
                    key={files.id}
                    
                    className="p-2 fileflex">
                    <TrashFiles file={files} data={0}/>

                  </div>
                ))}
              </div>
            )}
            {messages.length==0 &&
              <div className='empty'>
                <img src="https://cdn-icons-png.flaticon.com/128/4076/4076419.png" />
                <p >Nothing To Show</p>
              </div>
            }
    </div>
  )
}

export default Trash
