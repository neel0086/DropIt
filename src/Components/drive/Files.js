import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';
import './Files.css'
import { Button, Modal, Form } from 'react-bootstrap';
function Files({file,data}) {
  const [open,setopen] = useState(0)
  const name=file.name
  const ext=name.split('.').pop().toLowerCase();
  var url;
  if(ext=='pdf'){
    url="https://cdn-icons-png.flaticon.com/512/337/337946.png"
  }
  else if(ext.slice(0,2)=='mp'){
    url="https://cdn2.iconfinder.com/data/icons/music-outlined-pixel-perfect/64/music-16-512.png"
  }
  else if(['jpg','jpeg','png','gif','jfif','tiff','tif'].includes(ext)){
    url=file.url
  }
  else{
    url="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
  }

// !---------------!//
  const filedel = () =>{
    db.files.doc(file.id).delete().then(function () {
      console.log(file)
      db.bin.add({
        url:file.url,
        name:file.name,
        userId:file.userId,
        FolderId:file.FolderId,
        Time:file.Time
      })
    })
    setOpenn(false)
  }

  
// !---------------!//
  const restore = () =>{
    db.bin.doc(file.id).delete().then(function () {
      console.log(file)
      db.files.add({
        url:file.url,
        name:file.name,
        userId:file.userId,
        FolderId:file.FolderId,
        Time:file.Time
      })
    })
    setOpenn(false)
  }

  
// !---------------!//
  const permanent = () =>{
    db.fav.doc(file.id).delete().then(function () {
    })
    setOpenn(false)
  }

  
// !---------------!//
  const delfor = () =>{
    setOpenn(false)
    db.bin.doc(file.id).delete().then(function () {
    })
    setOpenn(false)
  }
  const user=useSelector(selectUser)
  let messages=[]
  
  const favs = () =>{
      db.fav.where("userId","==",user.uuid).onSnapshot(snapshot=>(
      messages=snapshot.docs.map(doc => doc.data().url)
      
  ))
    
    if(!messages.includes(file.url) ){
      
      db.fav.add({
        url:file.url,
        name:file.name,
        userId:file.userId,
        FolderId:file.FolderId,
        Time:file.Time
      })
      setopen(!open)
  }
  
  setOpenn(false)
  }
  
  


  // !-----------MODAL---------!
  const [openn,setOpenn]=useState(false)
    function openModal(){
        setOpenn(true)
    }
    function closeModal(){
        setOpenn(false)
    }

  const cpylink = () =>{
    navigator.clipboard.writeText(file.url);
    setOpenn(false)
  }
  return (
      <div className='container' >
        <div>
    
    
    <i class="fas fa-ellipsis-h del" onClick={openModal}></i>
    <Modal show={openn} onHide={closeModal}>
      
          <Modal.Body>
              
            <p style={{borderBottom:'outset 0.1px grey',color:'whitesmoke'}}>{name.length > 15 ? name.slice(0,15)+'...' :name}</p>
                  
        {data==1 ? <div className="opt">
                      <span onClick={cpylink}><i class="far fa-copy"></i>Copy Link</span>
                      <span onClick={filedel}><i class="fas fa-trash"></i>Delete</span>
                      <span onClick={favs}><i class="fas fa-star"></i>Save</span>
                    </div>
        :(data==0 ? <div className="opt"><span onClick={restore}><i class="fas fa-undo"></i>Restore</span>
        <span onClick={delfor}><i class="fas fa-trash-alt"></i> Delete forever</span></div>
        :<div className="opt">
              <span onClick={cpylink}><i class="far fa-copy"></i>Copy Link</span>
              <span onClick={permanent}><i class="fas fa-file-export"></i>Unsave</span>
          </div>
        )       
      }
          </Modal.Body>
      
    </Modal>
  </div>
        {/* <i class="fas fa-ellipsis-h del" onClick={()=>{setopen(!open)}}></i>
        {data==1 ? <div className="opt"><span  style={{display:`${open ? 'block' : 'none'}`,borderBottom:'solid 0.001px grey'}} onClick={filedel}><i class="fas fa-trash"></i> Delete</span>
                      <span  style={{display:`${open ? 'block' : 'none'}`}} onClick={favs}><i class="fas fa-star"></i> Save</span>
                </div>
        :(data==0 ? <div className="opt1"><span  style={{display:`${open ? 'block' : 'none'}`,borderBottom:'solid 0.001px grey'}} onClick={restore}>Restore</span>
        <span  style={{display:`${open ? 'block' : 'none'}`}} onClick={delfor}>Delete forever</span></div>
        :<div className="opt1">
          <span  style={{display:`${open ? 'block' : 'none'}`}} onClick={permanent}>Unsave</span>
          </div>
        )       
      } */}
    <a href={file.url} target="_blank" className='linkstyle'>
        <div className='fileimage'>
        <img src={url} />
        <div className='filename' >
        {name.length > 15 ? name.slice(0,15)+'...' :name}
        </div>
        </div>
    </a>
    </div>
  )
}

export default Files
