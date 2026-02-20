import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TraductorServicio } from '../../Services/traductor.service';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent implements OnInit, OnDestroy{
  private currentIndex = 0;
  private autoSlideInterval: any;
  private slides!: NodeListOf<Element>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public traductorService: TraductorServicio) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.slides = document.querySelectorAll('.galeriaFotosBoda-slide');
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
    }
  }

  private showSlide(index: number): void {
    if (isPlatformBrowser(this.platformId)) {
      this.slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
  }

  private nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  }

  private startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.autoSlideInterval = setInterval(() => this.nextSlide(), 6000);
    }
  }

  private stopAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
