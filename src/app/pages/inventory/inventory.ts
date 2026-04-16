import { Component, OnInit } from '@angular/core';
import { ToiletService } from '../../services/toilet-service';
import { Toilet } from '../../models/toilet';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs'; 
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit{

  principalImgFile: File | null = null
  detailImagesFiles: File[] = []

  isUpdating: boolean = false;

  inventory : Toilet[] = []
  toiletForm: FormGroup;
  name: FormControl;
  stock: FormControl;
  details: FormControl; 
  qualities: FormArray<FormControl<string | null>>;
  price: FormControl ;
  principalImg: FormControl;
  images: FormControl<string[] | null>;
  active: FormControl;

  constructor(private toiletService : ToiletService, private http: HttpClient, private router: Router){

    this.name = new FormControl('',Validators.required)
    this.stock = new FormControl('',Validators.required)
    this.details = new FormControl('',Validators.required)
    this.qualities = new FormArray<FormControl<string | null>>([],Validators.required)
    this.price = new FormControl('',Validators.required)
    this.principalImg = new FormControl('')
    this.images = new FormControl([])
    this.active = new FormControl(true,Validators.required)

    this.toiletForm = new FormGroup({
      name: this.name,
      stock: this.stock,
      details: this.details,
      imgURL: this.principalImg,
      images: this.images,
      price: this.price,
      qualities: this.qualities,
      active: this.active
    })

  }
  ngOnInit(): void {
    this.getInventory()
  }
  getInventory(){
    this.toiletService.getAll().subscribe({
      next: (data) => {this.inventory = data},
      error: (e) => {console.log(e)}
    })
  }
  putQualitiesVisualisation(qualitie: string){
    if(qualitie.trim()!==''){

      this.qualities.push(new FormControl(qualitie.trim()));
      console.log(this.qualities)
    }
  }
  deleteQualitie(index: number){
    this.qualities.removeAt(index)
  }
  deleteToilet(id: number){
    this.toiletService.delete(id).subscribe({
      next:(data) => {console.log(data)
        this.getInventory()
      },
      error:(e) => {console.log(e)}
    })
  }
  
 saveToilet() {
   
    console.log('1. Iniciando subida masiva a Cloudinary...');

    // Armo lista de tareas (Peticiones HTTP) para forkJoin
    const tareasDeSubida = [];

    // La Tarea 0 siempre será subir la foto principal
    tareasDeSubida.push(this.subirFotoACloudinary(this.principalImgFile!));

    // Recorremos el array de fotos de la galería y agregamos una tarea por cada una
    if (this.detailImagesFiles && this.detailImagesFiles.length > 0) {
      for (let i = 0; i < this.detailImagesFiles.length; i++) {
        tareasDeSubida.push(this.subirFotoACloudinary(this.detailImagesFiles[i]));
      }
    }

    //  Ejecutamos todas las tareas en paralelo con forkJoin
    forkJoin(tareasDeSubida).subscribe({
      next: (respuestasDeCloudinary: any[]) => {
        // forkJoin nos devuelve un array de respuestas en el mismo orden que le dimos las tareas
        
        // Como la Tarea 0 era la portada, la respuesta 0 es la URL de la portada
        const imgUrlCloudinary = respuestasDeCloudinary[0].secure_url;
        console.log(imgUrlCloudinary)
        // Las demás respuestas son de la galería
        const urlsGaleria: string[] = [];
        for (let i = 1; i < respuestasDeCloudinary.length; i++) {
          urlsGaleria.push(respuestasDeCloudinary[i].secure_url);
        }

        // Parcheamos el formulario.
        this.toiletForm.patchValue({
          imgURL: imgUrlCloudinary,
          images: urlsGaleria 
        });

        // Mandamos todo al backend
        this.toiletService.post(this.toiletForm.value).subscribe({
          next: (data) => {
          
            this.toiletForm.reset();
            this.qualities.clear();
            // Limpio las variables
            this.principalImgFile = null;
            this.detailImagesFiles = []; 

            this.getInventory()
          },
          error: (e) => { console.log('Error en Spring Boot:', e)
            alert('Ya existe un baño con ese nombre')
           }
        });
      },
      error: (e) => {
        console.error('Error: Falló la subida de alguna foto a Cloudinary', e);
        alert('Hubo un error al subir las imágenes. Revisá tu conexión.');
      }
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0]; 
    if (file) {
      if (file.type.startsWith('image/')) {
        this.principalImgFile = file;
        console.log("¡Foto lista para viajar a Cloudinary!", this.principalImgFile?.name);
      } else {
        alert('Por favor, subí solo archivos de imagen (JPG, PNG, etc).');
      }
    }
  }
  onMultipleFilesSelected(event: any) {
    const files = event.target.files; 
    
    if (files && files.length > 0) {
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        
        if (file.type.startsWith('image/')) {
          this.detailImagesFiles.push(file);
          console.log("¡Foto de galería atrapada!", file.name);
        } else {
          
          alert(`El archivo "${file.name}" no es una imagen. Por favor, subí solo JPG, PNG, etc.`);
        }
      }
      console.log(`Total de fotos en la galería listas para Cloudinary: ${this.detailImagesFiles.length}`);
    }
  }
  
  subirFotoACloudinary(file: File) {
    const urlCloudinary = 'https://api.cloudinary.com/v1_1/dayb9iggz/image/upload';

    const paqueteDeDatos = new FormData();
    paqueteDeDatos.append('file', file);
    paqueteDeDatos.append('upload_preset', 'mrMofer_preset');

    return this.http.post(urlCloudinary, paqueteDeDatos);
  }
  putToilet(id: number){
    this.toiletService.getById(id).subscribe({
      next: (data) => {this.toiletForm.patchValue(data)},
      error: (e) => {console.log(e)}
    })
  }
  toiletVisibilityStatus(id: number, status: boolean){
    const newStatus = !status; 
    this.toiletService.patch(id,newStatus).subscribe({
      next:(data) => {console.log(data)
        this.getInventory()
      },
      error:(e) => {console.log(e)}
    })
  }
  

}
