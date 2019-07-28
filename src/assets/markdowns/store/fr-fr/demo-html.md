```html
<div class="mat-elevation-z8">
  <div class="container">
    <mat-form-field>
      <input matInput [(ngModel)]="config.filter" (keyup)="applyFilter()" placeholder="Filter">
    </mat-form-field>
    <div class="flex-spacer"></div>
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <fa-icon [icon]="faColumns" size="lg"></fa-icon>
    </button>
  </div>
  <table mat-table [dataSource]="dataSource" matSort (matSortChange)="sortChange($event)">

    <!-- Position Column -->
    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> No.</th>
      <td mat-cell *matCellDef="let element"> {{element.position}} </td>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Name</th>
      <td mat-cell *matCellDef="let element"> {{element.name}} </td>
    </ng-container>

    <!-- Weight Column -->
    <ng-container matColumnDef="weight">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Weight</th>
      <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
    </ng-container>

    <!-- Symbol Column -->
    <ng-container matColumnDef="symbol">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Symbol</th>
      <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="config.displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: config.displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons (page)="changePage($event)"></mat-paginator>
</div>
<mat-menu #menu="matMenu">
  <button mat-menu-item *ngFor="let column of columns" (click)="switchColumn(column)">
    <fa-icon [icon]="config.displayedColumns.includes(column)?faCheck:faUncheck" size="lg">
    </fa-icon>&nbsp;&nbsp;{{column}}
  </button>
</mat-menu>
```
