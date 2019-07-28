import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {faColumns} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {LocalStored} from '../../../../../projects/store/src/public-api';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

@Component({
  selector: 'app-demo-store',
  templateUrl: './demo-store.component.html',
  styleUrls: ['../../section.scss', 'demo-store.component.scss']
})
export class DemoStoreComponent implements OnInit {

  faColumns = faColumns;
  faCheck = faCheckSquare;
  faUncheck = faSquare;

  @LocalStored(7)
  config = {
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['position', 'name', 'weight', 'symbol'],
    pageIndex: 1,
    filter: null
  };

  columns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = this.config.sort.active;
    this.dataSource.sort.direction = this.config.sort.direction as SortDirection;
    this.paginator.pageIndex = this.config.pageIndex;
    this.dataSource.filter = this.config.filter;
  }

  switchColumn(column: string) {
    const index = this.config.displayedColumns.indexOf(column);
    if (index === -1) {
      this.config.displayedColumns.push(column);
      this.config.displayedColumns.sort((a: string, b: string) => {
        return this.columns.indexOf(a) - this.columns.indexOf(b);
      });
    } else {
      this.config.displayedColumns.splice(index, 1);
    }
  }
  sortChange($event: Sort) {
    this.config.sort = $event;
  }

  changePage($event: PageEvent) {
    this.config.pageIndex = $event.pageIndex;
  }

  applyFilter() {
    this.dataSource.filter = this.config.filter.trim().toLowerCase();
  }
}
