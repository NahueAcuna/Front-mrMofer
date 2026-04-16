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
