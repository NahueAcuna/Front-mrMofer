import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToiletService } from '../../services/toilet-service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-toilet-form',
  imports: [ReactiveFormsModule],
  templateUrl: './toilet-form.html',
  styleUrl: './toilet-form.css',
})
export class ToiletForm implements OnInit{

  toiletForm: FormGroup;
  name: FormControl;
  stock: FormControl;
  active: FormControl;
  details: FormControl;
  price: FormControl;
  id?: number;

  constructor(private toiletService: ToiletService, private route: ActivatedRoute){
    this.name = new FormControl('',[Validators.required, Validators.maxLength(100)]);
    this.price = new FormControl('',[Validators.required, Validators.min(0)]);
    this.stock = new FormControl('',Validators.min(0));
    this.details = new FormControl('',Validators.maxLength(500));
    this.active = new FormControl(true);

    this.toiletForm = new FormGroup({
      name:this.name,
      stock:this.stock,
      price:this.price,
      details: this.details,
      active: this.active
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.toiletService.getById(this.id).subscribe({
        next: (data) => {this.toiletForm.patchValue(data)},
        error: (e) => {console.log(e)}
      })
    }
  }

  sendToilet(){

    if(this.id){
      this.toiletService.put(this.id,this.toiletForm.value).subscribe({
        next: (data) => {console.log(`Baño actualizado: ${data}`)},
        error: (e) => {console.log}
      })
    }else{

      this.toiletService.post(this.toiletForm.value).subscribe({
        next: (data) => {console.log("Baño creado")
          alert("Baño creado")},
        error: (e) => {console.log(e)
          alert("Ya existe un baño con ese nombre")
        }
      })
    }
  }
}
