import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RootFolder } from '../../Hooks/FolderState'
import './Navigate.css'
function Navigate({CurrFolder}) {
    let path=CurrFolder===RootFolder ? [] : [RootFolder]
    if (CurrFolder) path=[...path,...CurrFolder.path]
  return (
    <div className="cds">
      
    <Breadcrumb className="flex-grow-1 " listProps={{className:" p-0"}}>
    
      {path.map((Folder,index)=>(
          <Breadcrumb.Item 
          key={Folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: Folder.id ? `/folder/${Folder.id}` : "/",
            }
        }}
          className="text-truncate d-inline-block mobileview"
          style={{maxWidth:"200px",backgroundColor:"rgba(245, 245, 245, 0.7)",fontFamily:'Roboto'}}>
            {Folder.name}
          </Breadcrumb.Item>
      ))
    }
      {CurrFolder && (
          <Breadcrumb.Item className="text-truncate d-inline-block mobileview"
          style={{maxWidth:"200px",backgroundColor:"rgba(245, 245, 245, 0.7)",fontFamily:'Roboto'}}>
            {CurrFolder.name}
          </Breadcrumb.Item>

      )}
    </Breadcrumb>
    </div>
  )
}

export default Navigate
