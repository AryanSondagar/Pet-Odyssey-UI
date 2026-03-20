import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserLogin, UserSign } from 'src/app/Model/userSignin.model';
import { UserService } from 'src/app/Services/user.service';

declare var gsap: any;

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss'],
})
export class UserloginComponent implements AfterViewInit {
  @ViewChild('portalCard') portalCard!: ElementRef;

  passwordValue: string = '';
  emailValue: string = '';
  nameValue: string = '';
  faEnvelope = faEnvelope;
  lock = faLock;
  user = faUser;
  authError: String = '';
  isSignup: boolean = false;
  showPwd: boolean = false;

  get passwordStrength(): number {
    const v = this.passwordValue;
    if (!v) return 0;
    let score = 0;
    if (v.length >= 6)  score += 30;
    if (v.length >= 10) score += 25;
    if (/[A-Z]/.test(v)) score += 20;
    if (/[0-9]/.test(v)) score += 15;
    if (/[^A-Za-z0-9]/.test(v)) score += 10;
    return Math.min(score, 100);
  }

  constructor(private User: UserService, private route: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.User.RealoadUser();
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.initPortalAnimations(), 80);
    });
  }

  private initPortalAnimations(): void {
    if (typeof gsap === 'undefined') return;

    // Card entrance is handled by CSS; add mouse-tilt for desktop
    const card = this.portalCard?.nativeElement;
    if (!card) return;

    const stage = card.closest('.portal-stage');
    if (!stage) return;

    stage.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(card, {
        rotateY: dx * 5,
        rotateX: -dy * 5,
        transformPerspective: 900,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    stage.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    });
  }

  switchMode(signup: boolean): void {
    this.isSignup = signup;
    this.emailValue = '';
    this.passwordValue = '';
    this.nameValue = '';
    this.authError = '';
    this.showPwd = false;
  }

  SignUp(data: UserSign): void {
    data.role = 'User';
    this.User.UserSignUp(data);
  }

  Login(email: string, password: string, role: 'user' | 'admin') {
    this.User.RoleBasedLogin(email, password);
    this.User.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password is incorrect';
      }
    });
  }
}
