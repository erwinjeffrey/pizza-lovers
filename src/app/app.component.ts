import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    //initializa firebase when app load
    firebase.initializeApp({
      apiKey: "AIzaSyBv0-cmT328ixHXv2cXcrDRV8z9S9NGzLI",
      authDomain: "ng-recipe-book-6bf67.firebaseapp.com",
    });
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
