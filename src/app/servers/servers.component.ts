import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-servers',
  //selector: '[app-servers]', //by attribute
  //selector: '.app-servers', //by class

  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus= 'No server was created';
  serverName='Test Server';
  userName ='';
  serverCreated = false;
  display='inline-block';
  countClick=0;
  clicks =[];
 
   servers = ['hello','maria'] ;

  constructor() {
    setTimeout(()=>{
      this.allowNewServer=true;
    },2000);
  }

  ngOnInit() {}

  onCreateServer(){
    this.serverCreated = true;
   this.servers.push(this.serverName);
    this.serverCreationStatus= 'server was created ' + this.serverName;
  }
  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  displayParagrah(){
    this.clicks.push(this.countClick++);
     if(this.display==='inline-block'){
        this.display='none';
     }else{
       this.display ='inline-block';
     }
  }

  clicksLength(){
   
    return this.clicks.length > 5;
  }




}
