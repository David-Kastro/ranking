import firebase from '../firebase';

const db          = firebase.firestore();
const usuariosRef = db.collection("usuarios");


export default ( user_uid, data ) => {
    usuariosRef.doc(user_uid).set(data);
}