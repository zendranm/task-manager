import { db } from '../firebase';

export async function createNewUser(username: string, email: string) {
  db.collection('Users').add({
    username: username,
    email: email,
  });
}
