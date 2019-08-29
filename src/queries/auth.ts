import { auth } from '../firebase';
import { db } from '../firebase';

export async function createUser(email: string, password: string) {
  let resp = { email: '', error: '' };
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        resp.email = response.user.email;
      })
      .catch((error: any) => (resp.error = error.message));
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
      resp = {
        id: querySnapshot.docs[0].id,
        email: querySnapshot.docs[0].data().email,
        username: querySnapshot.docs[0].data().username,
      };
    });

  return resp;
}

export async function signIn(email: string, password: string) {
  let resp = { userData: null, error: '' };
  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        resp.userData = await getUserData(response.user.email);
      })
      .catch((error: any) => (resp.error = error.message));
    return resp;
  } catch {
    return null;
  }
}

export async function signOut() {
  await auth.signOut();
}
