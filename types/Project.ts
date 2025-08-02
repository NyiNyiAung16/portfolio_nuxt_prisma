type Pagination = {
  page: number;
  data: Object[];
  pages: number[];
};

type Project = {
  id: number;
  title: string;
  description: string;
  images_path: string[];
  youtube_link: string;
  tags: string[];
  userId?: string;
  createdAt: Date;
};


type FormData = {
  title: string;
  description: string;
  images_path: string[];
  youtube_link: string;
  tags: string[];
}

type ErrorData = {
  title: string;
  description: string;
  images_path: string;
  youtube_link: string;
  tags: string;
}

export type { Pagination, Project, FormData, ErrorData };
