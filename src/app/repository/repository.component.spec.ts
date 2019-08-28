import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';
import { RepositoryService } from '../services/repository.service';
import { FormsModule } from '@angular/forms';
import { FilterdataPipe } from '../pipes/filterdata/filterdata.pipe';
import { HighlighterPipe } from '../pipes/highlighter/highlighter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';

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
      providers: [RepositoryService]
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

});
