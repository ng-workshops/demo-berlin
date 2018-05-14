import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
    const user = this.userService.getUser();

    this.form = this.formBuilder.group({
      name: this.formBuilder.control(user.name, Validators.required),
      firstname: this.formBuilder.control(user.firstname),
    });
  }

  search() {
    this.title = this.userService.searchUser(this.form.get('name').value);
  }
}
