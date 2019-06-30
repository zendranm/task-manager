import { auth } from '../firebase';

export function createUser(email: any, password: any) {
  auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email: any, password: any) {
  auth.signInWithEmailAndPassword(email, password);
}

export function signOut() {
  auth.signOut();
}
