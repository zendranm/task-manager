import { auth } from '../firebase/firebase';

export function createUser(email: any, password: any) {
  auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email: any, password: any) {
  auth.signInWithEmailAndPassword(email, password);
}

export function signOut() {
  auth.signOut();
}

export function onAuthStateChanged() {
  let tmp;
  auth.onAuthStateChanged((authUser: any) => {
    authUser ? (tmp = authUser) : (tmp = null);
  });
  console.log('tmp: ' + tmp);
  return tmp;
}
