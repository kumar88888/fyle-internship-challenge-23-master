import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template:`
  <div class="flex flex-col">
  <div class="flex flex-col items-center justify-start">
  <h1 class="text-4xl font-bold mb-8">GitHub Repository Search</h1>
  
  <div class="mb-4">
    <label for="username" class="block text-sm font-medium text-gray-600 mb-2">GitHub Username:</label>
    <div class="flex">
      <input type="text" id="username" [(ngModel)]="username" class="p-2 border rounded-md focus:outline-none focus:border-indigo-500" />
      <button (click)="$event.preventDefault();searchRepositories()" class="ml-4 px-4 py-2 bg-black text-white rounded-md focus:outline-none hover:bg-blue-700">Search Repositories</button>
    </div>
  </div>
</div>

<div *ngIf="errorMessage" class="text-red-500 font-bold text-2xl text-center m-auto">
  {{ errorMessage }}
</div>
<div *ngIf="userInfo.login">
<h2 class="text-xl font-bold mb-4 text-center">Repositories for {{ userInfo.name }}:</h2>


  <div class="flex flex-col justify-center items-center h-[20%]">
    <div class="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
        <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
            <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' class="absolute flex h-32 w-full justify-center rounded-xl bg-cover"> 
            <div class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img class="h-full w-full rounded-full" src={{userInfo.avatar_url}} alt="user Image" />
            </div>
        </div> 
        <div class="mt-16 flex flex-col items-center">
            <h4 class="text-xl font-bold text-navy-700 dark:text-white">
            {{userInfo.name}}
            </h4>
            <p class="text-base font-normal text-gray-600">{{userInfo.location}}</p>
        </div> 
        <div class="flex flex-col ">
            <h4 class="text-xl font-bol text-black ">Bio</h4>
            <p class="text-base font-normal text-gray-600">{{userInfo.bio}}</p>
        </div>

        <div class="mt-6 mb-3 flex gap-14 md:!gap-14">
            <div class="flex flex-col items-center justify-center">
            <p class="text-2xl font-bold text-navy-700 dark:text-white">{{userInfo.public_repos}}</p>
            <p class="text-sm font-normal text-gray-600">Public Repos</p>
            </div>
            <div class="flex flex-col items-center justify-center">
            <p class="text-2xl font-bold text-navy-700 dark:text-white">
                {{userInfo.followers}}
            </p>
            <p class="text-sm font-normal text-gray-600">Followers</p>
            </div>
            <div class="flex flex-col items-center justify-center">
            <p class="text-2xl font-bold text-navy-700 dark:text-white">
                {{userInfo.following}}
            </p>
            <p class="text-sm font-normal text-gray-600">Following</p>
            </div>
        </div>
        <div>
            <a href="https://twitter.com/{{userInfo.twitter_username}}" target="_blank" *ngIf="userInfo.twitter_username" class="text-blue-500">
                https://twitter.com/{{userInfo.twitter_username}}
            </a>
        </div>
    </div>    
</div>
</div>
  
<div *ngIf="loadingProfile">

<div class="h-[450px] w-[400px] m-auto text-center  animate-pulse bg-slate-200">

</div>
</div>

<div *ngIf="loadingRepos">
<div class="flex flex-1 max-w-4xl mx-auto p-10">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
    <div *ngFor="let num of dummyArr">
    <div class="bg-slate-300 h-[280px] w-[250px] animate-pulse">
    </div>
    </div>
  </div>
</div>
</div>
 

<div *ngIf="repositories.length > 0">
<diV class="text-black text-center text-6xl font-bold">
  repositories
</diV>
<div class="flex flex-1 max-w-4xl mx-auto p-10">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
    <div *ngFor="let repo of repositories" class="relative flex flex-col mt-6 text-black bg-white shadow-md bg-clip-border rounded-xl">
      <div class="p-6">
        <a href={{repo.html_url}}>
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
            {{repo.name}}
          </h5>
        </a>
        <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-center">
          {{repo.description}}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-2 p-6">
        <div *ngFor="let language of repo.languages | keyvalue" class="bg-black text-center text-white p-1 rounded-md">
          {{language.key}}
        </div>
      </div>
    </div>
  </div>
</div>




  <!-- Pagination Component (replace with your actual pagination component) -->
  <div class="mt-8 flex justify-center items-center">
  <button (click)="loadPage(1)" class="bg-black text-white px-4 py-2 rounded-md mx-2 enabled:hover:border-gray-400 disabled:opacity-75" [disabled]="currentPage === 1">First</button>
  <button (click)="loadPreviousPage()" class="bg-black text-white px-4 py-2 rounded-md mx-2 enabled:hover:border-gray-400 disabled:opacity-75" [disabled]="currentPage === 1">Previous</button>

  <!-- Display limited page numbers -->
  <ng-container *ngFor="let page of visiblePageNumbers">
    <button (click)="loadPage(page)" class="bg-black text-white px-4 py-2 rounded-md mx-2 enabled:hover:border-gray-400 disabled:opacity-75" [disabled]="currentPage === page">{{ page }}</button>
  </ng-container>

  <button (click)="loadNextPage()" class="bg-black text-white px-4 py-2 rounded-md mx-2 enabled:hover:border-gray-400 disabled:opacity-75" [disabled]="currentPage * itemsPerPage >= totalItems">Next</button>
  <button (click)="loadPage(totalPages)" class="bg-black text-white px-4 py-2 rounded-md mx-2 enabled:hover:border-gray-400 disabled:opacity-75" [disabled]="currentPage === totalPages">Last</button>
 </div>
</div>


`,
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent {

  constructor() {}  
  title = 'repo';
  username = '';
  repositories: any[] = [];
  errorMessage = '';

  userInfo: any = {};

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages: number = 0;
  visiblePageNumbers: number[] = [];
  pagesToShow: number = 5;
  loadingProfile: boolean = false;
  loadingRepos: boolean = false;
  dummyArr : number[] = [1,2,3,4,5,6,7,8,9,10]
  

  async searchRepositories() {
    this.loadingProfile = true
    this.loadingRepos= true
    console.log(this.loadingProfile)
    console.log(this.loadingRepos)
    this.errorMessage = '';
    this.username = this.username.trim();

    if (this.username.length === 0) {
      this.errorMessage = 'Please enter a GitHub username.';
      return;
    }

    try {
      const userUrl = `https://api.github.com/users/${this.username}` 
      const pageUrl = `https://api.github.com/users/${this.username}/repos?page=${this.currentPage}&per_page=${this.itemsPerPage}`;
      const response = await fetch(pageUrl);
      const userData = await fetch(userUrl);

      if (response.ok) {
        const data = await response.json();
        this.userInfo = await userData.json();
        this.loadingProfile = false;
        console.log(this.loadingProfile)
        
        for(let i = 0; i < data.length; i++){
          let languages = await fetch(data[i].languages_url);
          let languages_data = await languages.json();
          data[i].languages = languages_data  
        }
        

        if (Array.isArray(data)) {
          
          // Replace with the actual total count from the API response
          this.totalItems = this.userInfo.public_repos;
          

          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          
          
          this.repositories = data;
          this.loadingRepos = false;
          
          console.log(this.loadingRepos)
          this.updateVisiblePageNumbers();
        } else {
          this.errorMessage = 'Invalid response from GitHub API.';
        }
      } else {
        this.loadingProfile=false;
        this.loadingRepos = false;
        if (response.status === 404) {
          this.errorMessage = 'User not found. Please enter a valid GitHub username.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    } catch (error) {
      this.loadingProfile=false;
        this.loadingRepos = false;
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  }

  updateVisiblePageNumbers() {
    // Generate an array of visible page numbers
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);
    this.visiblePageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }
  
  loadPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.searchRepositories();
    }
  }

  loadNextPage() {
    if (this.currentPage < 1) {
      this.currentPage++;
      this.updateVisiblePageNumbers();
      this.searchRepositories();
    }
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisiblePageNumbers();
      this.searchRepositories();
    }
  }


}