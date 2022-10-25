import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice'

import { db, storage } from "../../firebase"
import { RootFolder } from '../../Hooks/FolderState';
import './NewFile.css'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap';
function NewFile({ CurrFolder }) {
  const [download, setdownload] = useState([])
  const user = useSelector(selectUser)

  const [uploadingFiles, setUploadingFiles] = useState([])
  function handleUpload(e) {
    const file = e.target.files[0]
    const id = uuidV4()
    setUploadingFiles(prevupfile => [
      ...prevupfile, {
        id: id,
        name: file.name,
        progress: 0,
        error: false
      }
    ])

    if (CurrFolder == null || file == null)
      return



    const filepath = CurrFolder == RootFolder ? `${CurrFolder.path.join("/")
      }/${file.name
      }` : `${CurrFolder.path.join("/")
      }/${CurrFolder.name
    }/${file.name
    }`

    const fileUpload = storage.ref(`/files/${user.uuid
      }/${filepath}`).put(file)

    fileUpload.on("state_changed", snapshot => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes
      setUploadingFiles(prevUploadingFiles => {
        return prevUploadingFiles.map(uploadFile => {
          if (uploadFile.id === id) {
            return {
              ...uploadFile,
              progress: progress
            }
          }

          return uploadFile
        })
      })

    },
      () => {
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return {
                ...uploadFile,
                error: true
              }
            }
            return uploadFile
          })
        })

      },

      () => {
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.filter(uploadFile => {
            return uploadFile.id !== id
          })
        })


        fileUpload.snapshot.ref.getDownloadURL().then(url => { // console.log(url)
          db.files.add({
            url: url,
            name: file.name,
            userId: user.uuid,
            FolderId: CurrFolder.id,
            Time: db.getCurrentTimestamp()
          })
        })
      })

  }
  return (
    <> {/* <span  className='prog'>{!download ? 'Uploading...' : ''}</span> */}
      <div class="feild image-upload"
        style={
          {
            position: 'relative',
            cursor: 'pointer'
          }
        }>
        <label for="file-input"
          style={
            {
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }
          }>
          <div className='custom-file-upload'>
            <i className="fas fa-file-upload"
              style={
                {
                  color: 'black',
                  fontSize: '20px'
                }
              }></i>
            <p>New File</p>
          </div>
        </label>
        <input type="file" name="file-input" id="file-input" class="camera"
          onChange={handleUpload} />
      </div>
      {
        uploadingFiles.length > 0 && ReactDOM.createPortal(
          <div style={
            {
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px"
            }
          }>
            {
              uploadingFiles.map(file => (
                <Toast key={
                  file.id
                }
                  onClose={
                    () => {
                      setUploadingFiles(prevUploadingFiles => {
                        return prevUploadingFiles.filter(uploadFile => {
                          return uploadFile.id !== file.id
                        })
                      })
                    }
                  }>
                  <Toast.Header closeButton={file.error} className="text-truncate w-100 d-block">
                    {file.name} 
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar animated={!file.error}
                              variant={file.error ? "danger" : "primary" }
                              now={file.error ? 100 : file.progress * 100}
                      label={file.error ? "Error" : `${Math.round(file.progress * 100)}%`} 
                    />
                  </Toast.Body>
                </Toast>
              ))
            } </div>,
          document.body
        )
      }
    </>

  )
}

export default NewFile
