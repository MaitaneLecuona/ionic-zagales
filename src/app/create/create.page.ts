import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ZagalesdbserviceService } from '../core/zagalesdbservice.service';
import { IZagales } from '../../share/interfaces';
import { ZagalescrudService } from '../core/zagalescrud.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit{
    zagales: IZagales;
    zagalesForm: FormGroup;
    constructor(
        private router: Router,
        private zagalescrudService: ZagalescrudService,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.zagalesForm = new FormGroup({
            name: new FormControl(''),
            date: new FormControl(''),
            cover: new FormControl(''),
            description: new FormControl(''),
        });
    }

    async onSubmit() {
        const toast = await this.toastController.create({
            header:'Guardar una actividad',
            position: 'top',
            buttons: [
                {
                    side: 'start',
                    icon: 'save',
                    text: 'ACEPTAR',
                    handler: () => {
                        this.saveZagales();
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

    saveZagales() {
        this.zagales = this.zagalesForm.value;
        let nextKey = this.zagales.name.trim();
        this.zagales.id = nextKey;
        this.zagalescrudService.create_Zagales(this.zagales);
        console.warn(this.zagalesForm.value);
    }
}
