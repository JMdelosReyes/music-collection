export class Artist {
  // tslint:disable: variable-name
  public _id?: string;
  public name: string;
  public photoUrl: string;
  public birthdate: Date;
  public deathDate: Date;
  public _createdAt?: Date;
  public _updatedAt?: Date;
  public __v?: number;

  constructor(
    name: string,
    photoUrl: string,
    birthdate: Date,
    deathDate: Date
  ) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.birthdate = birthdate;
    this.deathDate = deathDate;
  }
}
