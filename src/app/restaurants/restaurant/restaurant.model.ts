export interface Restaurant {
  id: string;
  fantasyName: string;
  category: string;
  deliveryEstimate: string;
  rating: number;
  imagePath: string;
  about?: string;
  hours?: string;
}
