import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/FaceSnap';
import { FaceSnapService } from 'src/app/core/services/face-snap.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  constructor(private faceSnapsService: FaceSnapService, private activatedRouter: ActivatedRoute) { }

  buttonText!: string;
  faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>
  snapId!: number;


  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    this.activatedRouter.paramMap.pipe(
      tap((params: ParamMap) => {
        this.faceSnap$ = this.faceSnapsService.getFaceSnapById(+params.get('id')!);
      }),
    ).subscribe();
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => {
          this.buttonText = 'Oops, unSnap!';
        }
        )
      )
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => {
          this.buttonText = 'Oh Snap!';
        }
        ));
    }
  }

}
