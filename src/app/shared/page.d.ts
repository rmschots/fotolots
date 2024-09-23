export type HomePage = {
  welkomSectieText: string;
  diensten: {
    category: string;
    text: string;
    imageId: string;
  }[]
}

export type PortfolioPage = {
  categories: {
    name: string;
    pictures: {
      id: string;
      originalFilename: string;
    }[]
  }[];
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
