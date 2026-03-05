import { Component, OnInit } from '@angular/core';
import { ToiletService } from '../../../../services/toilet-service';

@Component({
  selector: 'app-our-products',
  imports: [],
  templateUrl: './our-products.html',
  styleUrl: './our-products.css',
})
export class OurProducts implements OnInit{

  constructor(public toiletService: ToiletService){

  }

  ngOnInit(): void {
    this.getToilets();
    console.log()
  }

  getToilets(){
    this.toiletService.getAll().subscribe({
      next:(data) => {this.toiletService.toilets = data;
        console.log(data)},
      error:(e) => {console.log(e)}
    })
  }
}
