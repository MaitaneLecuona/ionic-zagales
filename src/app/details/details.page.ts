import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {ZagalescrudService} from '../../app/core/zagalescrud.service'
import { IZagales } from '../../share/interfaces';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit{
    id: string;
    public zagales: IZagales;

    constructor(
        private activatedrouter: ActivatedRoute,
        private router: Router,
        private zagalescrudService: ZagalescrudService,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.id = this.activatedrouter.snapshot.params.id;
        this.zagalescrudService.read_Zagales().subscribe(data => {
            let zagales = data.map(e => {
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
            zagales.forEach(element => {
                if (element.id == this.id) {
                    this.zagales = element;
                }
            });
        });
    }

    editRecord(zagales){
        this.router.navigate(['edit',zagales.id])
    }

    async removeRecord(id) {
        const toast = await this.toastController.create({
            header: 'Eliminar actividad',
            position: 'top',
            buttons: [
                {
                    side:'start',
                    icon: 'delete',
                    text:'ACEPTAR',
                    handler: () => {
                        this.zagalescrudService.delete_Zagales(id);
                        this.router.navigate(['home']);
                    }
                }, {
                    text: 'CANCELAR',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }
}