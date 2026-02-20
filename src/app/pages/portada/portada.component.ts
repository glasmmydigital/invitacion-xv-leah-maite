import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TraductorServicio } from '../../Services/traductor.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [],
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss']
})
export class PortadaComponent {
  private cuentaRegresiva: any;

  slideIndex: number = 0;

  constructor(
      public traductorService: TraductorServicio,
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit() {
    const fechaObjetivo = new Date('2026-05-09T13:00:00'); // Cambia esto por la fecha de tu evento

    const actualizarContador = () => {
        if (typeof document !== 'undefined') { // Verificación de entorno
            const ahora = new Date().getTime();
            const distancia = fechaObjetivo.getTime() - ahora;

            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            // Actualizamos el contador visualmente
            document.getElementById('dias')!.innerText = dias.toString();
            document.getElementById('horas')!.innerText = horas.toString();
            document.getElementById('minutos')!.innerText = minutos.toString();
            document.getElementById('segundos')!.innerText = segundos.toString();

            // Cuando el tiempo se acabe, dejamos el contador en 0
            if (distancia < 0) {
                clearInterval(this.cuentaRegresiva);
                document.getElementById('dias')!.innerText = '0';
                document.getElementById('horas')!.innerText = '0';
                document.getElementById('minutos')!.innerText = '0';
                document.getElementById('segundos')!.innerText = '0';
            } else {
                setTimeout(actualizarContador, 1000);
            }
        }
    };

    actualizarContador();
    this.traductorService.lenguaje = "ES";
  }

  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        // Llamar a la función para iniciar el carrusel después de que la vista se haya inicializado
        this.showSlides();
        setInterval(() => {
          this.moveSlide(1);  // Mueve el carrusel cada 3 segundos
        }, 3000);  // Intervalo de 3 segundos
      }
    }

    showSlides(): void {
      const slides = document.querySelectorAll('.carouselImg img') as NodeListOf<HTMLImageElement>;
      if (this.slideIndex >= slides.length) {
        this.slideIndex = 0;
      }
      if (this.slideIndex < 0) {
        this.slideIndex = slides.length - 1;
      }

      // Mueve el carrusel a la posición correcta
      const carousel = document.querySelector('.carouselImg') as HTMLElement;
      carousel.style.transform = `translateX(-${this.slideIndex * 100}%)`;
    }

    moveSlide(step: number): void {
      this.slideIndex += step;
      this.showSlides();
    }

  cambiarIdioma(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.traductorService.lenguaje = isChecked ? 'EN' : 'ES';
  }

}
