import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-selector-menu',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './selector-menu.component.html',
  styleUrl: './selector-menu.component.scss'
})
export class SelectorMenuComponent {
  constructor(private router: Router, private route: ActivatedRoute){}

}
