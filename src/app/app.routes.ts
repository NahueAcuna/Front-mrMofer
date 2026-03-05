import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ToiletForm } from './pages/toilet-form/toilet-form';
import { ToiletList } from './pages/toilet-list/toilet-list';
import { PublicLayout } from './components/layouts/public-layout/public-layout';
import { Reservs } from './pages/reservs/reservs';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inventory } from './pages/inventory/inventory';


export const routes: Routes = [
    {path:'',component: PublicLayout},
    {path:'admin',component: Home, children:[
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path:'dashboard',component: Dashboard},
        {path:'reservs',component: Reservs},
        {path:'inventory',component: Inventory}
    ]},
    {path:'toilet-form',component: ToiletForm},
    {path:'toilet-list',component: ToiletList},
    {path:'toilet-form/:id', component: ToiletForm}
];
