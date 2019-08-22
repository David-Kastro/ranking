import firebase from '../firebase';

const db            = firebase.firestore();
const avaliacoesRef = db.collection("avaliacoes");
const usuariosRef   = db.collection("usuarios");
const meses         = [
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

export default async ( {user_uid, professor_uid, anonimo, avaliacao, comentario, usuarioInfo}, avaliation, avaliations ) => {


    const timestamp     = firebase.firestore.Timestamp.now().toMillis();

    const date          = new Date();
    const DateString    = `${date.getDay()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`;

    const scores        = avaliations.map( avaliation => (avaliation.de !== user_uid ? +avaliation.avaliacao : null) ).filter( val => !!val );
    const scoresSum     = scores.length === 0 ? 0 : scores.reduce((sum, score) => sum + score );
    const newScore      = (scoresSum + avaliacao) / (scores.length + 1);

    const dados = {
        anonimo,
        avaliacao,
        comentario,
        criadoEm: timestamp,
        de: user_uid,
        para: professor_uid,
        usuarioInfo
    }

    if( avaliation ) {

        await avaliacoesRef
            .doc( avaliation.id )
            .set( dados );
        

    } else {

        await avaliacoesRef
            .add(dados);

    }

    await usuariosRef
        .doc(professor_uid)
        .update({ avaliacao: newScore });

    return {...dados, criadoEm: DateString};

}