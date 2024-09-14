export type HomePage = {
  welkomSectieText: string;
  diensten: {
    category: string;
    text: string;
  }[]
}

export type PortfolioPage = {
  description: string;
}

export type OverMijPage = {
  description: string;
}

export type DienstenPage = {
  diensten: {
    name: string;
    imageUrl: string;
    description: string;
    inclusions: string[];
  }[]
}

export type ContactPage = {
  description: string;
}
