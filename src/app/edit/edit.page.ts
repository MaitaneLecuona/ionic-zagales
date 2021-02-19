import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IZagales } from 'src/share/interfaces';
import { ZagalescrudService } from '../core/zagalescrud.service';
import { ZagalesdbserviceService } from '../core/zagalesdbservice.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  editedActividad: IZagales;
  zagales: IZagales;
  actividadForm: FormGroup;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private zagalescrudService: ZagalescrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params.id;
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
          this.actividadForm.get('name').setValue(this.zagales.name);
          this.actividadForm.get('description').setValue(this.zagales.description);
          this.actividadForm.get('date').setValue(this.zagales.date);
          this.actividadForm.get('cover').setValue(this.zagales.cover);
        }
      });
    });

    /**
     *  this.zagalescrudService.update_Zagales(this.id, this.zagales).then(
            (data: IZagales) => {
              this.zagales = data
              this.actividadForm.get('name').setValue(this.zagales.name);
              this.actividadForm.get('description').setValue(this.zagales.description);
              this.actividadForm.get('date').setValue(this.zagales.date);
              this.actividadForm.get('cover').setValue(this.zagales.cover);
            }
          );
     */

    this.actividadForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
    });
  }

  async editRecord(id) {
    const toast = await this.toastController.create({
      header: 'Editar actividad',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editActividad();
            this.router.navigate(['home']);
          }
        },
        {
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

  editActividad() {  
    this.editedActividad = this.actividadForm.value;
    let nextKey = this.zagales.id.trim();
    this.editedActividad.id = nextKey;
    this.zagalescrudService.update_Zagales(nextKey, this.editedActividad);
    console.warn(this.actividadForm.value);
  }
}
