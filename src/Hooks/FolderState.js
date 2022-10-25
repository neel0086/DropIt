import { useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux'
import {db} from '../firebase'
import { selectUser } from '../features/userSlice'

export const RootFolder = {name:"Home",id:null,path:[]}

function reducer(state,{type,payload}){
    switch(type){
        case 'select_folder':
            return{
                FolderId:payload.FolderId,
                Folder:payload.Folder,
                childFiles:[],
                childFolder:[]

            }
        case 'update_folder':
            return {
                ...state,
                Folder:payload.Folder 
        }
        case 'setchild_folder':
            return{
                ...state,childFolder:payload.childFolder
            }
        case 'setchild_files':
            return{
                ...state,childFiles:payload.childFiles
            }
        default:
            return state
        }
    }

export function FolderState(FolderId=null,Folder=null) {
    const user=useSelector(selectUser)
    const [state,dispatch]=useReducer(reducer,
        {
            FolderId,
            Folder,
            childFolder:[],
            childFiles:[]
        })
    useEffect(()=>{
        dispatch({type:'select_folder',payload:{FolderId,Folder}})
    },[FolderId,Folder])
    useEffect(()=>{
        if(FolderId==null){
            return dispatch({
                type:'update_folder',
                payload:{Folder:RootFolder}
            })
        }
        db.folders
        .doc(FolderId)
        .get()
        .then(doc => {
            dispatch({
                type:'update_folder',
                payload:{Folder:db.formatDoc(doc)}
            })
        })
        .catch(()=>{
            dispatch({
                type:'update_folder',
                payload:{Folder:'RootFolder'}
            })
        })
    },[FolderId])

    useEffect(()=>{
        
        
        return (db.folders
        .where("parentId","==",FolderId)
        .where("userId","==",user.uuid)
        // .orderBy("Time",'desc')
        .onSnapshot(snapshot=>{
            dispatch({
                type:'setchild_folder',
                payload:{childFolder:snapshot.docs.map(db.formatDoc)}
            })
        }))
        
    },[FolderId,user])

    useEffect(()=>{
        return (db.files
        .where("FolderId","==",FolderId)
        .where("userId","==",user.uuid)
        // .orderBy("Time",'asc')
        .onSnapshot(snapshot=>{
            dispatch({
                type:'setchild_files',
                payload:{childFiles:snapshot.docs.map(db.formatDoc)}
            })
        }))
        
    },[FolderId,user])
    return state
}
