import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db } from '../../firebase'
import FavFiles from './FavFiles'
import Files from './Files'
import './Trash.css'
function Favourite() {
  const user=useSelector(selectUser)
  const [mssg,setMssg] = useState([]);
  useEffect(()=>{
    db.fav.where("userId","==",user.uuid).onSnapshot(snapshot=>(
        setMssg(snapshot.docs.map(db.formatDoc))
    ))
  },[user])
  // console.log(mssg.length)
  
        
  return (
    <div className='container'>
      <p className='head'>Favourites</p>
        {mssg.length>0 && (
          <div className="flexx">
            {mssg.map(files => (
              <div 
                key={files.id}
                
                className="p-2 fileflex">
                <FavFiles file={files} data={2} />
              

              </div>
            ))}
          </div>
        )}
        {mssg.length==0 &&
            <div className='empty'>
              <img src="https://cdn-icons-png.flaticon.com/128/4076/4076419.png" />
              <p >Nothing To Show<br />Click save to create</p>
            </div>
        }  
    </div>
  )
}

export default Favourite
