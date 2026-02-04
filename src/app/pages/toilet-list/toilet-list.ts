import { Component, OnInit } from '@angular/core';
import { ToiletService } from '../../services/toilet-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toilet-list',
  imports: [],
  templateUrl: './toilet-list.html',
  styleUrl: './toilet-list.css',
})
export class ToiletList implements OnInit {

  constructor(public toiletService : ToiletService, private router: Router){

  }

  ngOnInit(): void {
    this.getToilets()
  }

  getToilets(){
    this.toiletService.getAll().subscribe({
      next: (data) => {this.toiletService.toilets = data},
      error: (e) => {console.log(e)}
    })
  }

  deleteToilet(id: number){
    this.toiletService.delete(id).subscribe({
      next: (data) => {console.log(`Baño eliminado: ${data}`)},
      error: (e) => {console.log(e)}
    })
  }
  putToilet(id: number){
    this.router.navigate(['toilet-form', id]);
  }





}
