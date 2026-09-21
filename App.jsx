import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Flame, X, Plus, Minus, CheckCircle2,
  Utensils, Sparkles, ShoppingCart, MapPin, CreditCard
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 'axone-pickle',
    name: 'Axone (Fermented Soybean) Pickle',
    category: 'Spicy & Veg',
    heat: 3,
    scoville: '400,000 SHU',
    basePrice: 150,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 150 },
      { label: '200g', price: 280 },
      { label: '400g', price: 520 }
    ],
    isHalal: false,
    description: 'Deep, earthy, umami-rich traditional fermented soybean pickle infused with local Naga spices.',
    pairings: ['Warm Steamed Rice', 'Dal Bhat', 'Boiled Veggies']
  },
  {
    id: 'soya-chunk-pickle',
    name: 'Soya Chunk Pickle',
    category: 'Spicy & Veg',
    heat: 3,
    scoville: '350,000 SHU',
    basePrice: 160,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 160 },
      { label: '200g', price: 300 },
      { label: '400g', price: 550 }
    ],
    isHalal: true,
    description: 'Savory soya chunks coated in fiery Naga spice blend and mustard oil.',
    pairings: ['Steamed Rice', 'Roti', 'Paratha']
  },
  {
    id: 'silkworm-pickle',
    name: 'Silkworm Pickle',
    category: 'Exotic Special',
    heat: 3,
    scoville: '300,000 SHU',
    basePrice: 200,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 200 },
      { label: '150g', price: 699 },
      { label: '300g', price: 749 }
    ],
    isHalal: false,
    description: 'A delicacy from Nagaland, slow-cooked silkworm pupae tossed in native herbs and chillies.',
    pairings: ['Local Brews', 'Steamed Sticky Rice']
  },
  {
    id: 'shredded-chicken-pickle',
    name: 'Shredded Chicken Pickle',
    category: 'Non-Veg Signature',
    heat: 4,
    scoville: '600,000 SHU',
    basePrice: 220,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 220 },
      { label: '250g', price: 420 },
      { label: '500g', price: 800 }
    ],
    isHalal: true,
    description: 'Tender shredded chicken cooked with local spices and King Chilli paste.',
    pairings: ['Hot White Rice', 'Roti', 'Fried Rice']
  },
  {
    id: 'buffalo-chunk-pickle',
    name: 'Buffalo Chunk Pickle',
    category: 'Non-Veg Signature',
    heat: 4,
    scoville: '650,000 SHU',
    basePrice: 240,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 240 },
      { label: '250g', price: 450 },
      { label: '500g', price: 850 }
    ],
    isHalal: true,
    description: 'Succulent buffalo meat chunks marinated in indigenous garlic, ginger, and fiery chillies.',
    pairings: ['Hot White Rice', 'Millet Porridge']
  },
  {
    id: 'smoked-pork-axone-pickle',
    name: 'Smoked Pork & Axone Pickle',
    category: 'Non-Veg Signature',
    heat: 5,
    scoville: '850,000 SHU',
    basePrice: 260,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 260 },
      { label: '250g', price: 480 },
      { label: '500g', price: 900 }
    ],
    isHalal: false,
    description: 'Wood-smoked pork bits paired with traditional fermented soybean (axone) and King Chilli.',
    pairings: ['Boiled Rice', 'Bamboo Shoot Stew']
  },
  {
    id: 'chicken-sausage',
    name: 'Chicken Sausage',
    category: 'Sausages',
    basePrice: 200,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 200 },
      { label: '250g', price: 380 },
      { label: '500g', price: 720 }
    ],
    isHalal: true,
    description: 'Handcrafted spicy chicken sausages smoked with authentic local herbs.',
    pairings: ['Pan Fried', 'Grilled', 'Rice Bowl Side']
  },
  {
    id: 'pork-sausage',
    name: 'Smoked Pork Sausage',
    category: 'Sausages',
    basePrice: 240,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 240 },
      { label: '250g', price: 450 },
      { label: '500g', price: 850 }
    ],
    isHalal: false,
    description: 'Traditional wood-smoked pork sausages packed with spicy red chilli.',
    pairings: ['Fried', 'Boiled Rice Side', 'Snack']
  },
  {
    id: 'beef-sausage',
    name: 'Beef Sausage',
    category: 'Sausages',
    basePrice: 250,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 250 },
      { label: '250g', price: 460 },
      { label: '500g', price: 880 }
    ],
    isHalal: false,
    description: 'Rich and hearty spiced beef sausages crafted with traditional Naga seasonings.',
    pairings: ['Pan Fried', 'Grilled', 'Hearty Snack']
  },
  {
    id: 'classic-beef-pork',
    name: 'Classic Beef & Pork',
    category: 'Non-Veg Signature',
    basePrice: 260,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 260 },
      { label: '250g', price: 490 },
      { label: '500g', price: 920 }
    ],
    isHalal: false,
    description: 'A classic fusion preparation combining tender beef and savory pork with indigenous spices.',
    pairings: ['Hot Steamed Rice', 'Bamboo Shoot Stew', 'Side Dish']
  },
  {
    id: 'pork-buffalo-sausage',
    name: 'Pork & Buffalo Mixed Sausage',
    category: 'Sausages',
    basePrice: 250,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 250 },
      { label: '250g', price: 460 },
      { label: '500g', price: 880 }
    ],
    isHalal: false,
    description: 'A special blend of smoked pork and buffalo meat seasoned with traditional spices.',
    pairings: ['Pan Fried', 'Steamed Rice', 'Evening Snack']
  },
  {
    id: 'buffalo-sausage',
    name: 'Buffalo Sausage',
    category: 'Sausages',
    basePrice: 250,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 250 },
      { label: '250g', price: 470 },
      { label: '500g', price: 890 }
    ],
    isHalal: true,
    description: 'Rich and savory buffalo meat sausages infused with aromatic local seasonings.',
    pairings: ['Pan Fried', 'Grilled', 'Hearty Snack']
  },
  {
    id: 'goat-sausage',
    name: 'Goat Sausage',
    category: 'Sausages',
    basePrice: 260,
    maxStock: 29,
    weightOptions: [
      { label: '100g', price: 260 },
      { label: '250g', price: 490 },
      { label: '500g', price: 920 }
    ],
    isHalal: true,
    description: 'Tender, premium minced goat meat sausages spiced to perfection.',
    pairings: ['Pan Fried', 'BBQ Skewers', 'With Rice']
  }
];

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'transitioning', 'shop'
  const [products, setProducts] = useState(() => {
    try {
      const savedStock = localStorage.getItem('nan_naga_stock');
      if (savedStock) return JSON.parse(savedStock);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS.map(p => ({ ...p, stockLeft: p.maxStock }));
  });

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOptions, setSelectedOptions] = useState({});

  const [customerName, setCustomerName] = useState('');
  const [gmail, setGmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash on Delivery (COD)');

  const WHATSAPP_NUMBER = "916009795825"; 

  useEffect(() => {
    try {
      localStorage.setItem('nan_naga_stock', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  const handleLogoClick = () => {
    if (view !== 'landing') return;
    setView('transitioning');
    setTimeout(() => {
      setView('shop');
    }, 1200);
  };

  const handleWeightChange = (productId, option) => {
    setSelectedOptions(prev => ({ ...prev, [productId]: option }));
  };

  const getSelectedOption = (product) => {
    return selectedOptions[product.id] || product.weightOptions[0];
  };

  const addToCart = (product) => {
    const chosen = getSelectedOption(product);
    const cartItemId = `${product.id}-${chosen.label}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { 
        ...product, 
        cartItemId, 
        chosenWeight: chosen.label, 
        price: chosen.price, 
        qty: 1
      }];
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

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName || !address || !pincode) {
      alert('Please fill in your name, delivery address, and pincode.');
      return;
    }

    let message = `*NEW ORDER - NAN NAGA PICKLES*\n\n`;
    message += `*Customer Details:*\n`;
    message += `- Name: ${customerName}\n`;
    if (gmail) message += `- Gmail: ${gmail}\n`;
    message += `- Address: ${address}\n`;
    message += `- Pincode: ${pincode}\n`;
    message += `- Payment Mode: ${paymentMode}\n\n`;

    message += `*Order Summary:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   - Size: ${item.chosenWeight}\n   - Qty: ${item.qty}\n   - Price: ₹${item.price * item.qty}\n\n`;
    });
    message += `*Total Amount:* ₹${subtotal}\n\n`;
    message += `Please confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setCart([]);
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter(p => {
    if (activeTab === 'veg') return p.id === 'axone-pickle' || p.id === 'soya-chunk-pickle';
    if (activeTab === 'non-veg') return p.category.includes('Non-Veg') || p.category.includes('Exotic');
    if (activeTab === 'sausages') return p.category === 'Sausages';
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans relative overflow-x-hidden">
      
      {/* LANDING PAGE VIEW */}
      {(view === 'landing' || view === 'transitioning') && (
        <div className="fixed inset-0 z-50 bg-[#f4f1ea] flex flex-col items-center justify-center cursor-pointer select-none">
          <div 
            onClick={handleLogoClick}
            className="group flex flex-col items-center p-8 transition-transform duration-300 hover:scale-105"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#fcfbf9] shadow-xl border border-neutral-300/60 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e2d9_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              
              <div className="relative z-10 text-center flex flex-col items-center space-y-2">
                <div className="w-36 h-36 rounded-full border-2 border-dashed border-neutral-400 flex items-center justify-center p-2">
                  <div className="text-center">
                    <span className="text-3xl font-black tracking-widest text-neutral-800 block">NAN</span>
                    <div className="my-1 flex justify-center">
                      <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-700">
                        NAGA
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-600 mt-2">Taste of Home</span>
              </div>
            </div>

            <p className="mt-6 text-neutral-500 text-sm font-medium tracking-widest uppercase animate-pulse">
              Click the logo to enter
            </p>
          </div>

          {/* Hornbill Flock Animation Overlay */}
          {view === 'transitioning' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-neutral-900 opacity-90 animate-fly-hornills flex items-center gap-1 font-bold text-xs"
                  style={{
                    bottom: `-20px`,
                    right: `-20px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.1s',
                    animationFillMode: 'forwards',
                    transform: `scale(${0.6 + (i % 3) * 0.3})`
                  }}
                >
                  <span className="text-xl">🪶</span>
                  <span className="bg-neutral-900 text-amber-100 px-2 py-0.5 rounded-full text-[10px] shadow-md">Hornbill</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inline styles for custom diagonal hornbill cluster flight path */}
      <style>{`
        @keyframes flyHornbills {
          0% {
            transform: translate(0, 0) scale(0.6) rotate(-15deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-120vw, -120vh) scale(1.2) rotate(-25deg);
            opacity: 1;
          }
        }
        .animate-fly-hornills {
          animation-name: flyHornbills;
          animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>

      {/* SHOPPING PAGE VIEW */}
      <div className={`${view !== 'shop' ? 'opacity-0 pointer-events-none hidden' : 'opacity-100 transition-opacity duration-700'} min-h-screen bg-neutral-950 text-neutral-100`}>
        <nav className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('landing')}>
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

        <header className="relative bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 py-16 px-4 text-center border-b border-neutral-800">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800/50">
              <Sparkles className="w-3.5 h-3.5" /> 100% Authentic Nagaland Recipe
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Taste of Home, <br />
              <span className="text-red-500">In Every Single Bite.</span>
            </h1>
            <p className="text-neutral-400 text-base md:text-lg">
              Handmade with fiery King Chilli, earthy Axone, and smoked delicacies delivered straight from Nagaland to your doorstep across India.
            </p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-white">Our Signature Products</h2>
            
            <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-sm">
              {['all', 'veg', 'non-veg', 'sausages'].map((tab) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProducts.map((product) => {
              const currentOption = getSelectedOption(product);

              return (
                <div 
                  key={product.id} 
                  className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-neutral-950 flex items-center justify-center border-b border-neutral-800">
                      <span className="text-neutral-600 font-bold uppercase tracking-widest text-lg">Coming Soon</span>
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
                        <span className="bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-300 border border-neutral-800">
                          {product.category}
                        </span>
                        {product.isHalal && (
                          <span className="bg-emerald-950/90 backdrop-blur-md px-3 py-0.5 rounded-full text-[11px] font-bold text-emerald-400 border border-emerald-700/60 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Halal Certified
                          </span>
                        )}
                      </div>

                      {product.scoville && (
                        <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-red-500 flex items-center gap-1 border border-neutral-800">
                          <Flame className="w-3.5 h-3.5 fill-red-500" />
                          {product.scoville}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        <span className="text-xl font-black text-amber-400">₹{currentOption.price}</span>
                      </div>

                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs font-semibold text-neutral-400 uppercase">Option:</span>
                        <div className="flex gap-2 flex-wrap">
                          {product.weightOptions.map(opt => (
                            <button
                              key={opt.label}
                              onClick={() => handleWeightChange(product.id, opt)}
                              className={`px-3 py-1 text-xs rounded border transition ${
                                currentOption.label === opt.label 
                                  ? 'bg-neutral-100 text-neutral-950 font-bold border-white' 
                                  : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                              }`}
                            >
                              {opt.label} (₹{opt.price})
                            </button>
                          ))}
                        </div>
                      </div>

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

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] bg-red-600 hover:bg-red-700 text-white shadow-red-950/50"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart ({currentOption.label} - ₹{currentOption.price})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <footer className="border-t border-neutral-800 bg-neutral-900/50 py-8 px-4 text-center text-xs text-neutral-500 space-y-2">
          <p className="text-neutral-400 font-semibold">NAN Naga Pickles • Handmade in Nagaland</p>
          <p>FSSAI Reg No: 22823010000123</p>
        </footer>

        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-md bg-neutral-900 h-full p-6 flex flex-col justify-between border-l border-neutral-800 overflow-y-auto">
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
                  <>
                    <div className="py-4 space-y-3 border-b border-neutral-800">
                      {cart.map(item => (
                        <div key={item.cartItemId} className="flex justify-between items-center bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                          <div>
                            <h4 className="font-bold text-sm text-white flex items-center gap-2">
                              {item.name}
                            </h4>
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

                    <form onSubmit={handleWhatsAppCheckout} className="py-4 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                        <MapPin className="w-4 h-4" /> Delivery Address Details
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-neutral-400 mb-1">Full Name *</label>
                          <input 
                            type="text" 
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Full Address (House No, Street, City) *</label>
                          <textarea 
                            required
                            rows="2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="House No, Colony/Street Name, Landmark, City, State"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Pincode *</label>
                          <input 
                            type="text" 
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="6-digit Pincode"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1 font-semibold text-amber-400 flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5" /> Payment Method
                          </label>
                          <select 
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                          >
                            <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                            <option value="Online Payment (UPI/GPay/PhonePe)">Online Payment (UPI / GPay / PhonePe / Paytm)</option>
                            <option value="Direct Bank Transfer">Direct Bank Transfer (NEFT/IMPS)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-lg font-bold text-white mb-3">
                          <span>Subtotal:</span>
                          <span className="text-amber-400">₹{subtotal}</span>
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-red-950/50 active:scale-[0.98]"
                        >
                          Confirm & Order via WhatsApp
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
