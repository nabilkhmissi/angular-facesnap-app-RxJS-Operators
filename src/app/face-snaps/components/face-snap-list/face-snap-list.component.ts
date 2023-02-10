import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/FaceSnap';
import { FaceSnapService } from 'src/app/core/services/face-snap.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.css']
})
export class FaceSnapListComponent{

  constructor(private faceSnapsService: FaceSnapService) { }

  faceSnaps$: Observable<FaceSnap[]> = this.faceSnapsService.getAllFacesnaps();;

}
