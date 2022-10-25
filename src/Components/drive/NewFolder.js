import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/userSlice'
import { db } from "../../firebase"
import { RootFolder } from '../../Hooks/FolderState';
import './NewFolder.css'
function NewFolder({CurrFolder}) {
    const [open,setOpen]=useState(false)
    const [name,setName]=useState("")
    
    const user = useSelector(selectUser)
    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(CurrFolder)
        if (CurrFolder==null)return 
        const path=[...CurrFolder.path]
        if (CurrFolder!=RootFolder){
            path.push({name:CurrFolder.name,id:CurrFolder.id})
        }
        db.folders.add({
            name:name,
            parentId:CurrFolder.id ? CurrFolder.id : null,
            path:path,
            userId:user.uuid,
            Time:db.getCurrentTimestamp()
        })
        setName("");
        closeModal();
    }

  return (
    <div>
    
      <Button className="add" onClick={openModal} variant="outline-dark ">
      <i className="fas fa-folder-plus" style={{fontSize:"20px",color:'black'}}></i>
      <p >New Folder</p>
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label style={{backgroundColor:'none'}}>
                        New Folder
                    </Form.Label>
                    <Form.Control  value={name} onChange={e => setName(e.target.value)} spellCheck="false"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondry" onClick={closeModal} style={{color:'white'}}>
                    Close
                </Button>
                <Button variant="primary" type="Submit">
                    ADD
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default NewFolder
