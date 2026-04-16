import { AfterViewInit, Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-services-component',
  imports: [],
  templateUrl: './services-component.html',
  styleUrl: './services-component.css',
})
export class ServicesComponent implements AfterViewInit {

  ngAfterViewInit(){
    
    setTimeout(() => {
      AOS.init({
              duration: 800, 
              once: true,  
              offset: 100    
            });
    })
  }
}
