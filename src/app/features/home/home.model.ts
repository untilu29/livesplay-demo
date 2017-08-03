/**
 * Created by lmchuc on 7/3/2017.
 */
export class Slider {
  title: string;
  imgUrl: string;
  description: string;
}

export class Genre {
  id: string;
  name: string;
  description: string;
}

export class Author {
  id: string;
  name: string;
}

export class Video {
  id: string;
  name: string;
  imgCover: string;
  imgThumb: string;
  slug: string;
  src: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  duration: number;
  genres: Genre[];
  authors: Author[];
}
