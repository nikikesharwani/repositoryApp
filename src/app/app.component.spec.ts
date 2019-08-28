import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RepositoryComponent } from './repository/repository.component';
import { FormsModule } from '@angular/forms';
import { FilterdataPipe } from './pipes/filterdata/filterdata.pipe';
import { HighlighterPipe } from './pipes/highlighter/highlighter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RepositoryService } from './services/repository.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RepositoryComponent,
        FilterdataPipe,
        HighlighterPipe
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [RepositoryService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
