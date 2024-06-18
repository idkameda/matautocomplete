import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServService } from '../app/serv.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'autocomplete';

  options = ["Sam", "Varun", "Jasmine"];

  filteredOptions;


  formGroup: FormGroup;
  constructor(private service: ServService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getNames();
  }

  initForm() {
    debugger;
    this.formGroup = this.fb.group({
      'employee': ['']
    })
    this.formGroup.get('employee').valueChanges
      .pipe(debounceTime(1000))
      .subscribe(response => {
        //console.log('data is ', response);
        if (response && response.length) {
          //this.filterData(response);
          let data = JSON.stringify({ 'CrudType': '0', 'SearchText': response })

          this.service.getData(response).subscribe(response => {
            this.filteredOptions = response;
          });
          console.log(this.filteredOptions);
          this.filteredOptions = this.options;
        }
        else {
          this.filteredOptions = [];
        }
      })
  }

  filterData(enteredData) {
    debugger;
    console.log('entered text-', enteredData);
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  getNames() {
    debugger;
    this.service.getData('a').subscribe(response => {
      this.options = response;
      //this.filteredOptions = response;
    })
  }



}
