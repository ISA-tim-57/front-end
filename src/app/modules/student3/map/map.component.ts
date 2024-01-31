import { AfterViewInit, Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import * as L from 'leaflet';
import { Coordinates } from 'src/app/model/coordinates.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
  private map : any;
  private marker : any;
  
  constructor( private service : Student3Service){}

  private initMap(): void{
    this.map = L.map('map',{
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    this.registerOnClick();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

    
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      new L.Marker([lat, lng]).addTo(this.map);
      
    });
  }

  updateMap(coordinates: Coordinates): void {
    if(coordinates){
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
  
      this.marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(this.map);
      this.map.panTo([coordinates.latitude, coordinates.longitude]);
    }
    
  }



}
