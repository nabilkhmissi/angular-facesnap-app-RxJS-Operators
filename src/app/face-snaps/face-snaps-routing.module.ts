import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FaceSnapListComponent } from "./components/face-snap-list/face-snap-list.component";
import { NewFaceSnapComponent } from "./components/new-face-snap/new-face-snap.component";
import { SingleFaceSnapComponent } from "./components/single-face-snap/single-face-snap.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: NewFaceSnapComponent },
            { path: ':id', component: SingleFaceSnapComponent },
            { path: '', component: FaceSnapListComponent },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FaceSnapsRoutingModule {
}