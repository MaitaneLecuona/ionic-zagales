import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ZagalesdbserviceService } from '../core/zagalesdbservice.service';
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
        private zagalesdbService: ZagalesdbserviceService,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.id = this.activatedrouter.snapshot.params.id;
        this.zagalesdbService.getItem(this.id).then(
            (data:IZagales) => this.zagales = data
        );
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
                        this.zagalesdbService.remove(id);
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