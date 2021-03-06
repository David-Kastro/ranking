import firebase from '../firebase';

const db          = firebase.firestore();
const usuariosRef = db.collection("usuarios");

const fetchResult = ( result ) => {
    
    let data = [];

    if( result.empty ) {
        return data;
    }

    result.forEach( user => {
        data = [ ...data, {uid: user.id, ...user.data()} ];
    });

    return data;
}

export default async ( role ) => {
    return await usuariosRef
        .where( "perfil", "==", role )
        .get()
        .then( result => fetchResult( result ) )
}