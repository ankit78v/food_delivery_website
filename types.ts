
export type ViewState = 'landing' | 'auth' | 'home' | 'restaurant' | 'cart' | 'checkout' | 'tracking' | 'profile';
export type AppTab = 'home' | 'wellness' | 'orders' | 'profile';

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  calories: number;
  protein: string;
  isEco: boolean;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  offer: string;
  isPlus: boolean;
  menu: FoodItem[];
}

export interface CartItem extends FoodItem {
  quantity: number;
  restaurantId: string;
}

export interface Order {
  id: string;
  date: string;
  restaurantName: string;
  items: any[];
  total: number;
  status: 'delivered' | 'transit' | 'preparing' | 'cancelled';
}
