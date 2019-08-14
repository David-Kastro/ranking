import firebase from '../firebase';

const db          = firebase.firestore();
const usuariosRef = db.collection("usuarios");

const fetchResult = ( result ) => {
    
    if( !result.exists ) {
        return null;
    }

    return {uid: result.id, ...result.data()};
}


export default async ( user_uid ) => {

    return await usuariosRef
        .doc(user_uid)
        .get()
        .then( result => fetchResult( result ) );
}