import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Input, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {
  getCourses(){
    return ["JS", "TypeScript", "Angular", "RxJS"];
  }
}

@Injectable()
export class UserService {
  url: string = "https://api.github.com/users/davyengone";
  
  constructor(private httpClient: HttpClient){}

  getLogin(){
    return this.httpClient.get(this.url);
  }
}


@Component({
  selector: 'course-list',
  template: `
    <ul>
      <li *ngFor="let course of list">
        {{course}}
      </li>
    </ul>
  `
})
export class CourseListComponent{
  @Input()
  list: number[] = [];
}


// <user-app></user-app>
@Component({
  selector: 'user-app',
  template: `
    <h1>Welcome user: {{login$ | async}}</h1>

    <course-list [list]="courses"></course-list>

    <input value="{{login$ | async }}">
    <button (click)="run()">Run...</button>
  `,
  providers: [CourseService, UserService]
})
export class UserComponent {
  login$: Observable<{}>;
  courses: string[] ; 

  constructor(_courseService: CourseService,
    private userService: UserService
  ){
    this.login$ = this.userService.getLogin().pipe(map(user => user.login));

    this.courses = _courseService.getCourses();
  }

  run(){
    console.log("user is running...")
  }
}








@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [UserComponent, CourseListComponent],
  bootstrap: [UserComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)