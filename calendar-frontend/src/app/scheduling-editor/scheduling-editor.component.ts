import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { css } from '../../styles';
import { NgClass } from '@angular/common';

const $button = css({
  color: '$onPrimary',
  backgroundColor: '$primary',
});

@Component({
  selector: 'app-scheduling-editor',  
  imports: [NgClass],
  templateUrl: './scheduling-editor.component.html',
  styleUrl: './scheduling-editor.component.scss',
})
export class SchedulingEditorComponent implements OnInit {
  eventId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  lastNavigation = computed(() => {
    return this.router.lastSuccessfulNavigation();
  });

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  close() {
    this.router.navigate([
      {
        outlets: {
          sidebar: null
        }
      }
    ], { relativeTo: this.route.parent });
  }

  onSubmit(){}

  cn = {
    button: $button().className,
  }
}
