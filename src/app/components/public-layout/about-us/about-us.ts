// 1. IMPORTAMOS LAS HERRAMIENTAS: Agregamos ViewChild y ElementRef
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgClass],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs implements OnInit, AfterViewInit {

  images: string[] = [
    'https://www.mistermofer.com/images/menu1.jpg',
    'https://www.mistermofer.com/images/banner2.jpg',
    'https://i0.wp.com/destapacioneslavictoria.com.ar/wp-content/uploads/2020/06/Destapacion-puerto-madero.png?fit=817%2C617&ssl=1',
    'http://localhost:4200/WhatsApp-Image-2023-04-12-at-5.21.57-PM.jpeg'
  ];

  currentIndex: number = 0;

  contadorExp: number = 0;
  contadorClientes: number = 0;
  contadorEventos: number = 0;

 
  @ViewChild('boxes') seccionEstadisticas!: ElementRef;
  
 
  animacionYaEjecutada: boolean = false;

  ngOnInit(): void {
    setInterval(() => {
      this.avance();
    }, 3000);
  }

 
  ngAfterViewInit(): void {
  
    const espia = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {

        if (entrada.isIntersecting && !this.animacionYaEjecutada) {
          
          this.animarContadores(); 
          
          this.animacionYaEjecutada = true; 
          espia.disconnect(); 
        }
      });
    }, { threshold: 0.5 }); 

  
    if (this.seccionEstadisticas) {
      espia.observe(this.seccionEstadisticas.nativeElement);
    }
  }

  avance() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  getClass(index: number) {
    const total = this.images.length;
    
    if (index === this.currentIndex) {
      return 'active';
    } 
    else if (index === (this.currentIndex + 1) % total) {
      return 'next';
    } 
    else if (index === (this.currentIndex - 1 + total) % total) {
      return 'prev';
    } 
    else {
      return 'hidden';
    }
  }

  animarContadores() {
    let exp = 0;
    let intervaloExp = setInterval(() => {
      exp += 1;
      this.contadorExp = exp;
      if (exp >= 25) {
        clearInterval(intervaloExp); 
      }
    }, 60);

    let clientes = 0;
    let intervaloClientes = setInterval(() => {
      clientes += 5; 
      this.contadorClientes = clientes;
      if (clientes >= 200) {
        clearInterval(intervaloClientes); 
      }
    }, 30); 

    let eventos = 0;
    let intervaloEventos = setInterval(() => {
      eventos += 1;
      this.contadorEventos = eventos;
      if (eventos >= 40) {
        clearInterval(intervaloEventos);
      }
    }, 40);
  }
}