import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {faColumns} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {LocalStored} from '@hhangular/store';
import {PeriodicElementService} from './periodic-element.service';

@Component({
  selector: 'app-demo-store',
  templateUrl: './demo-store.component.html',
  styleUrls: ['../../section.scss', 'demo-store.component.scss']
})
export class DemoStoreComponent implements OnInit {

  constructor(private periodicElementService: PeriodicElementService) {
  }

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
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  ngOnInit() {
    this.periodicElementService.getPeriodicElements()
      .subscribe(periodicElements => this.dataSource.data = periodicElements);
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
