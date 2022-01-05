import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import { auth,provider} from '../firebase'
import './Login.css'
function Login() {
    const dispatch = useDispatch()
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then(({user}) => {
            dispatch(login({
                displayName:user.displayName,
                email:user.email,
                uuid:user.uid,
                photoUrl:user.photoURL
            }))
        })
    }
  return (
    <div className="login">
        <div className="login_container">
            <h1>DropIt</h1>
        <Button variant="contained" color="primary" onClick={signIn}>Login</Button>
        </div>

      
    </div>
  )
}

export default Login 