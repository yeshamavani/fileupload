import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fileupload';
  moreInfoFormGroup: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.moreInfoFormGroup = this.formBuilder.group({
      video: [null],
    });
  }

  get f() {
    return this.moreInfoFormGroup.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.moreInfoFormGroup.patchValue({
          file: reader.result,
        });
      };
    }
      if (event.target.files.length > 0) {
        const fileVideo = event.target.files[0];
        this.moreInfoFormGroup.get('video').setValue(fileVideo);
      }
      console.log(this.moreInfoFormGroup.get('video').value);
      console.log(this.f.video.value.name);
    }

    saveVideo() {  
      //get url 

      const url = '';

    const headers = {'ContentType': 'binary/octet-stream'};
    const upload = this.httpClient.put(url, this.f.video.value, {headers}).toPromise();
    upload
      .then(data => {
        console.log('=> ', data);
      })
      .catch(err => console.log('error: ', err));
  }
  
}
