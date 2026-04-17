import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToiletService } from '../../../../services/toilet-service';
import { ImplicitReceiver } from '@angular/compiler';



@Component({
  selector: 'app-our-products',
  imports: [],
  templateUrl: './our-products.html',
  styleUrl: './our-products.css',
})
export class OurProducts implements OnInit{

  toiletEconomico = {
    id: 1,
    name: "Sanitario Standard",
    imgURL: "/Sanitario-portatil-lavamanos-portada--300x300.jpg",
    details: "Ideal para obras en construcción y eventos masivos.",
    price: 4500,
    active: true,
    stock: 45,
     qualities: ["Mingitorio", "Portarrollos doble", "Ventilación pasiva"]
  }
  toiletDeluxe = {
    id: 2,
    name: "Baño Deluxe",
    imgURL: "/prod-bano-comfort-xl-s2.jpg",
    details: "Incluye lavamanos, espejo y luz LED. Pensado para casamientos y eventos corporativos.",
    price: 6000,
    active: true,
    stock: 45,
    qualities: ["Lavamanos a pedal", "Espejo panorámico", "Dispensador de jabón","Luz LED con sensor"]
  }
  toiletDiscapacitados = {
    id: 3,
    name: "Baño de Discapacitados",
    imgURL: "/accesible_grande_01.jpg",
    details: "Cabina extra ancha con barandas de seguridad, diseñada para sillas de ruedas.",
    price: 5500,
    active: true,
    stock: 45,
    qualities: ["Rampa de acceso nivelada", "Pasamanos de acero inoxidable", "Piso antideslizante"]
  }

  toiletSinBack = [this.toiletEconomico,this.toiletDeluxe,this.toiletDiscapacitados]

  

  selectedToilet: any | undefined; 

  constructor(public toiletService: ToiletService) {}

  ngOnInit(): void {
    this.getToilets();
  }


  getToilets() {
    this.toiletService.getAll().subscribe({
      next: (data) => {
        this.toiletService.toilets = data;
      },
      error: (e) => { console.log(e); }
    });
  }

 
  focusToilet(toilet: any) {
    this.selectedToilet = toilet;
  }

  closeModal() {
    this.selectedToilet = undefined;
  }
}
