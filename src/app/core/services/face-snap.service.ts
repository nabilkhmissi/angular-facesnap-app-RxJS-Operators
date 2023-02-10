import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/FaceSnap';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapService {

  constructor(private http: HttpClient) { }

  faceSnaps: FaceSnap[] = [];

  getFaceSnapById(facesnapId: number): Observable<FaceSnap> {
    /* const faceSnap: any = this.faceSnaps.find(facesnap => facesnap.id === facesnapId);
    if (!faceSnap) {
      throw new Error('Facesnap not found!');
    }
    */
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${facesnapId}`);
  }

  getAllFacesnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  snapFaceSnapById(faceSnapId: number, snapTpe: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map((faceSnap: FaceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapTpe === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
    )
  }

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, localisation?: string }): Observable<FaceSnap> {
    /* const facesnap: FaceSnap = {
      ...formValue,
      createdDate: new Date(),
      snaps: 0,
      id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
    }
    this.faceSnaps.push(facesnap) */
    return this.getAllFacesnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      map(previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id + 1
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap))
    )
  }
}
