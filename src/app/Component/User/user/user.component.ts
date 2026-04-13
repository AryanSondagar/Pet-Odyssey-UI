import { Component, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { Course } from 'src/app/Model/course.model';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';
import { AdoptionForm } from 'src/app/Model/adoption.model';

declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss',
    './../../../../assets/css/bootstrap.css',
    './../../../../assets/css/responsive.css',
    './../../../../assets/css/style.css',
    './../../../../assets/css/style.scss'
  ],
})
export class UserComponent implements AfterViewInit, OnDestroy {
  userName: string = '';
  menutype: string = 'defult';
  buttonClicked = false;
  adopt: any;
  Product: MarketplaceForm[] = [];
  seminars: Course[] = [];
  selectedCourse?: Course;
  selectedProduct?: MarketplaceForm;
  selectedPet?: AdoptionForm;

  private scrollHandler: (() => void) | null = null;

  constructor(
    private route: Router,
    private courseService: AdminCourseService,
    private adoptService: AdminAdoptionService,
    private ProductService: AdminMarketplaceService,
    private ngZone: NgZone
  ) {
    this.menutype = localStorage.getItem('user') ? 'user' : 'defult';
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data: any) => { this.seminars = data.data; });
    this.ProductService.getAllProduct().subscribe((data: any) => { this.Product = data.products; });
    this.adoptService.getAllAdoptionPet().subscribe((data: any) => { this.adopt = data.data; });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initGSAP();
        this.initBackToTop();
      }, 150);
    });
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  // ── Back to Top ──────────────────────────────────────────────────────────
  private initBackToTop(): void {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    this.scrollHandler = () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Navbar scroll shrink ────────────────────────────────────────────────
  private initNavScroll(): void {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  }

  // ── GSAP Master Init ────────────────────────────────────────────────────
  private initGSAP(): void {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Fallback: just show elements
      document.querySelectorAll('[class*="gsap-"]').forEach((el: any) => {
        el.style.opacity = '1'; el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    this.initNavScroll();
    this.animateHero();
    this.animateStats();
    this.animateSections();
    this.animateAbout();
    this.animateProducts();
    this.animateServices();
    this.animatePricing();
    this.animatePets();
    this.animateGallery();
    this.animateTestimonials();
    this.animateCTA();
  }

  // ── Hero ─────────────────────────────────────────────────────────────────
  private animateHero(): void {
    const tl = gsap.timeline({ delay: 0.1 });
    document.querySelectorAll('.gsap-fade-up').forEach((el: any) => {
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      tl.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, delay);
    });

    gsap.to('#hero-parallax', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // ── Stats — Glassmorphic Cards + Counters ───────────────────────────────
  private animateStats(): void {
    gsap.to('.gsap-stat', {
      opacity: 1, y: 0, stagger: 0.15, duration: 0.8,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '#stats-bar', start: 'top 85%' }
    });

    document.querySelectorAll('.stat-num').forEach((el: any) => {
      const end = parseInt(el.getAttribute('data-count') || '0', 10);
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: end, duration: 2.8, ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val).toLocaleString();
            }
          });
        }
      });
    });
  }

  // ── Section Heads ───────────────────────────────────────────────────────
  private animateSections(): void {
    document.querySelectorAll('.gsap-section-head').forEach((el: any) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });
  }

  // ── About Section — Parallax + Stagger ──────────────────────────────────
  private animateAbout(): void {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#about-visual', start: 'top 78%' }
    });
    tl.from('#about-visual', { opacity: 0, x: -70, duration: 1, ease: 'power3.out' })
      .from('#about-txt', { opacity: 0, x: 70, duration: 1, ease: 'power3.out' }, '-=0.7')
      .from('#afeat-0, #afeat-1, #afeat-2', {
        opacity: 0, x: 30, stagger: 0.15, duration: 0.65, ease: 'back.out(1.2)'
      }, '-=0.4');

    // Parallax on about image
    gsap.to('#about-img-parallax', {
      yPercent: -16, ease: 'none',
      scrollTrigger: { trigger: '.about-sec', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // Badge entrance with bounce
    gsap.from('#av-badge', {
      scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2.5)',
      scrollTrigger: { trigger: '#about-visual', start: 'top 75%' }
    });
  }

  // ── Product Cards ───────────────────────────────────────────────────────
  private animateProducts(): void {
    gsap.to('.gsap-product-card', {
      opacity: 1, y: 0, stagger: 0.12, duration: 0.8,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: '.products-sec', start: 'top 78%' }
    });
  }

  // ── Service Cards ───────────────────────────────────────────────────────
  private animateServices(): void {
    gsap.to(['#svc-0', '#svc-1', '#svc-2'], {
      opacity: 1, y: 0, stagger: 0.18, duration: 0.85,
      ease: 'back.out(1.3)',
      scrollTrigger: { trigger: '.svcs-grid', start: 'top 78%' }
    });
  }

  // ── Pricing Cards ───────────────────────────────────────────────────────
  private animatePricing(): void {
    gsap.from('#sched-chips', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#sched-chips', start: 'top 85%' }
    });

    gsap.to(['#pc-0', '#pc-1', '#pc-2'], {
      opacity: 1, y: 0, stagger: 0.2, duration: 0.9,
      ease: 'back.out(1.3)',
      scrollTrigger: { trigger: '.pricing-grid', start: 'top 82%' }
    });
  }

  // ── Pet Cards ───────────────────────────────────────────────────────────
  private animatePets(): void {
    gsap.to('.gsap-pet-card', {
      opacity: 1, y: 0, stagger: 0.12, duration: 0.8,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: '.adoption-sec', start: 'top 78%' }
    });
  }

  // ── Gallery ─────────────────────────────────────────────────────────────
  private animateGallery(): void {
    const items = ['#gm-0', '#gm-1', '#gm-2', '#gm-3', '#gm-4', '#gm-5'];
    gsap.to(items, {
      opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery-mosaic', start: 'top 80%' }
    });
  }

  // ── Testimonials ────────────────────────────────────────────────────────
  private animateTestimonials(): void {
    gsap.to(['#testi-0', '#testi-1', '#testi-2'], {
      opacity: 1, y: 0, stagger: 0.18, duration: 0.9,
      ease: 'back.out(1.3)',
      scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' }
    });
  }

  // ── CTA ─────────────────────────────────────────────────────────────────
  private animateCTA(): void {
    gsap.from('#cta-body', {
      opacity: 0, y: 60, scale: 0.95, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#cta-sec', start: 'top 80%' }
    });
  }

  // ── Helpers ─────────────────────────────────────────────────────────────
  getImageUrl(img: any): string {
    return `http://localhost:3000/${img.replace(/\\/g, '/')}`;
  }

  productDetail(Product: MarketplaceForm) {
    if (!Product._id) return;
    this.ProductService.getProductById(Product._id).subscribe({
      next: (res: any) => { this.selectedProduct = res.product; this.route.navigate(['/product', res.product._id]); },
      error: (err) => console.error(err),
    });
  }

  selectSeminar(seminar: Course) {
    if (!seminar._id) return;
    this.courseService.getCourseById(seminar._id).subscribe({
      next: (res: any) => { this.selectedCourse = res.data; this.route.navigate(['/training', res._id]); },
      error: (err) => console.error(err),
    });
  }

  adoptPet(pet: AdoptionForm) {
    this.route.navigate(['/pet-detail', pet._id]);
  }
}
