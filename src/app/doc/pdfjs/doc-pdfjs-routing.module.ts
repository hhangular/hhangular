import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocPdfjsComponent} from './doc-pdfjs.component';
import {
  PdfjsConfigComponent, ConfigComponent, PdfjsThumbnailsComponent, InstallationComponent,
  PdfjsControlComponent,
  ThumbnailDragModeComponent, ThumbnailLayoutComponent, ViewFitComponent,
  PdfjsViewComponent, PdfjsGroupControlComponent, PdfjsCommandComponent, PdfPageComponent, OverviewComponent
} from './sections';
import {DemoPdfjsComponent} from './demo/demo-pdfjs.component';

const docRoutes: Routes = [
  {
    path: '', component: DocPdfjsComponent, children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'installation', component: InstallationComponent},
      {path: 'configuration', component: ConfigComponent},
      {path: 'pdfjsview', component: PdfjsViewComponent},
      {path: 'pdfjsthumbnails', component: PdfjsThumbnailsComponent},
      {path: 'pdfjsconfig', component: PdfjsConfigComponent},
      {path: 'pdfjscommand', component: PdfjsCommandComponent},
      {path: 'pdfjscontrol', component: PdfjsControlComponent},
      {path: 'pdfjsgroupcontrol', component: PdfjsGroupControlComponent},
      {path: 'pdfpage', component: PdfPageComponent},

      {path: 'thumbnaildragmode', component: ThumbnailDragModeComponent},
      {path: 'thumbnaillayout', component: ThumbnailLayoutComponent},
      {path: 'viewfit', component: ViewFitComponent},
      {path: 'demo', component: DemoPdfjsComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(docRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DocPdfjsRoutingModule {
}
