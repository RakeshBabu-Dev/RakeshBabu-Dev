import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Root component
import { provideRouter, Routes } from '@angular/router'; // Routing
import { importProvidersFrom } from '@angular/core'; // For importing HttpClientModule
import { HttpClientModule } from '@angular/common/http'; // HTTP client
import { DashboardComponent } from './dashboard/dashboard.component'; // Dashboard
import { LoginComponent } from './login/login.component'; // Login
import { RegisterComponent } from './register/register.component'; // Register
import { AuthGuard } from '../core/services/authGurad.service'; // Auth Guard

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Authenticated route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'public',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { allowPublic: true } // Public access allowed
  },
];


// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Routing configuration
    importProvidersFrom(HttpClientModule), // Im making this to available globally in our application
  ],
}).catch((err) => console.error(err));


// NOTE : Im using routes here because my application wil be in smaller size
