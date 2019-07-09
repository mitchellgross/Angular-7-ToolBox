import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: 'stopwatch', component: StopwatchComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'weather', component: WeatherComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
