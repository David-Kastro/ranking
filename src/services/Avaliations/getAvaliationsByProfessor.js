import firebase from '../firebase';

const db            = firebase.firestore();
const avaliacoesRef = db.collection("avaliacoes");
const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const fetchResult   = ( result ) => {
    
    let data        = [];

    if( result.empty ) {
        return data;
    }

    result.forEach( avaliacao => {
        const { id }        = avaliacao;
        const avaliacaoData = avaliacao.data();

        const date          = new Date(avaliacaoData.criadoEm.seconds * 1000);
        // const Hours         = date.getHours()   < 10 ? '0' +  date.getHours()   : date.getHours();
        // const Minutes       = date.getMinutes() < 10 ? '0' +  date.getMinutes() : date.getMinutes();

        const DateString    = `${date.getDay()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`;

        data                = [ 
            ...data, 
            {
                ...avaliacaoData,
                id,
                criadoEm: DateString
            } 
        ];
    });

    return data;
}

export default async ( professor_uid ) => {
    return await avaliacoesRef
        .where( "para", "==", professor_uid )
        .get()
        .then( result => fetchResult( result ) )
}