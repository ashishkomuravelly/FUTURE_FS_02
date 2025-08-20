const { useState, useContext, createContext, useEffect } = React;

// 1. Context for Global State Management
const StoreContext = createContext();

// 2. Sample Product Data
const products = [
     { id: 1, name: "iPhone 15 Pro Max", price: 159900, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&auto=format", category: "smartphones", rating: 4.8, reviews: 2847, description: "Latest iPhone with titanium design and advanced camera system", aiRecommended: true },
     { id: 2, name: "MacBook Pro 16\"", price: 249900, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&auto=format", category: "laptops", rating: 4.9, reviews: 1523, description: "Powerful laptop with M3 chip for professionals", aiRecommended: false },
     { id: 3, name: "Sony WH-1000XM5", price: 29990, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format", category: "audio", rating: 4.7, reviews: 3421, description: "Industry-leading noise canceling headphones", aiRecommended: true },
     { id: 4, name: "Samsung Galaxy S24 Ultra", price: 129999, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format", category: "smartphones", rating: 4.6, reviews: 1876, description: "Premium Android phone with S Pen and AI features", aiRecommended: false },
     { id: 5, name: "iPad Pro 12.9\"", price: 112900, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&auto=format", category: "tablets", rating: 4.8, reviews: 2156, description: "Professional tablet with M2 chip and Liquid Retina display", aiRecommended: true },
     { id: 6, name: "Apple Watch Series 9", price: 41900, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&auto=format", category: "wearables", rating: 4.5, reviews: 987, description: "Advanced health and fitness tracking smartwatch", aiRecommended: false },
     { id: 7, name: "OnePlus 12", price: 64999, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop&auto=format", category: "smartphones", rating: 4.4, reviews: 1234, description: "Flagship killer with Snapdragon 8 Gen 3 and 100W charging", aiRecommended: false },
     { id: 8, name: "Dell XPS 13", price: 89999, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format", category: "laptops", rating: 4.6, reviews: 892, description: "Ultra-portable laptop with InfinityEdge display", aiRecommended: true },
     { id: 9, name: "AirPods Pro 2nd Gen", price: 24900, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&auto=format", category: "audio", rating: 4.7, reviews: 5643, description: "Active noise cancellation with spatial audio", aiRecommended: true },
     { id: 10, name: "Samsung Galaxy Tab S9", price: 72999, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&auto=format", category: "tablets", rating: 4.5, reviews: 743, description: "Premium Android tablet with S Pen included", aiRecommended: false },
     { id: 11, name: "Realme GT 5 Pro", price: 54999, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop&auto=format", category: "smartphones", rating: 4.4, reviews: 1234, description: "Flagship performance with Snapdragon 8 Gen 3 and 120W charging", aiRecommended: true },
     { id: 12, name: "Asus ROG Strix G15", price: 124999, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&auto=format", category: "laptops", rating: 4.4, reviews: 456, description: "Gaming laptop with RTX 4060 and AMD Ryzen 7", aiRecommended: false },
     { id: 13, name: "JBL Charge 5", price: 12999, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format", category: "audio", rating: 4.3, reviews: 2134, description: "Portable Bluetooth speaker with powerbank feature", aiRecommended: false },
     { id: 14, name: "Fitbit Versa 4", price: 19999, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop&auto=format", category: "wearables", rating: 4.2, reviews: 876, description: "Health and fitness smartwatch with GPS", aiRecommended: false },
     { id: 15, name: "Xiaomi 14 Ultra", price: 99999, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop&auto=format", category: "smartphones", rating: 4.6, reviews: 1098, description: "Photography flagship with Leica cameras", aiRecommended: true },
     { id: 16, name: "HP Pavilion 15", price: 54999, image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop&auto=format", category: "laptops", rating: 4.1, reviews: 623, description: "Everyday laptop with Intel Core i5 and 8GB RAM", aiRecommended: false },
     { id: 17, name: "Bose QuietComfort 45", price: 32900, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop&auto=format", category: "audio", rating: 4.6, reviews: 1876, description: "Premium noise canceling headphones", aiRecommended: false },
     { id: 18, name: "iPad Air 5th Gen", price: 59900, image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop&auto=format", category: "tablets", rating: 4.7, reviews: 1432, description: "Powerful tablet with M1 chip and vibrant display", aiRecommended: true },
     { id: 19, name: "Garmin Venu 3", price: 45900, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format", category: "wearables", rating: 4.4, reviews: 567, description: "Advanced GPS smartwatch with health monitoring", aiRecommended: false },
     { id: 20, name: "Microsoft Surface Pro 9", price: 89999, image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop&auto=format", category: "tablets", rating: 4.6, reviews: 1456, description: "2-in-1 laptop tablet with Intel Core i5 and detachable keyboard", aiRecommended: false }
];

// 3. Store Provider Component (Manages all state)
function StoreProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentView, setCurrentView] = useState('products'); // 'products' or 'checkout'
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [checkoutStep, setCheckoutStep] = useState(1);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <StoreContext.Provider value={{
            cart, isCartOpen, setIsCartOpen,
            currentView, setCurrentView,
            selectedCategory, setSelectedCategory,
            checkoutStep, setCheckoutStep,
            addToCart, removeFromCart, updateQuantity,
            getCartTotal, getCartItemCount, clearCart
        }}>
            {children}
        </StoreContext.Provider>
    );
}

// 4. Header Component
function Header() {
    const { isCartOpen, setIsCartOpen, getCartItemCount, setCurrentView, setCheckoutStep } = useContext(StoreContext);
    const goHome = () => {
        setCurrentView('products');
        setCheckoutStep(1);
    }
    return (
        <header className="bg-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center cursor-pointer" onClick={goHome}>
                        <i className="fas fa-bolt text-blue-600 text-2xl mr-2"></i>
                        <h1 className="text-2xl font-bold text-gray-900">TechHub</h1>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" onClick={goHome} className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Deals</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Support</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-blue-600"><i className="fas fa-search text-lg"></i></button>
                        <button className="text-gray-700 hover:text-blue-600"><i className="fas fa-user text-lg"></i></button>
                        <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative text-gray-700 hover:text-blue-600">
                            <i className="fas fa-shopping-cart text-lg"></i>
                            {getCartItemCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartItemCount()}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

// 5. Product Card Component
function ProductCard({ product }) {
    const { addToCart } = useContext(StoreContext);
    return (
        <div className="product-card bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                {product.aiRecommended && (
                    <div className="absolute top-3 left-3 ai-badge text-white px-2 py-1 rounded-full text-xs font-semibold">
                        <i className="fas fa-robot mr-1"></i>AI Pick
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow">{product.description}</p>
                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < Math.round(product.rating) ? '' : 'text-gray-300'}`}></i>
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    <button onClick={() => addToCart(product)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

// 6. Category Filter Component
function CategoryFilter() {
    const { selectedCategory, setSelectedCategory } = useContext(StoreContext);
    const categories = [
        { id: 'all', name: 'All', icon: 'fas fa-th-large' },
        { id: 'smartphones', name: 'Smartphones', icon: 'fas fa-mobile-alt' },
        { id: 'laptops', name: 'Laptops', icon: 'fas fa-laptop' },
        { id: 'audio', name: 'Audio', icon: 'fas fa-headphones' },
        { id: 'tablets', name: 'Tablets', icon: 'fas fa-tablet-alt' },
        { id: 'wearables', name: 'Wearables', icon: 'fas fa-watch' }
    ];
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                    <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <i className={`${category.icon} mr-2`}></i>{category.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

// 7. AI Recommendations Component
function AIRecommendations() {
    const { addToCart, selectedCategory } = useContext(StoreContext);
    const [currentRecommendation, setCurrentRecommendation] = useState(0);

    const recommendedProducts = products.filter(p => p.aiRecommended && (selectedCategory === 'all' || p.category === selectedCategory));
    if (recommendedProducts.length === 0) return null;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRecommendation(prev => (prev + 1) % recommendedProducts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [recommendedProducts.length]);
    
    const currentProduct = recommendedProducts[currentRecommendation];
    if (!currentProduct) return null;

    return (
         <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                     <img src={currentProduct.image} alt={currentProduct.name} className="w-48 h-48 object-cover rounded-lg shadow-lg"/>
                </div>
                <div>
                     <h3 className="text-2xl font-bold mb-2"><i className="fas fa-brain text-yellow-300 mr-2"></i>AI Smart Pick</h3>
                     <p className="text-indigo-200 mb-4">Our AI recommends this based on current trends.</p>
                     <h4 className="text-xl font-semibold">{currentProduct.name}</h4>
                     <p className="text-sm opacity-80 mb-4">{currentProduct.description}</p>
                     <div className="flex items-center justify-between">
                         <span className="text-3xl font-bold text-yellow-300">₹{currentProduct.price.toLocaleString('en-IN')}</span>
                         <button onClick={() => addToCart(currentProduct)} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                             <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                         </button>
                     </div>
                </div>
            </div>
         </div>
    );
}

// 8. Product List View
function ProductList() {
    const { selectedCategory } = useContext(StoreContext);
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CategoryFilter />
            <AIRecommendations />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>
    );
}

// 9. Cart Component
function Cart() {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, getCartTotal, setCurrentView, getCartItemCount } = useContext(StoreContext);

    const handleCheckout = () => {
        setIsCartOpen(false);
        setCurrentView('checkout');
    }

    return (
        <div>
            {/* Overlay */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)}></div>
            {/* Cart Panel */}
            <div className={`cart-slide fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col ${isCartOpen ? 'open' : ''}`}>
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart ({getCartItemCount()})</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-800"><i className="fas fa-times text-2xl"></i></button>
                </div>
                {cart.length === 0 ? (
                     <div className="flex flex-col items-center justify-center flex-grow p-6">
                        <i className="fas fa-shopping-bag text-gray-300 text-6xl mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-700">Your cart is empty</h3>
                        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                     </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg"/>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                    <p className="text-sm text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="flex items-center border rounded-md">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                    <span className="px-3 py-1 text-sm">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="p-6 border-t mt-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-600">Subtotal</span>
                        <span className="text-2xl font-bold text-gray-900">₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <button disabled={cart.length === 0} onClick={handleCheckout} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

// 10. Checkout View
function Checkout() {
    const { checkoutStep, setCheckoutStep, getCartTotal, cart, clearCart, setCurrentView } = useContext(StoreContext);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => {
            setOrderPlaced(false);
            setCurrentView('products');
            setCheckoutStep(1);
        }, 5000);
    }

    if(orderPlaced){
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 text-center">
                 <div className="bg-white p-10 rounded-xl shadow-lg">
                     <i className="fas fa-check-circle text-green-500 text-7xl mb-4"></i>
                     <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Thank You!</h2>
                     <p className="text-lg text-gray-600 mb-6">Your order has been placed successfully. You will be redirected to the home page shortly.</p>
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                 </div>
            </div>
        )
    }

    return (
         <div className="max-w-4xl mx-auto py-12 px-4">
             <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
             <div className="bg-white p-8 rounded-xl shadow-lg">
                 <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                 <div className="space-y-4 mb-6 border-b pb-6">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                    ))}
                 </div>
                 <div className="flex justify-between items-center font-bold text-xl mb-8">
                     <span>Total</span>
                     <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                 </div>

                 {/* Simple Form Placeholder */}
                 <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="John Doe" />
                    </div>
                     <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                        <input type="text" id="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="123 Tech Lane, Gadget City" />
                    </div>
                    <div>
                        <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Details</label>
                        <input type="text" id="card" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Card Number" />
                    </div>
                 </div>

                 <button onClick={handlePlaceOrder} className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors">
                    Place Order
                 </button>
             </div>
         </div>
    )
}

// 11. Footer Component
function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400">Smartphones</a></li>
                            <li><a href="#" className="hover:text-blue-400">Laptops</a></li>
                            <li><a href="#" className="hover:text-blue-400">Audio</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                            <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
                            <li><a href="#" className="hover:text-blue-400">Shipping</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                    &copy; 2025 TechHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

// 12. Main App Component
function App() {
    const { currentView } = useContext(StoreContext);
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {currentView === 'products' && <ProductList />}
                {currentView === 'checkout' && <Checkout />}
            </main>
            <Cart />
            <Footer />
        </div>
    );
}

// 13. Render the App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
