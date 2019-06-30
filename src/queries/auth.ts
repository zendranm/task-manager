import { auth } from '../firebase';

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
        resp = response.user.email;
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
