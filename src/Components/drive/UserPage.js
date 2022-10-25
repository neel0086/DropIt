import React, { useState } from 'react'
import NavBar from './NavBar'
import './UserPage.css'
import {FolderState} from '../../Hooks/FolderState'
import Folders from './Folders'
import { useParams } from 'react-router-dom'
import Navigate from './Navigate'
import './UserPage.css'
import New from './New'
import Files from './Files'
function UserPage() {
  const {FolderId} =useParams()
  const {Folder,childFolder,childFiles}=FolderState(FolderId)
  
  return (
    <div >
       
      <div className="Container">
        
        <div className="user_style">
          <Navigate CurrFolder={Folder} style={{padding:"10px"}}/>
          {childFolder.length==0 && childFiles.length==0 && 
            <div className='empty'>
              <img src="https://cdn-icons-png.flaticon.com/128/4076/4076419.png" />
              <p >Folder is empty<br />Use + to create</p>
            </div>
          }
          {childFolder.length>0 && ( <span class="folderstyle">Folders</span>)}
        
          {childFolder.length>0 && (
            <div className="d-flex flex-wrap">
              {childFolder.map(childFolder => (
                <div 
                  key={childFolder.id}
                  style={{maxWidth:"250px"}}
                  className="p-2">
                  <Folders Folder={childFolder} />

                </div>
              ))}
            </div>
          )}

{childFiles.length>0 && ( <span class="folderstyle"><br/><br/>Files</span>)}

            {childFiles.length>0 && (
              <div className="flexx">
                {childFiles.map(childFile => (
                  <div 
                    key={childFile.id}
                    
                    className="p-2 fileflex">
                    <Files file={childFile} data={1}/>

                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
      <New />
    </div>
  )
}

export default UserPage
