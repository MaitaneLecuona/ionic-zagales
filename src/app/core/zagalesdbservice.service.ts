import { Injectable } from '@angular/core';
import { IZagales } from '../../share/interfaces';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ZagalesdbserviceService {
  auxZagales: IZagales;
  auxZagalesList: IZagales[] = [];

  constructor(private storage: Storage) { }

  // Stores a value
  setItem(reference: string, value: IZagales) {
    this.storage.set(reference, {
      id: value.id, 
      name: value.name,  
      date: value.date, 
      cover: value.cover, 
      description:value.description
    })
      .then(
        (data) => console.log('Zagales first item!', data),
        error => console.error('Error storing item', error)
      );
  }

  // Gets a stored item
  getItem(reference): Promise<IZagales> {
    return this.storage.get(reference);
  }

  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }

  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }

  // Retrieving all values
  getAll(): Promise<IZagales[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IZagales) => this.auxZagalesList.push(data)
        );
      });
      return this.auxZagalesList;
    });
  }

  //removes a single stored item
  remove(reference: string){
    this.storage.remove(reference)
    .then(
      data => console.log(data),
      error => console.error(error)
    );
  }

  //removes all stored values
  clear() {
    this.storage.clear()
    .then(
      data => console.log(data),
      error => console.error(error)
    );
  }
}

