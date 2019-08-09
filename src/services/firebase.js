import firebase from 'firebase';

import firebaseConfig from '../config/firebase/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default firebase;