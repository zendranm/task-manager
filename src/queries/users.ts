import { db } from '../firebase';

export async function createNewUser(username: string, email: string) {
  let userInfo = { id: '' };
  await db
    .collection('Users')
    .add({
      username: username,
      email: email,
    })
    .then((response: any) => {
      userInfo = { id: response.id };
    });
  return userInfo;
}
