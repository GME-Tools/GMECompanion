import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);
    
    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.db = app.firestore();
  }
  
  doSignIn = () => this.auth.signInWithPopup(this.provider);
  doSignOut = () => this.auth.signOut();
}
 
export default Firebase;