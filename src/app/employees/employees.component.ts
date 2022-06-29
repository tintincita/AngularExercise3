import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  person: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.minLength(2)]],
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    entreprise: ['', [Validators.required, Validators.minLength(2)]],
    telephone: ['', [Validators.required, Validators.minLength(10)]],
  });

  people: any[] = [
    {
      nom: 'Aa',
      prenom: 'Bb',
      email: 'aabb@cc.org',
      entreprise: 'Cc',
      telephone: '0123456789',
    },
  ];

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  addPerson(): void {
    this.people.push(this.person.value);
    this.person.reset();
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.person.valid) {
      this.addPerson();
    } else {
      console.log('Formulaire Invalid');
      console.log(this.person.controls);
    }
  }

  whichError(attName: string): string {
    let temp: string = '';
    if (this.person.controls[attName].hasError('required')) {
      temp += '* obligatoire';
    }
    if (this.person.controls[attName].hasError('minlength')) {
      temp += '* minimum characters ';
      if (attName == 'telephone') {
        temp += '10';
      } else {
        temp += '2';
      }
      //(attName == 'entreprise' ? temp+="10" + temp+="2")
      // I'm not proud of this workaround
    }
    if (this.person.controls[attName].hasError('email')) {
      temp += '* invalid email address';
    }
    return temp;
  }
}
