export interface WebsiteData {
  place: {
    name: string;
    internationalPhoneNumber: string;
    formattedAddress: string;
    rating: number | null;
    userRatingCount: number | null;
  };
  websiteImages: Array<{ url: string }>;
}
