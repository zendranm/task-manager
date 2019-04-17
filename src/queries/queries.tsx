import fire from '../../firebase';

export async function getAllLists(newList: any) {
  let db = fire.firestore();
  await db
    .collection('Lists')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        newList.push({ id: doc.data().ID, name: doc.data().Name });
      });
    });
}

export async function getLastId(onChangeLastListId: any, tmp: boolean) {
  let db = fire.firestore();
  await db
    .collection('Lists')
    .orderBy('ID', 'desc')
    .limit(1)
    .get()
    .then(async (querySnapshot: any) => {
      await querySnapshot.forEach((doc: any) => {
        onChangeLastListId(doc.data().ID);
        tmp = true;
      });
    });
  return tmp;
}

export function addList(lastListId: number, newListName: string) {
  let db = fire.firestore();
  db.collection('Lists').add({
    ID: lastListId + 1,
    Name: newListName,
  });
}

export function deleteList(listId: number) {
  let db = fire.firestore();
  let item = db.collection('Lists').where('ID', '==', listId);

  item.get().then(function(querySnapshot: any) {
    querySnapshot.forEach(function(doc: any) {
      doc.ref.delete();
    });
  });
}

export async function getAllTasks(name: string) {
  let newList: any = new Array();
  let db = fire.firestore();
  console.log('1');
  await db
    .collection('Lists')
    .where('Name', '==', name)
    .get()
    .then(async (querySnapshot: any) => {
      console.log('2');
      for (const item of querySnapshot.docs) {
        console.log('3');
        await item.ref
          .collection('Tasks')
          .get()
          .then((querySnapshot: any) => {
            console.log('4');
            for (const item of querySnapshot.docs) {
              console.log('5');
              newList.push({ id: item.data().ID, name: item.data().Name });
            }
            console.log('6');
          });
        console.log('7');
      }
      console.log('8');
    });
  console.log('9');
  return newList;
}
