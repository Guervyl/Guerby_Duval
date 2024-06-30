import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { "path": "", component: TareasComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { "path": "login", component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
