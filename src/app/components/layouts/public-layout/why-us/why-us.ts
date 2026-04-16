import { AfterViewInit, Component, OnInit } from '@angular/core';
import Aos from 'aos';
import AOS from 'aos';

@Component({
  selector: 'app-why-us',
  imports: [],
  templateUrl: './why-us.html',
  styleUrl: './why-us.css',
})
export class WhyUs implements AfterViewInit{

  ngAfterViewInit() {
 
    setTimeout(() => {

      AOS.init({
        duration: 800, 
        once: true,  
        offset: 100    
      });
    })
  }
}
