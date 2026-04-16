import { Component } from '@angular/core';
import { ServicesComponent } from '../services-component/services-component';
import { OurProducts } from '../our-products/our-products';
import { WhyUs } from '../why-us/why-us';
import { Contact } from '../contact/contact';
import { AboutUs } from '../../../public-layout/about-us/about-us';

@Component({
  selector: 'app-home',
  imports: [ServicesComponent,OurProducts,WhyUs,Contact, AboutUs],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
