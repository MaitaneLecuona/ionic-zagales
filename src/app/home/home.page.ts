import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZagalesdbserviceService } from '../core/zagalesdbservice.service';
import { IZagales } from '../../share/interfaces';
import {ZagalescrudService} from '../core/zagalescrud.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html'
})

export class HomePage implements OnInit {

    zagales: any;
    zagalesName: string;
    zagalesDate: string;
    zagalesCover: string;
    zagalesDescription: string;
    
    constructor(private zagalescrudService: ZagalescrudService, private route: Router){}

    zagalTapped(zagal) {
        this.route.navigate(['details', zagal.id]);
    }

    ngOnInit(): void {
        this.zagalescrudService.read_Zagales().subscribe(data => {
            this.zagales = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    isEdit: false,
                    name: e.payload.doc.data()['name'],
                    date: e.payload.doc.data()['date'],
                    cover: e.payload.doc.data()['cover'],
                    description: e.payload.doc.data()['description']
                };
            })
            console.log(this.zagales);
           

        });
    }

    CreateRecord() {
        let record = {};
        record['name'] = this.zagalesName;
        record['date'] = this.zagalesDate;
        record['cover'] = this.zagalesCover;
        record['description'] = this.zagalesDescription;
        this.zagalescrudService.create_Zagales(record).then(resp => {
        this.zagalesName = "";
        this.zagalesDate = "";
        this.zagalesCover = "";
        this.zagalesDescription = "";
        console.log(resp);
        })
        .catch(error => {
        console.log(error);
        });
        }

    RemoveRecord(rowID) {
        this.zagalescrudService.delete_Zagales(rowID);
    }

    EditRecord(record) {
        record.isEdit = true;
        record.EditName = record.name;
        record.EditDate = record.date;
        record.EditCover = record.cover;
        record.zagalesDescription = record.description;
    }

    UpdateRecord(recordRow) {
        let record = {};
        record['name'] = recordRow.EditName;
        record['date'] = recordRow.EditDate;
        record['cover'] = recordRow.EditCover;
        record['description'] = recordRow.zagalesDescription;

        this.zagalescrudService.update_Zagales(recordRow.id, record);
        recordRow.isEdit = false;
    }









    /*
    ionViewDidEnter(){
        //Remove elements if it already has values
        if(this.zagales !== undefined){
            this.zagales.splice(0);
        }
        this.retrieveValues();
    }

    inicialization() {
        if (this.zagalesdbService.empty()) {
            this.zagalesinit.forEach(zagal => {
                this.zagalesdbService.setItem(zagal.id, zagal);
            });
        }
    }

    retrieveValues(){
        //Retrieve values
        this.zagalesdbService.getAll().then(
            (data) => this.zagales = data
        );
    }

    zagalTapped(zagal) {
        this.route.navigate(['details', zagal.id]);
    }*/
}


