import { Component, OnInit, ViewChild } from '@angular/core';
import { Student3Service } from '../student3.service';
import { Coordinates } from 'src/app/model/coordinates.model';
import { MapComponent } from '../map/map.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-location-simulator',
  templateUrl: './location-simulator.component.html',
  styleUrl: './location-simulator.component.css'
})
export class LocationSimulatorComponent{

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(private service : Student3Service){}

  isSimulationStarted : boolean = false;
  refreshRate : number = 5;

  intervalId : any;

  rateForm : FormGroup = new FormGroup({
    rate : new FormControl(5,[Validators.required,Validators.min(1.0)])
  })
  
  ngOnInit(): void {
    
    
  }


  letsGo(){
    this.intervalId = setInterval(() => {
      this.executeMethod();
    }, this.refreshRate * 1000);
  }

  executeMethod(): void {
    this.service.getCoordinates().subscribe({
      next : (result : Coordinates) =>{
        this.mapComponent.updateMap(result);

      }
    })
  }

  startSimulation(){
    this.isSimulationStarted = true;
    this.letsGo();
  }

  stopSimulation(){
    this.isSimulationStarted = false;
    clearInterval(this.intervalId);
  }

  setRefreshRate(){
    this.refreshRate = this.rateForm.value.rate;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.executeMethod();
    }, this.refreshRate * 1000);

  }
 


}
