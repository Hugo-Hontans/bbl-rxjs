import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MatMenuModule, MatButtonModule]
})
export class AppComponent {

  constructor(private router: Router) {}

  navigate(url: string): void {
    this.router.navigate([`./${url}`]);
  }
}
