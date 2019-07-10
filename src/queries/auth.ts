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
      .catch((error: any) => console.log('createUser error: ' + error));
    return resp;
  } catch {
    return null;
  }
}

export async function getUserData(email: string) {
  let resp = null;

  await db
    .collection('Users')
    .where('email', '==', email)
    .get()
    .then(function(querySnapshot: any) {
      resp = querySnapshot.docs[0].data();
    });

  return resp;
}

export async function signIn(email: string, password: string) {
  let resp = null;

  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        resp = await getUserData(response.user.email);
      })
      .catch((error: any) => console.log('signIn error: ' + error));
    return resp;
  } catch {
    return null;
  }
}

export async function signOut() {
  await auth.signOut();
}
