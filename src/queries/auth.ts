import { auth } from '../firebase';
import { db } from '../firebase';

export async function createUser(email: string, password: string) {
  let resp = null;
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        resp = response.user.email;
      })
      .catch((error: any) => console.log(error));
    return resp;
  } catch {
    return null;
  }
}

export async function signIn(email: string, password: string) {
  let resp = null;

  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        await db
          .collection('Users')
          .where('email', '==', response.user.email)
          .get()
          .then(function(querySnapshot: any) {
            resp = querySnapshot.docs[0].data();
          });
      })
      .catch((error: any) => console.log(error));
    return resp;
  } catch {
    return null;
  }
}

export function signOut() {
  auth.signOut();
}
