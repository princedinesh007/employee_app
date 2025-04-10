import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form:FormGroup;
  isform:boolean=true;
  constructor(public fb:FormBuilder,public userapi:UserServiceService,public router:Router)
  {
     this.form=new FormGroup({
      username:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
     })
  }


  register()
  {
      this.userapi.register(this.form.value).subscribe((res:any)=>{
        if(res)
        {
          this.router.navigate(["/dashboard"]);
          localStorage.setItem("access_token",res.token)
        }
      })
       
       this.form.reset();
    
  }
  login()
  {
   console.log("login")  
  }
  reset()
  {
    this.form.reset();
  }
  toogleForm()
  {
    this.isform=!this.isform;
  }

}
