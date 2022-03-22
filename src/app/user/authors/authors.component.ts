import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorDto, AuthorServiceProxy } from 'src/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  public author: AuthorDto;
  public authors: AuthorDto[];

  constructor(
    private _httpClient: HttpClient,
    private _authorService: AuthorServiceProxy
  ) {
    this.author = new AuthorDto;
    this.authors = [];
   }

  ngOnInit(): void {
    this._authorService.getAll().subscribe(result => {
      this.authors = result;
    })
  }

  getAuthor(authorId: number){
    this._authorService.get(authorId).subscribe(result => {
      this.author = result;
    });
  }

  getAllAuthors() {
    this._authorService.getAll().subscribe(result => {
      this.authors = result;
    })
  }

}
