import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservationService';
import { ToiletService } from '../../services/toilet-service';
import { ReservationRequest } from '../../models/ReservationRequest';
import { ReservationDetailsRequest } from '../../models/ReservationDetailsRequest';
import { trigger, transition, style, animate } from '@angular/animations';
import { dateRangeValidator } from '../../validators/data-range';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservs',
  imports: [ReactiveFormsModule],
  templateUrl: './reservs.html',
  styleUrl: './reservs.css',
  animations: [
    trigger('fadeSlideInOut', [
      
      // AL ENTRAR (:enter)
      transition(':enter', [
        // Estado inicial: invisible, 20px arriba, SIN ALTURA y escondiendo lo que sobresalga
        style({ opacity: 0, transform: 'translateY(-20px)', height: 0, overflow: 'hidden' }), 
        
        // Estado final: visible, en su lugar y con su altura natural ('*')
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)', height: '*' }))
      ]),

      // AL SALIR (:leave)
      transition(':leave', [
        // 1. Primero, le decimos que esconda cualquier cosa que intente salirse de la caja
        style({ overflow: 'hidden' }),
        
        // 2. Luego, animamos hacia la derecha, desvanecemos, y aplastamos la altura y los márgenes a 0
        animate('300ms ease-in', style({ 
          opacity: 0, 
          transform: 'translateX(100px)', 
          height: 0,
          paddingTop: 0, 
          paddingBottom: 0, 
          marginTop: 0, 
          marginBottom: 0 
        })) 
      ])
    ])
  ]
})
export class Reservs implements OnInit {

  reservForm: FormGroup;
 
  clientName: FormControl = new FormControl('',Validators.required);
  phoneNumber: FormControl = new FormControl('',Validators.required);
  startDay: FormControl = new FormControl('',Validators.required);
  endDay: FormControl = new FormControl('',Validators.required);
  id?: number;
  
  // lista dinámica
  details: FormArray = new FormArray<any>([]);

  constructor(
    private reservationService: ReservationService, 
    public toiletService: ToiletService,
    private route: ActivatedRoute
  ) {
    
    this.reservForm = new FormGroup({
      clientName: this.clientName,
      phoneNumber: this.phoneNumber,
      startDay: this.startDay,
      endDay: this.endDay,
      details: this.details 
    }, { validators: dateRangeValidator });
  }

  ngOnInit(): void {
    this.getToilets();
    this.id = this.route.snapshot.params['id']
    if(this.id){
      this.toiletService.getById(this.id).subscribe({
        next: (data) => {this.reservForm.patchValue(data)},
        error: (e) => {console.log(e)}
      })
    }
  }

  // 1. Función para agregar una fila nueva (Baño + Cantidad)
  addDetail() {
    // Definimos valor por defecto: si ya hay baños cargados, usamos el primero. Si no, vacío.
    const defaultName = this.toiletService.toilets.length > 0 ? this.toiletService.toilets[0].name : '';

    const newGroup = new FormGroup({
      toiletType: new FormControl(defaultName),
      quantity: new FormControl(1)
    });

    this.details.push(newGroup);
  }

  // 2. Función para borrar una fila específica
  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  
  // 3. Función para calcular el precio de UNA fila específica
  getToiletPrice(index: number): number {
    // Buscamos la fila correspondiente
    const currentGroup = this.details.at(index);
    const typeName = currentGroup.get('toiletType')?.value;
    
    // Buscamos el precio en el servicio
    const toilet = this.toiletService.toilets.find(t => t.name === typeName);
    return toilet ? toilet.price * this.details.at(index).get("quantity")?.value: 0;
  }

  getDays(){
    const start= this.reservForm.get("startDay")?.value;
    const end= this.reservForm.get("endDay")?.value;
    let days;

    if(!start || !end){
      days = 1
    }else{

      const startDate = new Date(start)
      const endDate = new Date(end)
  
      const difference = endDate.getTime() - startDate.getTime();
      days = difference / (1000 * 60 * 60 * 24);
      days + 1
    }

    return days

  }
  
  totalPrice(){
    let index = 0;
    let totalPrice = 0
    while(index < this.details.length){
      totalPrice += this.getToiletPrice(index)
      index++
    }
    return totalPrice * this.getDays();
  }
  getToilets() {
    this.toiletService.getAll().subscribe({
      next: (data) => {
        this.toiletService.toilets = data;
        console.log(data)
        
        // Si la lista de filas está vacía, agregamos la primera automáticamente
        if (this.details.length === 0) {
          this.addDetail();
        }
      },
      error: (e) => { console.log(e); }
    });
  }

  postReservation() {
    if (this.reservForm.valid) {

      //Hago esto por el tema de que el precio no es parte del formulario y no puedo mandar el valor del formulario por parametro ya que no tendria el valor del precio de la reserva

      if(this.id){

        this.toiletService.put(this.id,this.reservForm.value).subscribe({
          next: (data) => {console.log(data)},
          error: (e) => {console.log(e)}
        })
      }else{

        const formValue = this.reservForm.value;
  
        const reserve: ReservationRequest = {
          clientName: formValue.clientName,
          phoneNumber: formValue.phoneNumber,
          startDate: formValue.startDay,
          endDate: formValue.endDay,
          price: this.totalPrice(),
          details: formValue.details.map((d:any): ReservationDetailsRequest => {
              
            const toiletId = this.toiletService.toilets.find(t => t.name === d.toiletType)
            this.toiletService.toilets.forEach(t => (console.log(toiletId?.name)))
            console.log(toiletId?.id + "caca feaaaaaaa")
            const reservationDetailsRequest : ReservationDetailsRequest = {
              toiletTypeId: toiletId?.id || 0, 
              quantity: d.quantity
            }
            return reservationDetailsRequest;
          })
        }
  
        this.reservationService.postReservations(reserve).subscribe({
          next: (data) => {
            console.log(this.reservForm.value);
            alert("Reserva creada");
    
            this.reservForm.reset(); 
            this.details.clear();
            this.addDetail();
          },
          error: (e) => {
            console.log(e);
            alert("No se pudo crear la reserva");
          }
        });
      }
    } else {
      alert("Por favor completa el formulario");
    }
  }
}