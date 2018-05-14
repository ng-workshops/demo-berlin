import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserService } from './app.service';

const userMock = {
  name: 'Unit_Test',
  firstname: 'a'
};

const userServiceMock = new UserService();

userServiceMock.getUser = () => {
  return userMock;
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));

  describe('GIVEN the app is initialized', () => {
    let app: AppComponent;

    beforeEach(() => {
      const fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
      app.ngOnInit();
    });

    describe('WHEN the user clicks the search button', () => {
      it('THEN the title should change', () => {
        expect(app.form.getRawValue()).toEqual(userMock);

        app.search();

        expect(app.title).toBe(userMock.name.toUpperCase());
      });

      it('THEN the title should change', () => {
        app.form.get('name').setValue('Peter');
        app.search();

        expect(app.title).toBe('PETER');

        app.form.get('name').setValue(null);

        expect(app.form.get('name').valid).toBeFalsy();
      });

      it('short way', () => {
        const app2 = new AppComponent(userServiceMock, new FormBuilder());
        app2.ngOnInit();

        expect(app.form.getRawValue()).toEqual(userMock);

        app.search();

        expect(app.title).toBe(userMock.name.toUpperCase());

        app.form.get('name').setValue('Peter');
        app.search();

        expect(app.title).toBe('PETER');

        app.form.get('name').setValue(null);

        expect(app.form.get('name').valid).toBeFalsy();
      });
    });
  });
});
