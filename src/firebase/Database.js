import './config';
import 'firebase/firestore'
import firebase from 'firebase'

export const db = firebase.firestore()

export const postPlayer = async (player) => {
    await db.collection('players').doc(player.id).set(player)
}
export const postNewForm = async (form) => {
    await db.collection('players').doc('2').collection('forms').add({ ...form })
}
