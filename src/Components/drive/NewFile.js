import React, { useState } from 'react'
import  ReactDOM  from 'react-dom';
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/userSlice'
import { db, storage } from "../../firebase"
import { RootFolder } from '../../Hooks/FolderState';
import './NewFile.css'
import { v4 as uuidV4} from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap';
function NewFile({CurrFolder}) {
    const [download,setdownload]= useState([])
    const user = useSelector(selectUser)
 function handleUpload(e){
    const file=e.target.files[0]
    const id=uuidV4()
    setdownload(prevupfile => [
        ...prevupfile,
        {id:id,name:file.name,progress:0,error:false}
    ])

    if (CurrFolder==null || file==null)return 
    const filepath = CurrFolder == RootFolder ? 
    `${CurrFolder.path.join("/")}/${file.name}` :
    `${CurrFolder.path.join("/")}/${CurrFolder.name}/${file.name}`

    const fileUpload = storage.ref(`/files/${user.uuid}/${filepath}`).put(file)
    fileUpload.on(
        "state_changed",
        snapshot => {
            // const per=snapshot.bytesTransferred / snapshot.totalBytes
            // setdownload(prev => {
            //     return prev.map(upfile =>{
            //         if (upfile.id==id){
            //             return {...upfile,progress:prev}
            //         }
            //     })
            // })
        },
        () => {} ,
        () => {
            fileUpload.snapshot.ref.getDownloadURL().then(url =>{
                // console.log(url)
                db.files.add({
                    url:url,
                    name:file.name,
                    userId:user.uuid,
                    FolderId:CurrFolder.id,
                    Time:db.getCurrentTimestamp()
                })
            })
        }
    )

 }
  return (
      <>
    <div>
        {/* <span  className='prog'>{!download ? 'Uploading...' : ''}</span> */}
        <div class="feild image-upload" style={{position:'relative',cursor:'pointer'}}>
            <label for="file-input" style={{cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <div className='custom-file-upload'>
                <i className="fas fa-file-upload" style={{color:'black',fontSize:'20px'}}></i>
                <p>New File</p>
                </div>
            </label>
            <input type="file" name="file-input" id= "file-input"class="camera" onChange={handleUpload}/>  
        </div>
        {/* {download.length>0 && 
            ReactDOM.createPortal(
                <div className='progress'>
                {download.map(file => (
                    <Toast
                    key={file.id}
                    onClose={() => {
                      setdownload(prevUploadingFiles => {
                        return prevUploadingFiles.filter(uploadFile => {
                          return uploadFile.id !== file.id
                        })
                      })
                    }}
                  >
                    <Toast.Header
                      closeButton={file.error}
                      className="text-truncate w-100 d-block"
                    >
                      {file.name}
                    </Toast.Header>
                    <Toast.Body>
                      <ProgressBar
                        animated={!file.error}
                        variant={file.error ? "danger" : "primary"}
                        now={file.error ? 100 : file.progress * 100}
                        label={
                          file.error
                            ? "Error"
                            : `${Math.round(file.progress * 100)}%`
                        }
                      />
                    </Toast.Body>
                  </Toast>
                ))}
                </div>,
                document.body   */}
            {/* )
        } */}
        
    </div>
    </>
  )
}

export default NewFile
