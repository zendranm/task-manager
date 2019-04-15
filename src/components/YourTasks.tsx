import * as React from 'react';
import fire from '../../firebase';

interface Props {
  match: any;
}

class YourTasks extends React.Component<Props> {
  async componentDidMount() {
    let db = fire.firestore();
    await db
      .collection('Lists')
      .where('Name', '==', this.props.match.params.name)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          doc.ref
            .collection('Tasks')
            .get()
            .then((querySnapshot: any) => {
              querySnapshot.forEach((doc: any) => {
                console.log(doc.data());
              });
            });
        });
      });
  }

  render() {
    return (
      <div>
        {this.props.match.params.name} <br />
        Todo: <br />
        1.Sortować listy przy wczytywaniu po dacie dodania albo parametrze jakimś
        <br />
        2.Dodać do bazy zadań taski
        <br />
        3.Dodać alerty przy usuwaninu czy na pewno
        <br />
        4.Przenieść metody odpytujące baze do jednego pliku
        <br />
        5.Uporządkować CSSy
      </div>
    );
  }
}

export default YourTasks;
