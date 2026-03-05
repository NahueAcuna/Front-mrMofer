import { Component } from '@angular/core';
import { Home } from './home/home';
import { Header } from './header-user/header';
import { Footer } from './footer-user/footer';

@Component({
  selector: 'app-public-layout',
  imports: [Home,Header,Footer],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {

}
