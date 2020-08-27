import { Component, OnInit, Input } from '@angular/core';
import {ServiceService} from './../service.service';
import { AlertController } from '@ionic/angular';  
import { Observable, of, throwError } from 'rxjs';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  RequiredValidator
}from '@angular/forms'

import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterLink, Router } from '@angular/router';






@Component({
  selector: 'app-sturegister',
  templateUrl: './sturegister.page.html',
  styleUrls: ['./sturegister.page.scss'],
})
export class SturegisterPage implements OnInit {
  @Input() stuData= { password:" ",studno:" " ,confirm:" "}
  constructor(public alertCtrl: AlertController, private router:Router,
    private _serviceService : ServiceService ) { }
  addstu: any = [];

   myform: FormGroup;
  reactiveForm: FormGroup
   password: FormControl;
  confirm= new FormControl;
  studno= new FormControl;


  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.getstu();
    
  }


  getstu(){
    this._serviceService.postLandlord(this.addstu).subscribe((data: any)=>
    {this.addstu=data;
    console.log(this.addstu);
    });
  }

  

  async add() {

     if(this.myform.invalid){

      const alert = await this.alertCtrl.create({  
        header: 'Registration Failed',  
        message: ' please fill in all the fields ',  
        buttons: ['OK'] 
         
      });  
  
      await alert.present();  
      const result = await alert.onDidDismiss();  
      console.log(result);
     } 
else{

this._serviceService.poststu(this.stuData).subscribe(
data =>
console.log(data));

console.log(this.stuData.studno);
console.log(this.stuData.password);
console.log(this.stuData.confirm);

this.router.navigate(['/login1']);



  

const alert = await this.alertCtrl.create({  
  header: 'Registration',  
  message: 'successfully registered.          Please login ',  
  buttons: ['OK'] 
});  

await alert.present();  
const result = await alert.onDidDismiss();  
console.log(result);


}
  }


  createFormControls() {
  
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.confirm = new FormControl('',[
     Validators.required,
     Validators.minLength(8) 
    ]);


    
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
       


    
      }),
    
        password: this.password,
       
        studno: this.studno,
        confirm: this.confirm
       
     
   
    });
  }









/*

  async doSomething() {  
    

    this.stuData= {firstName:" ", lastName:" ",email:" ", password:" ",campus_loc:" ",studno:" " ,id_no:" ",cell_no:" "}
    

    const alert = await this.alertCtrl.create({  
      header: 'Registration',  
      message: 'you are successfully registered',  
      buttons: ['OK'] 
       
    }
   
    


    
    );  





    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);



   


}


*/
}