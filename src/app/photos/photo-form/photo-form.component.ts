import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  form: FormGroup;
  file: File;
  preview: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private photoService: PhotoService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: ['', [Validators.maxLength(300)]],
      allowComments: [true],
      file: ['', [Validators.required]]
    });
  }

  submit() {
    const description = this.form.value.description;
    const allowComments = this.form.value.allowComments;
    this.photoService.upload(description, allowComments, this.file).subscribe(() => this.router.navigate(['']));
  }

  handleFile(file: File){
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
