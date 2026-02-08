
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthOverlay from './components/AuthOverlay';
import LandingView from './components/LandingView';
import BottomNav from './components/BottomNav';
import RestaurantCard from './components/RestaurantCard';
import MenuSection from './components/MenuSection';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import TrackingView from './components/TrackingView';
import ProfileView from './components/ProfileView';
import OrdersView from './components/OrdersView';
import FoodGrid from './components/FoodGrid';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import CategorySection from './components/CategorySection';
import LocationModal from './components/LocationModal';
import SearchResults from './components/SearchResults';
import WellnessDashboard from './components/WellnessDashboard';
import { ViewState, AppTab, Restaurant, FoodItem, CartItem } from './types';
import { MOCK_RESTAURANTS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('bh_session');
    const savedCart = localStorage.getItem('bh_cart');
    const savedLocation = localStorage.getItem('bh_location');
    if (session) {
      setIsLoggedIn(true);
      setCurrentView('home');
    }
    if (savedCart) setCart(JSON.parse(savedCart || '[]'));
    if (savedLocation) setLocation(savedLocation);
  }, []);

  useEffect(() => {
    localStorage.setItem('bh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bh_location', location);
  }, [location]);

  const handleLogin = (phone: string) => {
    localStorage.setItem('bh_session', phone);
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCart([]);
    setCurrentView('landing');
    setActiveTab('home');
  };

  const addToCart = (food: FoodItem, resId: string, navigate: boolean = false) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === food.id);
      if (existing) {
        return prev.map(i => i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...food, quantity: 1, restaurantId: resId }];
    });

    if (navigate) {
      setCurrentView('cart');
      setActiveTab('home');
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) return { ...i, quantity: Math.max(0, i.quantity + delta) };
      return i;
    }).filter(i => i.quantity > 0));
  };

  // View logic
  if (!isLoggedIn) {
    if (currentView === 'auth') {
      return <AuthOverlay onLogin={handleLogin} />;
    }
    return <LandingView onGetStarted={() => setCurrentView('auth')} />;
  }

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300">
      <Navbar 
        onCartClick={() => {
          setCurrentView('cart');
          setActiveTab('home');
        }} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onProfileClick={() => setActiveTab('profile')}
        onOrdersClick={() => setActiveTab('orders')}
        currentLocation={location}
        onLocationClick={() => setIsLocationModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 pb-32">
        {activeTab === 'profile' && <ProfileView onLogout={handleLogout} />}

        {activeTab === 'orders' && (
          <OrdersView 
            onTrackOrder={() => {
              setCurrentView('tracking');
              setActiveTab('home');
            }} 
          />
        )}

        {activeTab === 'wellness' && (
          <div className="pt-16 space-y-12">
            <AIAssistant />
            <WellnessDashboard />
          </div>
        )}

        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            {currentView === 'home' && (
              <>
                {!isSearching && (
                  <>
                    <Hero />
                    <CategorySection 
                      activeCategory={activeCategory} 
                      onCategorySelect={(cat) => setActiveCategory(prev => prev === cat ? null : cat)} 
                    />
                    <FoodGrid 
                      onAddToCart={addToCart} 
                      activeCategory={activeCategory} 
                    />
                  </>
                )}

                {isSearching ? (
                  <SearchResults 
                    query={searchQuery}
                    restaurants={MOCK_RESTAURANTS}
                    onRestaurantClick={(res) => {
                      setSelectedRestaurant(res);
                      setCurrentView('restaurant');
                      setSearchQuery('');
                    }}
                    onAddToCart={addToCart}
                  />
                ) : (
                  <div className="py-12">
                    <div className="flex justify-between items-end mb-8 px-2">
                      <div>
                        <h2 className="text-3xl font-extrabold tracking-tight">Top rated near you</h2>
                        <p className="text-slate-500 text-sm">Delicious meals from verified local kitchens</p>
                      </div>
                      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">See all</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {MOCK_RESTAURANTS.map(res => (
                        <RestaurantCard 
                          key={res.id} 
                          restaurant={res} 
                          onClick={(r) => {
                            setSelectedRestaurant(r);
                            setCurrentView('restaurant');
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {currentView === 'restaurant' && selectedRestaurant && (
              <MenuSection 
                restaurant={selectedRestaurant} 
                onBack={() => setCurrentView('home')} 
                onAdd={addToCart} 
                cartItems={cart}
              />
            )}

            {currentView === 'cart' && (
              <CartView 
                items={cart} 
                onUpdate={updateCartQty} 
                onCheckout={() => setCurrentView('checkout')} 
                onBack={() => setCurrentView('home')}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutView
                items={cart}
                onBack={() => setCurrentView('cart')}
                onPaymentComplete={() => {
                  setCart([]); // Clear cart as order is confirmed
                  setActiveTab('orders'); // Redirect to Orders page
                  setCurrentView('home'); // Reset home tab view
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentView === 'tracking' && (
              <TrackingView onFinish={() => {
                setCart([]);
                setCurrentView('home');
              }} />
            )}
          </div>
        )}
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentView('home');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
        onSelect={(loc) => setLocation(loc)}
      />
    </div>
  );
};

export default App;
