import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ZagalescrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Zagales(record) {
    return this.firestore.collection('Zagales').add(record);
  }
  read_Zagales() {
    return this.firestore.collection('Zagales').snapshotChanges();
  }
  update_Zagales(recordID, record) {
    this.firestore.doc('Zagales/' + recordID).update(record);
  }
  delete_Zagales(record_id) {
    this.firestore.doc('Zagales/' + record_id).delete();
  }
}
