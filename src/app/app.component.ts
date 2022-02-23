import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularBib';
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'eMail','editDelete'];
  dataSource !: MatTableDataSource<any>;

  
  constructor(public dialog: MatDialog, private api :ApiService) {
    
  }
  ngOnInit(): void {
    this.getData();
  }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'40%'
    });
  }


  getData(){


    this.api.getPerson().subscribe({next:(res)=>{ this.dataSource = new MatTableDataSource(res);}})
  }
 
  editRow(row:any){
    this.dialog.open(DialogComponent,{width:'40%', data:row});
  }

  deletePerson(id:number){
    this.api.deletePerson(id).subscribe({next:(res) => {alert("Deleted!"); this.getData()}});

  }
  
}
