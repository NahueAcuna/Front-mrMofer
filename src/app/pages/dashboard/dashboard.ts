import { Component, OnInit } from '@angular/core';
import { kpi } from '../../models/Dashboard/kpis';
import { DashboardService } from '../../services/dashboard-service';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MonthlyToiletTypeReserved } from '../../models/Dashboard/MonthlyToiletTypeReserved';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  kpis!: kpi

  // -------------------------------- LINE CHART --------------------------------

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    //maintainAspectRatio: false, // Importante para que respete el alto de tu CSS
    plugins: {
      legend: {
        position: 'bottom', // Mueve la leyenda abajo
        labels: {
          usePointStyle: true, // Hace que los iconos sean circulitos en vez de cuadrados
          boxWidth: 8,
          padding: 20,
          font: { family: 'system-ui, sans-serif', size: 13 }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)' // Dejamos solo el color aquí
        },
        border: {
          dash: [5, 5] // ¡Se mudó acá!
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        border: {
          display: false, // Mantiene la línea sólida del eje Y oculta
          dash: [5, 5]    // ¡Se mudó acá!
        }
      },
      y1: { 
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        }
      }
    }
  };
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: ' Ingresos',
        data: [], 
        yAxisID: 'y',
        borderColor: '#2563eb', 
        backgroundColor: '#2563eb',
        pointBackgroundColor: '#ffffff', 
        pointBorderColor: '#2563eb',     
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // curvas suaves
        borderWidth: 2,
        fill: false
      },
      {
        label: ' Reservas',
        data: [],
        yAxisID: 'y1',
        borderColor: '#ef4444', 
        backgroundColor: '#ef4444',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#ef4444',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        borderWidth: 2,
        fill: false
      }
    ]
  };
  // -------------------------------- DONUT CHART --------------------------------


public donutChartType = 'doughnut' as const;

public donutChartData: ChartConfiguration<'doughnut'>['data'] = {
  labels: [],
  datasets: [
    {
      data: [], 
      backgroundColor: ['#2563eb', '#60a5fa', '#93c5fd'], 
      hoverOffset: 4 // Hace que la porción resalte un poquito al pasar el mouse
    }
  ]
};

// Opciones visuales
public donutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  cutout: '70%', //El tamaño del agujero del medio (70% del radio)
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};

  constructor(private dashboardService: DashboardService){

  }
  ngOnInit(): void {
    this.getKpís();
    this.getRevenueTrends();
    this.getReservations();
    this.getToilettypesReserved();
  }

  getKpís(){
    this.dashboardService.getKpis().subscribe({
      next: (data) => {this.kpis = data
        console.log(data)
      },
      error: (e) => {console.log(e)}
    })
  }
  getRevenueTrends(){
    this.dashboardService.getRevenueTrends().subscribe({
      next:(dataRevenue) => {
        const revenues = new Array(12).fill(0);
        dataRevenue.forEach(r =>{

          // Si el mes es "3" (Marzo), el índice es 2.
          const index = parseInt(r.month) - 1

          revenues[index] = r.revenue;
        })
        this.lineChartData.datasets[0].data = revenues;
        this.lineChartData = { ...this.lineChartData };
      },
      error: (e) => {console.log(e)}
    })
  }
  getReservations(){
    this.dashboardService.getMonthlyReservations().subscribe({
      next: (dataBack) => {
        const reservations = new Array(12).fill(0);
        dataBack.forEach(reserv =>{
          const index = reserv.month - 1;
          reservations[index] = reserv.reservations; 
        })
        console.log(reservations)
        this.lineChartData.datasets[1].data = reservations;
        this.lineChartData = { ...this.lineChartData };
      }
    })
      
    }
    getToiletTypes(){
      this.dashboardService.getToiletTypes().subscribe({
        next:(dataBack) => {
          this.donutChartData.labels = dataBack;
          this.donutChartData = { ...this.donutChartData };
        } 
      })
    }
   
    getToilettypesReserved(){
      this.dashboardService.getToiletTypeReserved().subscribe({
        next: (dataBack) =>{
          dataBack.forEach(t =>{
            const qty = this.donutChartData.labels?.length || 0

            this.donutChartData.labels?.push(t.toiletName)
                this.donutChartData.datasets[0].data.push(t.quantity);
              
              })
              console.log(dataBack)
              this.donutChartData = { ...this.donutChartData };
      },
      error: (e) => {console.log(e)}
    })      
  }
}

