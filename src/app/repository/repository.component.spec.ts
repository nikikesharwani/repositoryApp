import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';
import { RepositoryService } from '../services/repository.service';
import { FormsModule } from '@angular/forms';
import { FilterdataPipe } from '../pipes/filterdata/filterdata.pipe';
import { HighlighterPipe } from '../pipes/highlighter/highlighter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RepositoryComponent,
        FilterdataPipe,
        HighlighterPipe
       ],
      imports: [
        FormsModule, HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [RepositoryService, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it(`should have as title 'Repository App'`, () => {
    fixture = TestBed.createComponent(RepositoryComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Repository App');
  });

  it('should render title in a h1 tag', () => {
    fixture = TestBed.createComponent(RepositoryComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Repository App');
  });

  it('should disable the go button when username input is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.go_btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the clear button when username input is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.username_clear'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable go button when username is not empty', () => {
    component.username = 'demo';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.go_btn'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should enable clear button when username is not empty', () => {
    component.username = 'demo';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.username_clear'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the clear search button when searchKey input is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.keywords_clear'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable clear search button when searchKey is not empty', () => {
    component.searchKey = 'angular';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.keywords_clear'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should clear searchKey value upon clear search button click', () => {
    component.searchKey = '';
    const inputElement = fixture.debugElement.query(By.css('input[name="searchKey"]')).nativeElement;
    fixture.debugElement
      .query(By.css('.keywords_clear'))
      .triggerEventHandler('click', null);
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(inputElement.value).toEqual(component.searchKey);
    });
  });

  it('should clear searchKey, username and repoNameList value on calling clearUsername', () => {
    component.clearUsername(1);
    expect(component.searchKey).toBe('');
    expect(component.username).toBe('');
    expect(component.repoNameList).toEqual([]);
  });


  it('should get repoNameList from the repository service', async () => {
    component.username = 'demo';
    component.oldUsername = '';
    const fakedFetchedRepNameList = ['angular', 'java'];
    const repositoryService = fixture.debugElement.injector.get(RepositoryService);

    fixture.debugElement.query(By.css('.go_btn')).triggerEventHandler('click', null);
    spyOn(repositoryService, 'getRepos').and.returnValue(
      of(fakedFetchedRepNameList)
    );
    component.repoNameList = ['angular', 'java'];
    component.oldUsername = component.username;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.oldUsername).toBe(component.username);
      expect(component.repoNameList).toEqual(fakedFetchedRepNameList);
    });
  });

  it(`should display angular on searching 'an'`, () => {
    component.repoNameList = ['angular', 'java'];
    fixture.detectChanges();

    const div: HTMLDivElement = fixture.debugElement
      .query(By.css('#repoName'))
      .nativeElement;

    expect(div.textContent.trim()).toBe('angular');
  });

  it('should display empty repository message', () => {
    component.repoNameList = [];
    component.username = 'demo';
    component.reposNotFound = true;
    fixture.detectChanges();

    const span: HTMLDivElement = fixture.debugElement
      .query(By.css('#emptyRepoMsg'))
      .nativeElement;

    expect(span.textContent.trim()).toBe('Empty Repository for demo');
  });

});
