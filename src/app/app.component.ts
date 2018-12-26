import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  loadedFeature = 'recipe';
  
  ngOnInit(){
    //initializa firebase when app load
    firebase.initializeApp({
      apiKey: "AIzaSyBXbA4sCg6ZvLn36IC7WprXOh-9oiyvDgc",
      authDomain: "udemy-ng-http-2e0b2.firebaseapp.com",
    });
  }
  onNavigate(feature:string){
      this.loadedFeature=feature;
  }

}
