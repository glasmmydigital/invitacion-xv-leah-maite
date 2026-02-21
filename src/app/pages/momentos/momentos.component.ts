import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraductorServicio } from '../../Services/traductor.service';

@Component({
  selector: 'app-momentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './momentos.component.html',
  styleUrls: ['./momentos.component.scss'],
})
export class MomentosComponent implements AfterViewInit {
  @ViewChild('track') track!: ElementRef<HTMLDivElement>;

  readonly carouselImages = [
    '1.jpeg',
    '2.jpeg',
    '4.jpeg',
    '5.jpeg',
    '6.jpeg',
    '7.jpeg',
    '9.jpeg',
    '10.jpeg',
    '11.jpeg',
  ];

  constructor(public traductorService: TraductorServicio) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMarquee();
    }, 100);
  }

  private initMarquee(): void {
    const trackEl = this.track.nativeElement;

    const totalWidth = trackEl.scrollWidth / 2;

    if (totalWidth > 0) {
      trackEl.style.setProperty('--marquee-width', `-${totalWidth}px`);
    }
  }
}