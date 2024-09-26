export type HomePage = {
  diensten: {
    category: string;
    imageId: string;
  }[]
}

export type PortfolioPagePicture = {
  id: string;
  originalFilename: string;
  width: number;
  height: number;
  extension: string;
};

export type PortfolioPageCategory = {
  name: string;
  pictures: PortfolioPagePicture[]
};

export type PortfolioPage = {
  categories: PortfolioPageCategory[];
}

export type OverMijPage = {
  description: string;
  imageId: string;
}

export type DienstenPage = {
  diensten: {
    name: string;
    imageId: string;
    description: string;
    inclusions: string[];
  }[]
}

export type ContactPage = {
  description: string;
}
