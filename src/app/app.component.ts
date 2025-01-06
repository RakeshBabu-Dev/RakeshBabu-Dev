import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { DashBoardService } from '../dashboard/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,CommonModule], // Add necessary modules here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DashBoardService]
})
export class AppComponent {
  ngOnInit(): void {
  }
}
