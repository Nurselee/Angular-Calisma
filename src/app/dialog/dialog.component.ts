import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public formbuilder:FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editedData :any,
    private dialogRef: MatDialogRef<DialogComponent>) 
     { }
  form!:FormGroup;
  ngOnInit(): void {

    this.form  = this.formbuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName: ['', Validators.required],
      eMail: ['', Validators.required] 
    });
    if(this.editedData){
      this.form.controls['firstName'].setValue(this.editedData.firstName);
      this.form.controls['lastName'].setValue(this.editedData.lastName);
      this.form.controls['userName'].setValue(this.editedData.userName);
      this.form.controls['eMail'].setValue(this.editedData.eMail);
    }
  }

  add(){
    if(!this.editedData){
      if(this.form.valid){
        this.api.postPerson(this.form.value).subscribe({next:(res) =>{alert("Person Information added!");
        this.form.reset();
        this.dialogRef.close();
      },
        error:() => {
        alert("ERROR")
        }   
        })
      }
    }
  
    else{
      this.editData()
    }
    
  }
  editData(){
    this.api.PutPerson(this.form.value, this.editedData.id).subscribe({next:(res) => {alert("Person updated!");
    this.form.reset();
    this.dialogRef.close();
  }})
  }
  
}
