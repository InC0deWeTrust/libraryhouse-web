import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookServiceProxy,
BookDto,
CreateBookDto,
BookTypeDto,
UpdateBookDto,
AuthorDto, 
AuthorServiceProxy,
FileParameter} from 'src/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-admin',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class AdminBooksComponent implements OnInit {
  public book: BookDto;
  public books: BookDto[];
  public author: AuthorDto;
  public authors: AuthorDto[];
  public bookTypes: BookTypeDto[];
  public currentUrl: string | undefined;

  public pdfForUpload!: Object | null;
  public picForUpload!: Object | null;

  public searchFilter: any = '';
  public searchFilterAuthors: any = '';

  constructor(
    private _httpClient: HttpClient,
    private _bookService: BookServiceProxy,
    private _authorService: AuthorServiceProxy,
    private _router: Router
  ) {
    this.book = new BookDto;
    this.books = [];
    this.author = new AuthorDto;
    this.authors = [];
    this.bookTypes = [];
   }

  ngOnInit(): void {
    this._bookService.getAll().subscribe(result => {
      this.books = result;
    })

    this._bookService.getAllTypes().subscribe(result => {
      this.bookTypes = result;
    })

    this._authorService.getAll().subscribe(result => {
      this.authors = result;
    })

    this.currentUrl = this._router.url;
  }

  public createNewBook(val1: string, val2: string, val3: string, val4: string, val5: string, val6: string){
    const newBook = new CreateBookDto;
    newBook.name = val1;
    newBook.bookType = val2;
    if ((val4 && val5) && (val3 === 'newAuthor')){
      newBook.authorName = val4;
      newBook.authorSurname = val5;
    } else{ 
      if(val3 !== 'newAuthor'){
        let author = val3.split(" ");
        newBook.authorName = author[0];
        newBook.authorSurname = author[1];
      }
    }
    newBook.description = val6;
    this._bookService.create(newBook).subscribe(x =>
      window.location.reload());
  }

  public getBook(bookId: number){
    this._bookService.get(bookId).subscribe(result => {
      this.book = result;
    })
  }

  public updateBook(updatedBook: UpdateBookDto){
    this._bookService.update(updatedBook).subscribe(x =>
      window.location.reload());
  }

  public deleteBook(bookId: number){
    this._bookService.delete(bookId).subscribe(x =>
      window.location.reload());
  }

  public getAuthor(authorId: number){
    this._authorService.get(authorId).subscribe(result => {
      this.author = result;
    });
  }

  public uploadPictureForBook(bookId: number){
    this._bookService.addPictureToBook(bookId, <FileParameter>this.picForUpload).subscribe();
  }

  public getPicture(event: any){
    this.picForUpload = {
      data: event.target.files[0]
    }
  }

  public getPdf(event: any){
    this.pdfForUpload = {
      data: event.target.files[0]
    }
  }

  public uploadPDFForBook(bookId: number){
    this._bookService.addPdf(bookId, <FileParameter>this.pdfForUpload).subscribe();
  }
}
