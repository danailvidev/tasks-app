import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() vm: any; 
  @Input() task: any;
  @Input() operation: string;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  status: string;
  submitted = false;
  vmCopy: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }


  ngOnInit() {
    this.clearForm();

    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.clearForm();
    });
  }

  onBack() {
    this.location.back();
  }

  onCancel() {
    this.onBack();
  }

  clearForm() {
    let group = {};
    this.vmCopy = Object.assign({}, this.vm);
    this.form = new FormGroup(group);
  }

  onCreate() {
    this.submitted = true;
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  onEdit() {
    this.router.navigate(['../', 'edit'], { relativeTo: this.route });
  }
  
  onSave() {
    this.submitted = true;
    if (this.form.valid) {
      this.status = 'waiting';
      this.update.emit(this.form.value);
    }
  }
}
