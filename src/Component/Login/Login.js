import { Button } from '@mui/material';
import React, { useContext } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
const app = initializeApp(firebaseConfig);


const Login = () => {
          const [loggedInUser, setLoggedInUser] = useContext(UserContext);
          const history = useHistory();
          const location = useLocation();
          let { from } = location.state || { from: { pathname: "/" } };
          const handleGoogleSignIn = () => {
                    const googleProvider = new GoogleAuthProvider();
                    const auth = getAuth(app);
                    signInWithPopup(auth, googleProvider)
                              .then((result) => {
                                        const {displayName, email} = result.user;
                                        const newUserInfo = {name: displayName, email};                                        
                                        setLoggedInUser(newUserInfo);
                                        history.replace(from);
                              }).catch((error) => {
                                        const errorMessage = error.message;
                                        console.log(errorMessage)
                              });
          }
          
          return (
                    <div style={{textAlign : "center"}}>
                              <h1>This is login component</h1>
                              <Button onClick={handleGoogleSignIn}><GoogleIcon />  Sign in</Button>
                    </div>
          );
};

export default Login;