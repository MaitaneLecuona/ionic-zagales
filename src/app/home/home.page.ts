import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZagalesdbserviceService } from '../core/zagalesdbservice.service';
import { IZagales } from '../../share/interfaces';



@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html'
})

export class HomePage implements OnInit {
    public zagales: IZagales[];
    zagalesinit: IZagales[] = [
        {
            id: '1',
            name: 'Campamento de verano',
            date: '2021-07-01',
            cover: '../../assets/icon/campamentoVerano.png',
            description: "Con este campamento vas a tener la posibilidad de conocer a un monton de personas de diferentes lugares de españa y con las que podras estar 15 días increibles"
        },
        {
            id: '2',
            name: 'Javierada',
            date: '2021-04-02',
            cover: '../../assets/icon/javierada.png',
            description: "Como todos los años, nos juntamos todos los zagales de Regina Pacis y los de Madrid y caminamos desde distintos puntos hasta el castillo de Javier."
        },
        {
            id: '3',
            name: 'Zaragoza',
            date: '2021-03-25',
            cover: '../../assets/icon/zaragoza.png',
            description: "Con esta actividad vamos a poder ir a visitar zaragoza y luego a disfrutar del parque de atracciones."
        }
    ]

    constructor(private zagalesdbService: ZagalesdbserviceService, private route: Router){}

    ngOnInit(): void {
        //If the database is empty set initial values
        this.inicialization();
    }

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
    }
}


