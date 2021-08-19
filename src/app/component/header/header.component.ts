import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tab: string;

  constructor() { }

  ngOnInit() {
  }
  
  onClick(check){

    if(check==1){
      this.tab = 'tab1';
    }else if(check==2){
      this.tab = 'tab2';
    }else if(check==3){
      this.tab = 'tab3';
    }else if(check==4){
      this.tab = 'tab4';
    }else if(check==5){
      this.tab = 'tab5';
    }else{
      this.tab = 'tab6';
    }    
    }



}
