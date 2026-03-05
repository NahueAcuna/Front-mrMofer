import { Component } from '@angular/core';
import { MenuBar } from '../../components/layouts/admin-layout/menu-bar/menu-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MenuBar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
