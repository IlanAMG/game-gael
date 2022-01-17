import './config';
import 'firebase/firestore'
import firebase from 'firebase'
import { levelsJ2 } from '../levels/levels'
export const db = firebase.firestore()

export const postPlayer = async (player) => {
    await db.collection('players').doc(player.id).set({...player, initialMap: {...(levelsJ2[1])}})
}
export const postNewForm = async (form, date) => {
    await db.collection('players').doc('2').collection('forms').add({
        form: {...form},
        date: date ?? null,
    })
}
