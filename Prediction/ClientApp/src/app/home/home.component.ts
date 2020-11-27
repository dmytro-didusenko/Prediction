import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomeComponent implements OnInit{

    currentUser: any;

    constructor(private router: Router){
    }

    ngOnInit(){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(this.currentUser != null){
            this.router.navigate(['/user_page']);
        }
    }
}
