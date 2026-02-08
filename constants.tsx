
import { Restaurant, FoodItem } from './types';

export const CATEGORIES = [
  { id: 'cat-1', name: 'Pizza', icon: '🍕' },
  { id: 'cat-2', name: 'Burgers', icon: '🍔' },
  { id: 'cat-3', name: 'Thali', icon: '🍱' },
  { id: 'cat-4', name: 'Sushi', icon: '🍣' },
  { id: 'cat-5', name: 'Healthy', icon: '🥗' },
];

const generateMenu = (prefix: string): FoodItem[] => [
  { id: `${prefix}-1`, name: 'Classic Paneer Tikka', category: 'Starter', price: 280, image: 'https://images.unsplash.com/photo-1567184109191-3781e746274b?auto=format&fit=crop&w=400', rating: 4.5, calories: 450, protein: '18g', isEco: true, description: 'Fresh cottage cheese marinated in traditional spices and grilled to perfection.' },
  { id: `${prefix}-2`, name: 'Butter Chicken Bowl', category: 'Main', price: 350, image: 'https://images.unsplash.com/photo-1603894584113-f6139487c653?auto=format&fit=crop&w=400', rating: 4.8, calories: 650, protein: '35g', isEco: false, description: 'Rich and creamy chicken curry served with steamed basmati rice.' },
  { id: `${prefix}-3`, name: 'Veggie Supreme Pizza', category: 'Pizza', price: 499, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400', rating: 4.3, calories: 800, protein: '20g', isEco: true, description: 'Fresh bell peppers, onions, corn and mushrooms on a thin crust.' },
  { id: `${prefix}-4`, name: 'Exotic Fruit Bowl', category: 'Healthy', price: 220, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400', rating: 4.7, calories: 150, protein: '2g', isEco: true, description: 'A mix of fresh seasonal fruits with a dash of honey.' },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 'res-1', name: 'The Royal Kitchen', cuisine: 'North Indian • Chinese', rating: 4.4, deliveryTime: '35 min', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800', offer: '60% OFF up to ₹120', isPlus: true, menu: generateMenu('res1') },
  { id: 'res-2', name: 'Burger King', cuisine: 'Fast Food • American', rating: 4.2, deliveryTime: '25 min', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800', offer: 'Buy 1 Get 1 Free', isPlus: false, menu: generateMenu('res2') },
  { id: 'res-3', name: 'Healthy Bakes', cuisine: 'Salads • Healthy', rating: 4.6, deliveryTime: '20 min', image: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=800', offer: 'FREE Delivery', isPlus: true, menu: generateMenu('res3') },
  { id: 'res-4', name: 'Pizza Hut', cuisine: 'Pizza • Italian', rating: 4.1, deliveryTime: '40 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800', offer: '₹100 OFF', isPlus: false, menu: generateMenu('res4') },
  { id: 'res-5', name: 'Smoothie Station', cuisine: 'Beverages • Juices', rating: 4.8, deliveryTime: '15 min', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=800', offer: 'Extra ₹50 Cashback', isPlus: false, menu: generateMenu('res5') },
];

export const MOCK_FOODS: FoodItem[] = generateMenu('trend');

export const MOCK_ORDER_HISTORY = [
  {
    id: 'BHK-1092',
    restaurantName: 'The Royal Kitchen',
    date: 'Today • 02:45 PM',
    total: 630,
    status: 'delivered',
    items: [
      { name: 'Butter Chicken Bowl', quantity: 1 },
      { name: 'Classic Paneer Tikka', quantity: 1 },
    ],
  },
  {
    id: 'BHK-0982',
    restaurantName: 'Pizza Hut',
    date: 'Yesterday • 08:15 PM',
    total: 1099,
    status: 'delivered',
    items: [
      { name: 'Veggie Supreme Pizza', quantity: 2 },
    ],
  },
];
