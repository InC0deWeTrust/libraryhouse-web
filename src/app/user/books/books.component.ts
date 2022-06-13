import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BookDto,
  BookServiceProxy,
  FullInfoBookDto,
  BookTypeDto
} from 'src/shared/service-proxies/service-proxies';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  public book: BookDto;
  public books: BookDto[];
  public copyOfBooksOriginal: BookDto[] = [];
  public fullInfoBook: FullInfoBookDto;
  public bookTypes: BookTypeDto[];

  public searchFilter: any = '';

  constructor(
    private _httpClient: HttpClient,
    private _bookService: BookServiceProxy,
    private _authService: AuthenticationService,
    private _spinner: SpinnerService
  ) { 
    this.book = new BookDto;
    this.books = [];
    this.fullInfoBook = new FullInfoBookDto;
    this.bookTypes = [];
  }

  ngOnDestroy(): void {
    this.copyOfBooksOriginal = [];
  }

  ngOnInit(): void {
    this._spinner.showLoader();

    this._bookService.getAll().subscribe(result => {
      this.books = result;
      this.GetPictures();
      this.copyOfBooksOriginal = [...this.books];
      this._spinner.hideLoader();
    })

    this._bookService.getAllTypes().subscribe(result => {
      this.bookTypes = result;
    })
  }

  GetPictures(){
    this.books.forEach(element => {
      if(element.pictureResult){
        element.pictureResult = JSON.parse(JSON.stringify(element.pictureResult))['fileContents']
      }
    });
  }

  getBook(bookId: number) {
    this._bookService.get(bookId).subscribe(result => {
      this.book = result;
    })
  }

  getFullInfoAboutBook(bookId: number) {
    this._bookService.getFullInfo(bookId).subscribe(result => {
      this.fullInfoBook = result;
    })
  }

  // reserveBook(bookId: number) {
  //   const userId = this._authService.getDecodedTokenInfoAboutUserId();
  //   this._bookService.reserveBook(userId, bookId).subscribe();
  // }

  // returnBook(bookId: number) {
  //   const userId = this._authService.getDecodedTokenInfoAboutUserId();
  //   this._bookService.returnBook(userId, bookId).subscribe()
  // }

  downloadBook(bookId: number, bookName: string | undefined){
    this._bookService.downloadPdf(bookId).subscribe(result => {
      saveAs(result.data, bookName)
    })
  };

  search(bookTypeId: number): void {
    this.books = [...this.copyOfBooksOriginal];
    this.books = this.books.filter((val) =>
      val.bookTypeId === bookTypeId
    );
  }
}
