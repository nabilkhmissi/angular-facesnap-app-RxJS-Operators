import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FaceSnapService } from 'src/app/core/services/face-snap.service';
import { FaceSnap } from 'src/app/core/models/FaceSnap';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private faceSnapService: FaceSnapService,
    private router: Router) { }

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>

  ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      location: [null]
    }, {
      updateOn: 'blur'
    });
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map((formValue: any) => ({
        ...formValue,
        createdDate: new Date(),
        id: 0,
        snaps: 0
      }))
    );
  }

  onSubmitForm() {
    this.faceSnapService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => {
        this.router.navigateByUrl('/facesnaps')
      })
    ).subscribe();

  }

}
