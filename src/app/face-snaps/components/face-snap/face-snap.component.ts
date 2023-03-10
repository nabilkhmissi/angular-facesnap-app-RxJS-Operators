import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from 'src/app/core/models/FaceSnap';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

  constructor(private router : Router) { }
  
  buttonText!: string;
  @Input() faceSnap!: FaceSnap;


  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
  }
  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
}
}
