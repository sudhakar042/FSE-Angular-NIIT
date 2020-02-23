import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryTakerComponent } from '../src/app/category-taker/category-taker.component';
import { NotesService } from '../src/app/services/notes.service';
import { CategoryService } from '../src/app/services/category.service';
import { ReminderService } from '../src/app/services/reminder.service';
import { RouterService } from '../src/app/services/router.service';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const testConfig = {
    addCategories: {
      positive: {
       categoryId: 1,
       categoryName: 'IPL',
       categoryDescription: 'Match',
       categoryCreatedBy :'John',
       categoryCreationDate : null
      },
      errorMessage: 'Name is required field'
    },
    error404: {
      message: 'Http failure response for http://localhost:3000/api/v1/categories: 404 Not Found',
      name: 'HttpErrorResponse',
      ok: false,
      status : 404,
      statusText: 'Not Found',
      url: 'http://localhost:3000/api/v1/categories'
    }
  };

describe('CategoryakerComponent', () => {
  let categorTakerComponent: CategoryTakerComponent;
  let fixture: ComponentFixture<CategoryTakerComponent>;
  let categoryService: CategoryService;
  let spyTakeNotes: any;
  let errorResponse404: any;
  let positiveResponse: any = null;
  let errorMessage: string;
  let debugElement: any;
  let element: any;
  let doneButton: any;
  let inputBox: any;
  let textArea: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTakerComponent ],
      imports: [
      FormsModule,
      MatInputModule,
      MatAutocompleteModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
      MatExpansionModule,
      MatGridListModule,
      MatListModule,
      MatStepperModule,
      MatTabsModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatChipsModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatDialogModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      HttpClientModule,
      BrowserAnimationsModule,RouterTestingModule
      ],
      providers: [ NotesService, AuthenticationService,RouterService,CategoryService,ReminderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTakerComponent);
    categorTakerComponent = fixture.componentInstance;
    categoryService = fixture.debugElement.injector.get(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(categorTakerComponent).toBeTruthy();
  });

  it('should handle 404 error on add note', fakeAsync(() => {
    errorResponse404 = testConfig.error404;
    doneButton = fixture.debugElement.nativeElement.querySelector('button');
    inputBox = fixture.debugElement.nativeElement.querySelector('input');
    textArea = fixture.debugElement.nativeElement.querySelector('textarea');
    debugElement = fixture.debugElement.query(By.css('.error-message'));

    spyTakeNotes = spyOn(categoryService, 'addCategory').and.returnValue(Observable.throw(errorResponse404));
    if (inputBox !== null && textArea !== null && doneButton !== null && debugElement !== null) {
      inputBox.value = testConfig.addCategories.positive.categoryName;
      inputBox.dispatchEvent(new Event('input'));
      textArea.value = testConfig.addCategories.positive.categoryDescription;
      textArea.dispatchEvent(new Event('input'));
      doneButton.click();
      tick();
      fixture.detectChanges();
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorResponse404.message,
        `should handle 'error' event of subscribe and assign 'message' property of error to the errorMessage variable`);
    } else {
      expect(false).toBe(true,
        `should have elements input, textarea, button
        and <label class='error-message'>{{ errMessage }}</label> in your category-taker.component.html`);
    }
  }));

   it('should handle blank fields', fakeAsync(() => {
     errorMessage = testConfig.addCategories.errorMessage;
     doneButton = fixture.debugElement.nativeElement.querySelector('button');
     debugElement = fixture.debugElement.query(By.css('.error-message'));
     spyTakeNotes = spyOn(categoryService, 'addCategory').and.returnValue(Observable.of(errorMessage));
     if (doneButton !== null && debugElement !== null) {
       doneButton.click();
       tick();
       fixture.detectChanges();
       element = debugElement.nativeElement;
       expect(element.textContent).toBe(errorMessage,
         `Name is required field`);
     } else {
       expect(false).toBe(true,
         `should have elements button and <label class='error-message'>{{ errMessage }}</label> in your category-taker.component.html`);
     }
  }));

  it('should handle adding of a new note', fakeAsync(() => {
    positiveResponse = testConfig.addCategories.positive;
    doneButton = fixture.debugElement.nativeElement.querySelector('button');
    inputBox = fixture.debugElement.nativeElement.querySelector('input');
    textArea = fixture.debugElement.nativeElement.querySelector('textarea');
    spyTakeNotes = spyOn(categoryService, 'addCategory').and.returnValue(Observable.of(positiveResponse));
    fixture.detectChanges();
    tick();
    if (inputBox !== null && textArea !== null && doneButton !== null) {
      inputBox.value = testConfig.addCategories.positive.categoryName;
      textArea.value = testConfig.addCategories.positive.categoryDescription;
      inputBox.dispatchEvent(new Event('input'));
      textArea.dispatchEvent(new Event('input'));
      doneButton.click();
      tick();
      fixture.detectChanges();
      expect(categoryService.addCategory).toHaveBeenCalled();
    } else {
      expect(false).toBe(true,
       `should have elements input, textarea and button in your category-taker.component.html`);
    }
  }));
});
