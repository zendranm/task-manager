import { db } from '../firebase';

export function createNewUser(username: string, email: string) {
  db.collection('Users').add({
    username: username,
    email: email,
  });
}
