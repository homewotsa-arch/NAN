import React, { useState } from 'react';
import { 
  ShoppingBag, Flame, Star, Heart, ArrowRight, ShieldCheck, 
  Truck, Clock, ChevronRight, X, Plus, Minus, CheckCircle2,
  Menu, Utensils, Award, PhoneCall, Sparkles, ShoppingCart
} from 'lucide-react';

// PRODUCTS DATA - Set inStock to true or false for any item!
const PRODUCTS = [
  {
    id: 'king-chilli',
    name: 'Raja Mircha (King Chilli) Pickle',
    category: 'Spicy & Veg',
    heat: 5,
    scoville: '1,000,000 SHU',
    price: 350,
    weightOptions: ['200g', '400g'],
    inStock: true, // Set to false when out of stock
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'Blazing hot authentic Naga king chilli preserved in traditional oil and bamboo vinegar.',
    pairings: ['Warm Steamed Rice', 'Pork Curry', 'Dal Bhat']
  },
  {
    id: 'axone-pork',
    name: 'Smoked Pork with Axone (Fermented Soy)',
    category: 'Non-Veg Signature',
    heat: 4,
    scoville: '500,000 SHU',
    price: 480,
    weightOptions: ['250g', '500g'],
    inStock: false, // <-- DEMO: MARKED AS OUT OF STOCK
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Slow-smoked local pork cooked with earthy fermented soybean paste and fiery local chillies.',
    pairings: ['Boiled Rice', 'Bamboo Shoot Stew', 'Sticky Rice']
  },
  {
    id: 'bamboo-shoot-veg',
    name: 'Fermented Bamboo Shoot & Chilli Pickle',
    category: 'Spicy & Veg',
    heat: 3,
    scoville: '250,000 SHU',
    price: 320,
    weightOptions: ['200g', '400g'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Tangy, deeply savory fermented bamboo shoots tossed with aromatic Naga spices.',
    pairings: ['Dry Fish Curry', 'Plain Boiled Vegetables', 'Rice Bowls']
  },
  {
    id: 'smoked-buff',
    name: 'Traditional Smoked Beef Pickle',
    category: 'Non-Veg Signature',
    heat: 4,
    scoville: '600,000 SHU',
    price: 450,
    weightOptions: ['250g', '500g'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
    description: 'Tender wood-smoked beef chunks marinated in indigenous garlic, ginger, and dried red pepper.',
    pairings: ['Hot White Rice', 'Local Brews', 'Millet Porridge']
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWeights, setSelectedWeights] = useState({});

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: weight }));
  };

  const addToCart = (product) => {
    if (!product.inStock) return; // Block adding if out of stock
    
    const chosenWeight = selectedWeights[product.id] || product.weightOptions[0];
    const cartItemId = `${product.id}-${chosenWeight}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, cartItemId, chosenWeight, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (cartItemId, delta) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'veg') return p.category.includes('Veg');
    if (activeTab === 'non-veg') return p.category.includes('Non-Veg');
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-widest text-red-600 bg-neutral-950 px-3 py-1 rounded border border-red-900/50">
              NAN
            </span>
            <span className="text-sm font-bold tracking-wider text-neutral-300">NAGA PICKLES</span>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full transition flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 py-16 px-4 text-center border-b border-neutral-800">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800/50">
            <Sparkles className="w-3.5 h-3.5" /> 100% Authentic Nagaland Recipe
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Taste of Home, <br />
            <span className="text-red-500">In Every Single Jar.</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg">
            Handmade with fiery King Chilli, earthy Axone, and smoked delicacies delivered straight from Nagaland to your doorstep across India.
          </p>
        </div>
      </header>

      {/* PRODUCT SECTION */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-white">Our Signature Pickles</h2>
          
          {/* CATEGORY FILTER */}
          <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-sm">
            {['all', 'veg', 'non-veg'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md capitalize font-medium transition ${
                  activeTab === tab 
                    ? 'bg-red-600 text-white' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => {
            const currentWeight = selectedWeights[product.id] || product.weightOptions[0];

            return (
              <div 
                key={product.id} 
                className={`bg-neutral-900 rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  product.inStock 
                    ? 'border-neutral-800 hover:border-neutral-700' 
                    : 'border-neutral-800 opacity-80'
                }`}
              >
                <div>
                  {/* IMAGE CONTAINER WITH OUT OF STOCK BADGE */}
                  <div className="relative h-64 overflow-hidden bg-neutral-950">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`w-full h-full object-cover transition duration-500 ${
                        !product.inStock ? 'grayscale contrast-125 brightness-50' : 'hover:scale-105'
                      }`}
                    />
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-300 border border-neutral-800">
                      {product.category}
                    </div>

                    {/* OUT OF STOCK OVERLAY */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-red-600 text-white text-sm font-black px-4 py-2 rounded-lg tracking-widest border border-red-400 uppercase shadow-xl">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* HEAT LEVEL INDICATOR */}
                    <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-red-500 flex items-center gap-1 border border-neutral-800">
                      <Flame className="w-3.5 h-3.5 fill-red-500" />
                      {product.scoville}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xl font-bold text-white">{product.name}</h3>
                      <span className="text-xl font-black text-amber-400">₹{product.price}</span>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* WEIGHT SELECTOR */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs font-semibold text-neutral-400 uppercase">Jar Size:</span>
                      <div className="flex gap-2">
                        {product.weightOptions.map(w => (
                          <button
                            key={w}
                            disabled={!product.inStock}
                            onClick={() => handleWeightChange(product.id, w)}
                            className={`px-2.5 py-1 text-xs rounded border transition ${
                              currentWeight === w 
                                ? 'bg-neutral-100 text-neutral-950 font-bold border-white' 
                                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                            } ${!product.inStock && 'opacity-50 cursor-not-allowed'}`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PAIRINGS */}
                    <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800/80">
                      <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1 mb-1">
                        <Utensils className="w-3 h-3 text-amber-500" /> Best Enjoyed With:
                      </span>
                      <p className="text-xs text-neutral-300">
                        {product.pairings.join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADD TO CART BUTTON */}
                <div className="p-6 pt-0">
                  <button
                    disabled={!product.inStock}
                    onClick={() => addToCart(product)}
                    className={`w-full py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                      product.inStock 
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950/50 active:scale-[0.98]' 
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? `Add to Cart (${currentWeight})` : 'Currently Unavailable'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-900/50 py-8 px-4 text-center text-xs text-neutral-500 space-y-2">
        <p className="text-neutral-400 font-semibold">NAN Naga Pickles • Handmade in Nagaland</p>
        <p>FSSAI Reg No: 22823010000123</p>
      </footer>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-neutral-900 h-full p-6 flex flex-col justify-between border-l border-neutral-800">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-red-500" /> Your Shopping Bag
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <p className="text-neutral-500">Your bag is currently empty.</p>
                </div>
              ) : (
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.cartItemId} className="flex justify-between items-center bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.name}</h4>
                        <span className="text-xs text-neutral-400">Size: {item.chosenWeight} | ₹{item.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.cartItemId, -1)} className="p-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.cartItemId, 1)} className="p-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Subtotal:</span>
                  <span className="text-amber-400">₹{subtotal}</span>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
