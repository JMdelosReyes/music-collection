export class Album {
  // tslint:disable: variable-name
  public _id?: string;
  public title: string;
  public artistId: string;
  public coverUrl: string;
  public year: number;
  public genre: string;
  public _createdAt?: Date;
  public _updatedAt?: Date;
  public __v?: number;

  constructor(title: string, artistId: string, coverUrl: string, year: number, genre: string) {
    this.title = title;
    this.artistId = artistId;
    this.coverUrl = coverUrl;
    this.year = year;
    this.genre = genre;
  }
}
