import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss',
})
export class AdoptionListComponent implements OnInit {
  // list: AdoptionForm[]=[] ;
  displayedColumns: string[] = ['petName', 'petCategory', 'petBreed', 'petAge', 'delete'];
  dataSource!: MatTableDataSource<AdoptionForm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private adoptionService: AdminAdoptionService , private alert: AlertService) {

  }
  ngOnInit(): void {
    this.getAllAdoptionList();
  }
  getAllAdoptionList() {
    this.adoptionService.getAllAdoptionPet().subscribe((res) => {
      console.log(res);
      // this.list = res ;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }
  onDelete(row: any) {
    this.adoptionService.deleteAdoption(row.id).subscribe({
      next: () => {
        this.alert.ShowDelete('Pet Adoption Deleted Successfully!');
        this.dataSource.data = this.dataSource.data.filter(c => c.id !== row.id);
      },
      error: err => {
        console.error('Delete failed:', err);
      }
    });
  }


}
