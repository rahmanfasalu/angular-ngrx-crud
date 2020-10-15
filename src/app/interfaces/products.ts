// Category details interface
export interface Category {
  id: number;
  name: string;
}

// Author Details interface
export interface Res {
  res: string;
  size: number;
}
export interface Format {
  [key: string]: Res;
}
export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: Format;
  releaseDate: string;
  author?: number;
}

export interface Author {
  id: number;
  name: string;
  videos: number[] | Video[];
  videosList?: Video[];
}

export type AuthorEntityType = {
  entities: {
    authors?: Author;
    videos?: Video[];
  };
  result: String[];
};

export interface AuthorEntities extends Readonly<AuthorEntityType> {}
