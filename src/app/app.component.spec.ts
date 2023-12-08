import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule,],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toEqual('repo');
    expect(component.username).toEqual('');
    expect(component.repositories).toEqual([]);
    expect(component.errorMessage).toEqual('');
    expect(component.userInfo).toEqual({});
    expect(component.currentPage).toEqual(1);
    expect(component.itemsPerPage).toEqual(10);
    expect(component.totalItems).toEqual(0);
    expect(component.totalPages).toEqual(0);
    expect(component.visiblePageNumbers).toEqual([]);
    expect(component.pagesToShow).toEqual(5);
    expect(component.loadingProfile).toEqual(false);
    expect(component.loadingRepos).toEqual(false);
    expect(component.dummyArr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should set error message if username is empty on search', () => {
    component.searchRepositories();
    expect(component.errorMessage).toEqual('Please enter a GitHub username.');
  });

  it('should set error message if user not found', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('Not Found', { status: 404 })));

    component.username = 'nonexistentuser';
    await component.searchRepositories();

    expect(component.errorMessage).toEqual('User not found. Please enter a valid GitHub username.');
  });

  

 


  
  it('should load the previous page', () => {
    spyOn(component, 'searchRepositories')
    component.currentPage = 3;
    component.loadPreviousPage();
    expect(component.currentPage).toEqual(2);
    expect(component.searchRepositories).toHaveBeenCalled();
  });

  
  
});
