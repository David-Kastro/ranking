import firebase from '../firebase';

const db = firebase.firestore();

export default () => {
    db
        .collection("Usuarios")
        .get()
        .then( result => {
            console.log(result)
        })
}