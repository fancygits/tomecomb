export class Book {
  constructor(
    public title: string,
    public subtitle: string = '',
    public author: string = '',
    public category: string = '',
    public textSnippet: string = '',
    public description: string = '',
    public pageCount: number,
    public previewLink: string = '',
    public imageLinks: {} = {},
  ) {};
  
}

export interface BookList<Book> {
  items: Book[];
  totalItems: number;
}
