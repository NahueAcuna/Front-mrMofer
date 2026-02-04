import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ToiletForm } from './pages/toilet-form/toilet-form';
import { ToiletList } from './pages/toilet-list/toilet-list';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'toilet-form',component:ToiletForm},
    {path:'toilet-list',component:ToiletList},
    {path:'toilet-form/:id', component:ToiletForm}
];
