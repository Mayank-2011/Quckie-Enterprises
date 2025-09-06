// Enhanced Quickies Enterprise - Quick Commerce Application JavaScript

// Application State
let appState = {
    currentPage: 'landing',
    currentAdminSection: 'overview',
    currentCategory: 'all',
    searchQuery: '',
    cart: [],
    user: null,
    products: [],
    categories: [],
    orders: [],
    users: [],
    permissions: {},
    drivers: [],
    adminSession: null,
    nextOrderId: 1,
    nextUserId: 1,
    pendingOAuthLogin: null,
    trackingOrders: {}
};

// Sample Data from JSON
const sampleData = {
    "users": [
        {
            "id": 1,
            "email": "admin@quickies.com",
            "name": "System Administrator",
            "phone": "+1234567890",
            "role": "super_admin",
            "authProvider": "email",
            "providerId": null,
            "profilePicture": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            "addresses": [
                {"id": 1, "type": "office", "address": "123 Admin St, San Francisco, CA", "lat": 37.7749, "lng": -122.4194, "isDefault": true}
            ],
            "wishlist": [],
            "orderHistory": [],
            "accountStatus": "active",
            "lastLogin": "2025-09-06T12:00:00Z",
            "createdAt": "2025-01-01T00:00:00Z",
            "permissions": ["*"]
        },
        {
            "id": 2,
            "email": "manager@quickies.com", 
            "name": "Store Manager",
            "phone": "+1234567891",
            "role": "admin",
            "authProvider": "email",
            "providerId": null,
            "profilePicture": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            "addresses": [
                {"id": 1, "type": "work", "address": "456 Manager Ave, San Francisco, CA", "lat": 37.7849, "lng": -122.4094, "isDefault": true}
            ],
            "wishlist": [],
            "orderHistory": [],
            "accountStatus": "active",
            "lastLogin": "2025-09-06T11:30:00Z", 
            "createdAt": "2025-02-01T00:00:00Z",
            "permissions": ["read_all_users", "manage_products", "manage_orders", "view_analytics", "manage_categories", "access_admin_panel"]
        },
        {
            "id": 3,
            "email": "john.doe@gmail.com",
            "name": "John Doe",
            "phone": "+1234567892",
            "role": "customer",
            "authProvider": "google",
            "providerId": "google_123456789",
            "profilePicture": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            "addresses": [
                {"id": 1, "type": "home", "address": "789 Customer Ln, San Francisco, CA", "lat": 37.7649, "lng": -122.4394, "isDefault": true},
                {"id": 2, "type": "work", "address": "321 Work St, San Francisco, CA", "lat": 37.7749, "lng": -122.4194, "isDefault": false}
            ],
            "wishlist": [1, 5, 8],
            "orderHistory": [1, 2],
            "accountStatus": "active",
            "lastLogin": "2025-09-06T10:00:00Z",
            "createdAt": "2025-08-01T00:00:00Z",
            "permissions": ["read_products", "create_orders", "read_own_orders", "manage_wishlist", "manage_addresses"]
        },
        {
            "id": 4,
            "email": "jane.smith@facebook.com",
            "name": "Jane Smith", 
            "phone": "+1234567893",
            "role": "customer",
            "authProvider": "facebook",
            "providerId": "facebook_987654321",
            "profilePicture": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            "addresses": [
                {"id": 1, "type": "home", "address": "654 Social Ave, San Francisco, CA", "lat": 37.7549, "lng": -122.4494, "isDefault": true}
            ],
            "wishlist": [3, 7, 12],
            "orderHistory": [3],
            "accountStatus": "active",
            "lastLogin": "2025-09-05T15:30:00Z",
            "createdAt": "2025-08-15T00:00:00Z",
            "permissions": ["read_products", "create_orders", "read_own_orders", "manage_wishlist", "manage_addresses"]
        }
    ],
    "orders": [
        {
            "id": 1,
            "userId": 3,
            "customerInfo": {
                "name": "John Doe",
                "email": "john.doe@gmail.com",
                "phone": "+1234567892"
            },
            "items": [
                {"productId": 1, "name": "Fresh Bananas", "quantity": 2, "price": 2.99, "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e"},
                {"productId": 3, "name": "Whole Milk", "quantity": 1, "price": 3.49, "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150"}
            ],
            "subtotal": 9.47,
            "deliveryFee": 2.99,
            "total": 12.46,
            "status": "delivered",
            "trackingNumber": "QK2025090600001",
            "deliveryAddress": {
                "address": "789 Customer Ln, San Francisco, CA",
                "lat": 37.7649,
                "lng": -122.4394,
                "instructions": "Ring doorbell twice"
            },
            "driverId": 101,
            "driverInfo": {
                "name": "Mike Wilson",
                "phone": "+1555123456",
                "vehicle": "Honda Civic - ABC123",
                "photo": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
            },
            "statusHistory": [
                {"status": "placed", "timestamp": "2025-09-05T10:00:00Z", "location": "Quickies Store", "description": "Order received and confirmed"},
                {"status": "confirmed", "timestamp": "2025-09-05T10:05:00Z", "location": "Quickies Store", "description": "Payment verified, preparing order"},
                {"status": "preparing", "timestamp": "2025-09-05T10:15:00Z", "location": "Store Kitchen", "description": "Items being picked and prepared"},
                {"status": "picked_up", "timestamp": "2025-09-05T11:00:00Z", "location": "Quickies Store", "description": "Driver collected order for delivery"},
                {"status": "out_for_delivery", "timestamp": "2025-09-05T11:30:00Z", "location": "En Route", "description": "Order on the way to delivery address"},
                {"status": "delivered", "timestamp": "2025-09-05T12:15:00Z", "location": "789 Customer Ln", "description": "Order successfully delivered"}
            ],
            "estimatedDelivery": "2025-09-05T12:00:00Z",
            "actualDelivery": "2025-09-05T12:15:00Z",
            "deliveryInstructions": "Ring doorbell twice",
            "paymentStatus": "paid",
            "deliveryProof": {
                "photo": "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400",
                "signature": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+",
                "notes": "Left at front door as requested"
            },
            "rating": 5,
            "feedback": "Fast delivery, items were fresh!",
            "createdAt": "2025-09-05T10:00:00Z"
        },
        {
            "id": 2,
            "userId": 3,
            "customerInfo": {
                "name": "John Doe", 
                "email": "john.doe@gmail.com",
                "phone": "+1234567892"
            },
            "items": [
                {"productId": 5, "name": "Fresh Spinach", "quantity": 1, "price": 2.49, "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb"},
                {"productId": 7, "name": "Whole Grain Bread", "quantity": 1, "price": 3.99, "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff"}
            ],
            "subtotal": 6.48,
            "deliveryFee": 2.99, 
            "total": 9.47,
            "status": "out_for_delivery",
            "trackingNumber": "QK2025090600002",
            "deliveryAddress": {
                "address": "789 Customer Ln, San Francisco, CA",
                "lat": 37.7649,
                "lng": -122.4394,
                "instructions": "Ring doorbell twice"
            },
            "driverId": 102,
            "driverInfo": {
                "name": "Sarah Johnson",
                "phone": "+1555789012", 
                "vehicle": "Toyota Camry - XYZ789",
                "photo": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
            },
            "statusHistory": [
                {"status": "placed", "timestamp": "2025-09-06T14:00:00Z", "location": "Quickies Store", "description": "Order received and confirmed"},
                {"status": "confirmed", "timestamp": "2025-09-06T14:05:00Z", "location": "Quickies Store", "description": "Payment verified, preparing order"},
                {"status": "preparing", "timestamp": "2025-09-06T14:15:00Z", "location": "Store Kitchen", "description": "Items being picked and prepared"},
                {"status": "picked_up", "timestamp": "2025-09-06T15:00:00Z", "location": "Quickies Store", "description": "Driver collected order for delivery"},
                {"status": "out_for_delivery", "timestamp": "2025-09-06T15:30:00Z", "location": "Market Street", "description": "Order on the way to delivery address"}
            ],
            "estimatedDelivery": "2025-09-06T16:00:00Z",
            "actualDelivery": null,
            "deliveryInstructions": "Ring doorbell twice",
            "paymentStatus": "paid",
            "deliveryProof": null,
            "rating": null,
            "feedback": null,
            "createdAt": "2025-09-06T14:00:00Z"
        },
        {
            "id": 3,
            "userId": 4,
            "customerInfo": {
                "name": "Jane Smith",
                "email": "jane.smith@facebook.com", 
                "phone": "+1234567893"
            },
            "items": [
                {"productId": 4, "name": "Greek Yogurt", "quantity": 2, "price": 5.99, "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777"},
                {"productId": 13, "name": "Strawberries", "quantity": 1, "price": 4.99, "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6"}
            ],
            "subtotal": 16.97,
            "deliveryFee": 2.99,
            "total": 19.96,
            "status": "preparing",
            "trackingNumber": "QK2025090600003",
            "deliveryAddress": {
                "address": "654 Social Ave, San Francisco, CA",
                "lat": 37.7549,
                "lng": -122.4494,
                "instructions": "Leave at door if no answer"
            },
            "driverId": null,
            "driverInfo": null,
            "statusHistory": [
                {"status": "placed", "timestamp": "2025-09-06T15:30:00Z", "location": "Quickies Store", "description": "Order received and confirmed"},
                {"status": "confirmed", "timestamp": "2025-09-06T15:35:00Z", "location": "Quickies Store", "description": "Payment verified, preparing order"},
                {"status": "preparing", "timestamp": "2025-09-06T15:45:00Z", "location": "Store Kitchen", "description": "Items being picked and prepared"}
            ],
            "estimatedDelivery": "2025-09-06T16:30:00Z",
            "actualDelivery": null,
            "deliveryInstructions": "Leave at door if no answer",
            "paymentStatus": "paid",
            "deliveryProof": null,
            "rating": null,
            "feedback": null,
            "createdAt": "2025-09-06T15:30:00Z"
        }
    ],
    "permissions": {
        "roles": {
            "super_admin": {
                "name": "Super Administrator",
                "permissions": ["*"],
                "description": "Full system access including user management and system configuration"
            },
            "admin": {
                "name": "Administrator",
                "permissions": [
                    "read_all_users", "manage_products", "manage_orders", "view_analytics", 
                    "manage_categories", "access_admin_panel", "manage_drivers", "view_reports"
                ],
                "description": "Store management access with product and order control"
            },
            "manager": {
                "name": "Manager", 
                "permissions": [
                    "read_orders", "update_order_status", "access_admin_panel", "assign_drivers", "view_basic_analytics"
                ],
                "description": "Order and delivery management access"
            },
            "customer": {
                "name": "Customer",
                "permissions": [
                    "read_products", "create_orders", "read_own_orders", "manage_wishlist", 
                    "manage_addresses", "track_orders", "rate_orders", "contact_support"
                ],
                "description": "Standard customer shopping and account management access"
            },
            "guest": {
                "name": "Guest",
                "permissions": ["read_products", "browse_categories", "view_store_info"],
                "description": "Browse-only access without checkout capabilities"
            }
        }
    },
    "products": [
        {"id": 1, "name": "Fresh Bananas", "price": 2.99, "category": "Fruits", "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e", "description": "Fresh organic bananas, perfect for smoothies or snacking", "stock": 50, "featured": true, "trending": false, "dealOfDay": false, "rating": 4.5, "viewCount": 245},
        {"id": 2, "name": "Red Apples", "price": 4.99, "category": "Fruits", "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6", "description": "Crisp red apples, locally sourced", "stock": 30, "featured": false, "trending": true, "dealOfDay": false, "rating": 4.7, "viewCount": 189},
        {"id": 3, "name": "Whole Milk", "price": 3.49, "category": "Dairy", "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150", "description": "Fresh whole milk, 1 gallon", "stock": 25, "featured": true, "trending": false, "dealOfDay": false, "rating": 4.3, "viewCount": 156},
        {"id": 4, "name": "Greek Yogurt", "price": 5.99, "category": "Dairy", "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777", "description": "Creamy Greek yogurt, high in protein", "stock": 40, "featured": false, "trending": false, "dealOfDay": true, "rating": 4.8, "viewCount": 198},
        {"id": 5, "name": "Fresh Spinach", "price": 2.49, "category": "Vegetables", "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb", "description": "Fresh organic spinach leaves", "stock": 35, "featured": true, "trending": true, "dealOfDay": false, "rating": 4.2, "viewCount": 134},
        {"id": 6, "name": "Carrots", "price": 1.99, "category": "Vegetables", "image": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37", "description": "Fresh carrots, perfect for cooking", "stock": 45, "featured": false, "trending": false, "dealOfDay": false, "rating": 4.1, "viewCount": 98},
        {"id": 7, "name": "Whole Grain Bread", "price": 3.99, "category": "Bakery", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff", "description": "Freshly baked whole grain bread", "stock": 20, "featured": false, "trending": true, "dealOfDay": false, "rating": 4.6, "viewCount": 176},
        {"id": 8, "name": "Croissants", "price": 6.99, "category": "Bakery", "image": "https://images.unsplash.com/photo-1555507036-ab794f4afe81", "description": "Buttery French croissants, pack of 6", "stock": 15, "featured": true, "trending": false, "dealOfDay": false, "rating": 4.9, "viewCount": 234},
        {"id": 9, "name": "Orange Juice", "price": 4.49, "category": "Beverages", "image": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b", "description": "Fresh squeezed orange juice, 64oz", "stock": 30, "featured": false, "trending": false, "dealOfDay": true, "rating": 4.4, "viewCount": 145},
        {"id": 10, "name": "Sparkling Water", "price": 3.99, "category": "Beverages", "image": "https://images.unsplash.com/photo-1553456558-aff63285bdd1", "description": "Refreshing sparkling water, 12 pack", "stock": 50, "featured": false, "trending": true, "dealOfDay": false, "rating": 4.0, "viewCount": 167},
        {"id": 11, "name": "Potato Chips", "price": 2.99, "category": "Snacks", "image": "https://images.unsplash.com/photo-1566478989037-eec170784d0b", "description": "Crispy potato chips, family size", "stock": 60, "featured": true, "trending": false, "dealOfDay": false, "rating": 4.3, "viewCount": 189},
        {"id": 12, "name": "Mixed Nuts", "price": 7.99, "category": "Snacks", "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32", "description": "Premium mixed nuts, healthy snacking", "stock": 25, "featured": false, "trending": false, "dealOfDay": true, "rating": 4.7, "viewCount": 112}
    ],
    "categories": [
        {"id": 1, "name": "Fruits", "description": "Fresh seasonal fruits", "icon": "🍎"},
        {"id": 2, "name": "Vegetables", "description": "Fresh organic vegetables", "icon": "🥬"},
        {"id": 3, "name": "Dairy", "description": "Milk, cheese, yogurt and more", "icon": "🥛"},
        {"id": 4, "name": "Bakery", "description": "Freshly baked goods", "icon": "🍞"},
        {"id": 5, "name": "Beverages", "description": "Drinks and juices", "icon": "🧃"},
        {"id": 6, "name": "Snacks", "description": "Healthy and tasty snacks", "icon": "🥜"}
    ],
    "drivers": [
        {
            "id": 101,
            "name": "Mike Wilson",
            "phone": "+1555123456",
            "email": "mike.wilson@quickies.com",
            "vehicle": "Honda Civic - ABC123",
            "photo": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
            "status": "active",
            "currentLocation": {
                "lat": 37.7749,
                "lng": -122.4194
            },
            "rating": 4.8,
            "totalDeliveries": 1247,
            "joinDate": "2024-01-15"
        },
        {
            "id": 102,
            "name": "Sarah Johnson", 
            "phone": "+1555789012",
            "email": "sarah.johnson@quickies.com", 
            "vehicle": "Toyota Camry - XYZ789",
            "photo": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            "status": "active",
            "currentLocation": {
                "lat": 37.7849,
                "lng": -122.4094
            },
            "rating": 4.9,
            "totalDeliveries": 892,
            "joinDate": "2024-03-20"
        }
    ]
};

// Initialize Application
function initApp() {
    // Load sample data
    appState.products = [...sampleData.products];
    appState.categories = [...sampleData.categories];
    appState.orders = [...sampleData.orders];
    appState.users = [...sampleData.users];
    appState.permissions = sampleData.permissions;
    appState.drivers = [...sampleData.drivers];
    
    // Set next IDs
    appState.nextOrderId = Math.max(...appState.orders.map(o => o.id)) + 1;
    appState.nextUserId = Math.max(...appState.users.map(u => u.id)) + 1;
    
    // Initialize page
    showLanding();
    
    // Setup event listeners
    setupEventListeners();
    
    // Simulate real-time order tracking
    startOrderTracking();
}

// Event Listeners Setup
function setupEventListeners() {
    // Traditional authentication forms
    document.getElementById('login-form').addEventListener('submit', handleTraditionalLogin);
    document.getElementById('register-form').addEventListener('submit', handleTraditionalRegister);
    
    // Admin login form
    document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
    
    // Checkout form
    document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
    
    // Password strength check
    document.getElementById('register-password').addEventListener('input', checkPasswordStrength);
    
    // Close modals on outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-dropdown')) {
            const dropdown = document.getElementById('user-dropdown');
            if (dropdown) dropdown.classList.add('hidden');
        }
    });
}

// Page Navigation Functions
function showLanding() {
    hideAllPages();
    document.getElementById('landing-page').classList.add('active');
    appState.currentPage = 'landing';
}

function showShop() {
    hideAllPages();
    document.getElementById('shop-page').classList.add('active');
    appState.currentPage = 'shop';
    
    loadCategories();
    loadProducts();
    updateCartUI();
    updateUserUI();
}

function showCheckout() {
    if (appState.cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    hideAllPages();
    document.getElementById('checkout-page').classList.add('active');
    appState.currentPage = 'checkout';
    loadCheckoutItems();
    
    // Pre-fill user data if logged in
    if (appState.user) {
        document.getElementById('customer-name').value = appState.user.name;
        document.getElementById('customer-phone').value = appState.user.phone;
    }
    
    // Close cart sidebar if open
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('active');
}

function showAdminLogin() {
    hideAllPages();
    document.getElementById('admin-login').classList.add('active');
    appState.currentPage = 'admin-login';
}

function showAdminDashboard() {
    hideAllPages();
    document.getElementById('admin-dashboard').classList.add('active');
    appState.currentPage = 'admin-dashboard';
    
    // Start admin session
    appState.adminSession = {
        user: appState.user,
        startTime: Date.now()
    };
    
    updateAdminUI();
    showDashboardSection('overview');
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// Social Authentication Functions
function showSocialAuthModal() {
    closeAllModals();
    document.getElementById('social-auth-modal').classList.remove('hidden');
}

function showTraditionalLogin() {
    closeAllModals();
    document.getElementById('login-modal').classList.remove('hidden');
}

function showTraditionalRegister() {
    closeAllModals();
    document.getElementById('register-modal').classList.remove('hidden');
}

function socialLogin(provider) {
    // Show OAuth loading modal
    document.getElementById('oauth-provider-name').textContent = 
        provider.charAt(0).toUpperCase() + provider.slice(1);
    closeAllModals();
    document.getElementById('oauth-loading-modal').classList.remove('hidden');
    
    // Simulate OAuth redirect and response
    setTimeout(() => {
        simulateOAuthResponse(provider);
    }, 2000);
}

function simulateOAuthResponse(provider) {
    // Simulate OAuth response data
    const mockResponses = {
        google: {
            id: 'google_' + Math.random().toString(36).substr(2, 9),
            email: 'user@gmail.com',
            name: 'Google User',
            picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        facebook: {
            id: 'facebook_' + Math.random().toString(36).substr(2, 9),
            email: 'user@facebook.com',
            name: 'Facebook User',
            picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
        apple: {
            id: 'apple_' + Math.random().toString(36).substr(2, 9),
            email: 'user@icloud.com',
            name: 'Apple User',
            picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        }
    };
    
    const socialData = mockResponses[provider];
    const existingUser = appState.users.find(u => u.email === socialData.email);
    
    closeModal('oauth-loading-modal');
    
    if (existingUser) {
        // Check if account linking is needed
        if (existingUser.authProvider !== provider && existingUser.authProvider !== 'email') {
            showAccountLinkingModal(existingUser, provider, socialData);
        } else {
            // Link social account to existing email account
            existingUser.authProvider = provider;
            existingUser.providerId = socialData.id;
            existingUser.profilePicture = socialData.picture;
            loginUser(existingUser);
        }
    } else {
        // Create new social account
        const newUser = {
            id: appState.nextUserId++,
            email: socialData.email,
            name: socialData.name,
            phone: '',
            role: 'customer',
            authProvider: provider,
            providerId: socialData.id,
            profilePicture: socialData.picture,
            addresses: [],
            wishlist: [],
            orderHistory: [],
            accountStatus: 'active',
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            permissions: appState.permissions.roles.customer.permissions
        };
        
        appState.users.push(newUser);
        loginUser(newUser);
        showToast(`Welcome to Quickies, ${newUser.name}!`, 'success');
    }
}

function showAccountLinkingModal(existingUser, provider, socialData) {
    appState.pendingOAuthLogin = { existingUser, provider, socialData };
    
    document.getElementById('existing-account-info').innerHTML = `
        <div class="user-info">
            <img src="${existingUser.profilePicture}" alt="${existingUser.name}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">
            <div>
                <strong>${existingUser.name}</strong>
                <div style="font-size: 12px; color: var(--color-text-secondary);">
                    Current: ${existingUser.authProvider} • Linking: ${provider}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('account-linking-modal').classList.remove('hidden');
}

function confirmAccountLinking() {
    if (!appState.pendingOAuthLogin) return;
    
    const { existingUser, provider, socialData } = appState.pendingOAuthLogin;
    
    // Link accounts
    existingUser.authProviders = existingUser.authProviders || [existingUser.authProvider];
    if (!existingUser.authProviders.includes(provider)) {
        existingUser.authProviders.push(provider);
    }
    
    existingUser.profilePicture = socialData.picture;
    
    closeModal('account-linking-modal');
    loginUser(existingUser);
    showToast('Accounts linked successfully!', 'success');
    
    appState.pendingOAuthLogin = null;
}

function cancelAccountLinking() {
    closeModal('account-linking-modal');
    appState.pendingOAuthLogin = null;
    showSocialAuthModal();
}

// Traditional Authentication Functions
function handleTraditionalLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Demo credentials for testing
    if (email === 'demo@customer.com' && password === 'customer123') {
        const demoCustomer = {
            id: 999,
            email: 'demo@customer.com',
            name: 'Demo Customer',
            phone: '+1234567890',
            role: 'customer',
            authProvider: 'email',
            profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            addresses: [],
            wishlist: [],
            orderHistory: [],
            permissions: appState.permissions.roles.customer.permissions
        };
        loginUser(demoCustomer);
        closeModal('login-modal');
        return;
    }
    
    const user = appState.users.find(u => u.email === email);
    if (user) {
        loginUser(user);
        closeModal('login-modal');
    } else {
        showToast('Invalid credentials', 'error');
    }
}

function handleTraditionalRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    
    if (appState.users.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: appState.nextUserId++,
        email,
        name,
        phone,
        role: 'customer',
        authProvider: 'email',
        providerId: null,
        profilePicture: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1472099645785-5658abf4ff4e' : '1507003211169-0a1dd7228f2d'}?w=150`,
        addresses: [],
        wishlist: [],
        orderHistory: [],
        accountStatus: 'active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        permissions: appState.permissions.roles.customer.permissions
    };
    
    appState.users.push(newUser);
    loginUser(newUser);
    closeModal('register-modal');
    showToast('Account created successfully!', 'success');
}

function loginUser(user) {
    appState.user = user;
    user.lastLogin = new Date().toISOString();
    updateUserUI();
    
    if (appState.currentPage !== 'shop') {
        showShop();
    }
}

function userLogout() {
    appState.user = null;
    updateUserUI();
    showToast('Logged out successfully', 'info');
    
    if (appState.currentPage === 'admin-dashboard') {
        showLanding();
    }
}

function updateUserUI() {
    const userGreeting = document.getElementById('user-greeting');
    const authButtons = document.getElementById('auth-buttons-header');
    const userNameDisplay = document.getElementById('user-name-display');
    const userAvatar = document.getElementById('user-avatar');
    const userRoleDisplay = document.getElementById('user-role-display');
    const adminMenuItem = document.getElementById('admin-menu-item');
    
    if (appState.user) {
        userGreeting.classList.remove('hidden');
        authButtons.classList.add('hidden');
        userNameDisplay.textContent = appState.user.name;
        
        // Update avatar
        if (appState.user.profilePicture) {
            userAvatar.innerHTML = `<img src="${appState.user.profilePicture}" alt="Profile">`;
        } else {
            userAvatar.textContent = appState.user.name.charAt(0).toUpperCase();
        }
        
        // Update role display
        const roleInfo = appState.permissions.roles[appState.user.role];
        if (roleInfo) {
            userRoleDisplay.textContent = roleInfo.name;
        }
        
        // Show admin menu for admin users
        if (hasPermission('access_admin_panel')) {
            adminMenuItem.classList.remove('hidden');
        } else {
            adminMenuItem.classList.add('hidden');
        }
    } else {
        userGreeting.classList.add('hidden');
        authButtons.classList.remove('hidden');
        adminMenuItem.classList.add('hidden');
    }
}

// RBAC Functions
function hasPermission(permission) {
    if (!appState.user) return false;
    
    const userPermissions = appState.user.permissions || [];
    
    // Super admin has all permissions
    if (userPermissions.includes('*')) return true;
    
    return userPermissions.includes(permission);
}

function checkAdminAccess() {
    return appState.user && (
        appState.user.role === 'super_admin' || 
        appState.user.role === 'admin' || 
        appState.user.role === 'manager'
    );
}

function filterAdminNavigation() {
    const navButtons = document.querySelectorAll('#admin-nav .nav-btn');
    
    navButtons.forEach(btn => {
        const section = btn.getAttribute('onclick').match(/'(\w+)'/)[1];
        
        // Define required permissions for each section
        const sectionPermissions = {
            'overview': 'access_admin_panel',
            'users': 'read_all_users',
            'orders': 'manage_orders',
            'delivery': 'assign_drivers',
            'security': '*' // Only super admin
        };
        
        const requiredPermission = sectionPermissions[section];
        if (requiredPermission && !hasPermission(requiredPermission)) {
            btn.style.display = 'none';
        }
    });
}

// Product Functions
function loadCategories() {
    const categoryFilters = document.getElementById('category-filters');
    const categoryIcons = {
        'Fruits': 'fas fa-apple-alt',
        'Vegetables': 'fas fa-carrot',
        'Dairy': 'fas fa-cheese',
        'Bakery': 'fas fa-bread-slice',
        'Beverages': 'fas fa-glass-whiskey',
        'Snacks': 'fas fa-cookie-bite'
    };
    
    let html = `
        <button class="category-btn active" data-category="all" onclick="filterByCategory('all')">
            <i class="fas fa-th-large"></i>
            All Products
        </button>
    `;
    
    appState.categories.forEach(category => {
        const icon = categoryIcons[category.name] || 'fas fa-tag';
        html += `
            <button class="category-btn" data-category="${category.name}" onclick="filterByCategory('${category.name}')">
                <i class="${icon}"></i>
                ${category.name}
            </button>
        `;
    });
    
    categoryFilters.innerHTML = html;
}

function loadProducts() {
    let filteredProducts = appState.products;
    
    // Filter by category
    if (appState.currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === appState.currentCategory
        );
    }
    
    // Filter by search query
    if (appState.searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(appState.searchQuery.toLowerCase())
        );
    }
    
    // Update title and count
    document.getElementById('products-title').textContent = 
        appState.currentCategory === 'all' ? 'All Products' : appState.currentCategory;
    document.getElementById('product-count').textContent = `${filteredProducts.length} items`;
    
    renderProducts(filteredProducts);
}

function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>No products found</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    products.forEach(product => {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn--primary add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-plus"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = html;
}

function filterByCategory(category) {
    appState.currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    loadProducts();
}

function filterProducts() {
    appState.searchQuery = document.getElementById('product-search').value;
    loadProducts();
}

// Cart Functions
function addToCart(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = appState.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    showToast(`${product.name} added to cart`, 'success');
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.productId !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, change) {
    const item = appState.cart.find(item => item.productId === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    if (appState.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        let html = '';
        appState.cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.productId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        cartItems.innerHTML = html;
        checkoutBtn.disabled = false;
    }
    
    cartTotal.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Checkout Functions
function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutDelivery = document.getElementById('checkout-delivery');
    const checkoutTotal = document.getElementById('checkout-total');
    
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 25 ? 0 : 2.99;
    const total = subtotal + deliveryFee;
    
    let html = '';
    appState.cart.forEach(item => {
        html += `
            <div class="checkout-item">
                <div class="checkout-item-info">
                    <div class="checkout-item-name">${item.name}</div>
                    <div class="checkout-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
    });
    
    checkoutItems.innerHTML = html;
    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutDelivery.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function handleCheckout(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const deliveryAddress = document.getElementById('delivery-address').value;
    const deliveryInstructions = document.getElementById('delivery-instructions').value;
    
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 25 ? 0 : 2.99;
    const total = subtotal + deliveryFee;
    
    const trackingNumber = generateTrackingNumber();
    
    const newOrder = {
        id: appState.nextOrderId++,
        userId: appState.user ? appState.user.id : null,
        customerInfo: {
            name: customerName,
            email: appState.user ? appState.user.email : 'guest@example.com',
            phone: customerPhone
        },
        items: [...appState.cart],
        subtotal,
        deliveryFee,
        total,
        status: 'placed',
        trackingNumber,
        deliveryAddress: {
            address: deliveryAddress,
            lat: 37.7749 + (Math.random() - 0.5) * 0.1,
            lng: -122.4194 + (Math.random() - 0.5) * 0.1,
            instructions: deliveryInstructions
        },
        driverId: null,
        driverInfo: null,
        statusHistory: [
            {
                status: 'placed',
                timestamp: new Date().toISOString(),
                location: 'Quickies Store',
                description: 'Order received and confirmed'
            }
        ],
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        actualDelivery: null,
        deliveryInstructions,
        paymentStatus: 'paid',
        createdAt: new Date().toISOString()
    };
    
    appState.orders.unshift(newOrder);
    
    // Add to user's order history if logged in
    if (appState.user) {
        appState.user.orderHistory.unshift(newOrder.id);
    }
    
    // Start order tracking simulation
    simulateOrderProgress(newOrder.id);
    
    // Clear cart
    appState.cart = [];
    updateCartUI();
    
    // Show confirmation
    document.getElementById('order-id').textContent = `#${newOrder.id.toString().padStart(4, '0')}`;
    document.getElementById('tracking-number').textContent = trackingNumber;
    document.getElementById('order-confirmation').classList.remove('hidden');
    
    // Reset form
    document.getElementById('checkout-form').reset();
}

function generateTrackingNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const orderNum = appState.nextOrderId.toString().padStart(5, '0');
    
    return `QK${year}${month}${day}${orderNum}`;
}

function closeOrderConfirmation() {
    document.getElementById('order-confirmation').classList.add('hidden');
    showShop();
}

function trackOrder() {
    const trackingNumber = document.getElementById('tracking-number').textContent;
    const order = appState.orders.find(o => o.trackingNumber === trackingNumber);
    
    if (order) {
        showOrderTracking(order.id);
    }
    
    closeOrderConfirmation();
}

// Order Tracking Functions
function showOrderTracking(orderId) {
    const order = appState.orders.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('order-tracking-modal');
    const header = document.getElementById('tracking-header');
    const progress = document.getElementById('tracking-progress');
    const map = document.getElementById('tracking-map');
    const driverInfo = document.getElementById('driver-info');
    const history = document.getElementById('tracking-history');
    
    // Header
    header.innerHTML = `
        <div class="tracking-number">Order #${order.id.toString().padStart(4, '0')}</div>
        <div class="tracking-status">${getStatusDisplayName(order.status)}</div>
        <div class="tracking-eta">
            ${order.actualDelivery ? 
                `Delivered at ${new Date(order.actualDelivery).toLocaleTimeString()}` :
                `ETA: ${new Date(order.estimatedDelivery).toLocaleTimeString()}`
            }
        </div>
    `;
    
    // Progress
    progress.innerHTML = renderOrderProgress(order);
    
    // Map
    map.innerHTML = renderTrackingMap(order);
    
    // Driver info
    if (order.driverInfo) {
        driverInfo.innerHTML = renderDriverInfo(order.driverInfo);
        driverInfo.style.display = 'block';
    } else {
        driverInfo.style.display = 'none';
    }
    
    // History
    history.innerHTML = renderOrderHistory(order.statusHistory);
    
    modal.classList.remove('hidden');
}

function renderOrderProgress(order) {
    const steps = [
        { key: 'placed', icon: 'fas fa-receipt', label: 'Placed' },
        { key: 'confirmed', icon: 'fas fa-check', label: 'Confirmed' },
        { key: 'preparing', icon: 'fas fa-utensils', label: 'Preparing' },
        { key: 'picked_up', icon: 'fas fa-box', label: 'Picked Up' },
        { key: 'out_for_delivery', icon: 'fas fa-truck', label: 'Out for Delivery' },
        { key: 'delivered', icon: 'fas fa-home', label: 'Delivered' }
    ];
    
    const currentStepIndex = steps.findIndex(step => step.key === order.status);
    const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
    
    let stepsHtml = '';
    steps.forEach((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        
        stepsHtml += `
            <div class="progress-step">
                <div class="step-icon ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                    <i class="${step.icon}"></i>
                </div>
                <div class="step-label ${isCompleted || isCurrent ? 'completed' : ''}">${step.label}</div>
            </div>
        `;
    });
    
    return `
        <div class="progress-steps">
            <div class="progress-bar" style="width: ${progressPercentage}%"></div>
            ${stepsHtml}
        </div>
    `;
}

function renderTrackingMap(order) {
    if (!order.driverInfo) {
        return `
            <div class="map-placeholder">
                <i class="fas fa-map-marker-alt"></i>
                <p>Order being prepared</p>
            </div>
        `;
    }
    
    return `
        <div class="map-placeholder" style="background: linear-gradient(45deg, var(--color-bg-1), var(--color-bg-3));">
            <div class="delivery-pin" style="left: 60%; top: 40%;">
                <i class="fas fa-truck"></i>
            </div>
            <div class="delivery-pin" style="left: 80%; top: 60%;">
                <i class="fas fa-home"></i>
            </div>
            <p style="margin-top: 20px; font-size: 12px;">Live GPS tracking simulation</p>
        </div>
    `;
}

function renderDriverInfo(driver) {
    return `
        <div class="driver-card">
            <img src="${driver.photo}" alt="${driver.name}" class="driver-avatar">
            <div class="driver-details">
                <h4>${driver.name}</h4>
                <div class="driver-meta">${driver.vehicle}</div>
                <div class="driver-actions">
                    <button class="btn btn--outline btn--sm" onclick="callDriver('${driver.phone}')">
                        <i class="fas fa-phone"></i>
                        Call
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="messageDriver('${driver.name}')">
                        <i class="fas fa-comment"></i>
                        Message
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderOrderHistory(statusHistory) {
    let html = '<div class="history-timeline">';
    
    statusHistory.reverse().forEach(entry => {
        html += `
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-circle"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-time">
                        ${new Date(entry.timestamp).toLocaleString()}
                    </div>
                    <div class="timeline-description">${entry.description}</div>
                    <div class="timeline-location">${entry.location}</div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return `<h4>Order Timeline</h4>${html}`;
}

function callDriver(phone) {
    showToast(`Calling ${phone}...`, 'info');
}

function messageDriver(name) {
    showToast(`Opening chat with ${name}...`, 'info');
}

function getStatusDisplayName(status) {
    const statusMap = {
        'placed': 'Order Placed',
        'confirmed': 'Order Confirmed',
        'preparing': 'Being Prepared',
        'picked_up': 'Picked Up',
        'out_for_delivery': 'Out for Delivery',
        'delivered': 'Delivered'
    };
    return statusMap[status] || status;
}

function simulateOrderProgress(orderId) {
    const order = appState.orders.find(o => o.id === orderId);
    if (!order) return;
    
    const statuses = ['confirmed', 'preparing', 'picked_up', 'out_for_delivery', 'delivered'];
    let currentIndex = 0;
    
    const progressTimer = setInterval(() => {
        if (currentIndex >= statuses.length || order.status === 'delivered') {
            clearInterval(progressTimer);
            return;
        }
        
        const newStatus = statuses[currentIndex];
        order.status = newStatus;
        
        // Add to status history
        const statusEntry = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            location: getLocationForStatus(newStatus),
            description: getDescriptionForStatus(newStatus)
        };
        
        order.statusHistory.push(statusEntry);
        
        // Assign driver for pickup
        if (newStatus === 'picked_up' && !order.driverId) {
            const availableDriver = appState.drivers[Math.floor(Math.random() * appState.drivers.length)];
            order.driverId = availableDriver.id;
            order.driverInfo = availableDriver;
        }
        
        // Mark as delivered
        if (newStatus === 'delivered') {
            order.actualDelivery = new Date().toISOString();
        }
        
        currentIndex++;
    }, Math.random() * 30000 + 15000); // Random interval between 15-45 seconds
    
    // Store timer reference for cleanup
    appState.trackingOrders[orderId] = progressTimer;
}

function getLocationForStatus(status) {
    const locations = {
        'confirmed': 'Quickies Store',
        'preparing': 'Store Kitchen',
        'picked_up': 'Quickies Store',
        'out_for_delivery': 'En Route',
        'delivered': 'Customer Address'
    };
    return locations[status] || 'Unknown';
}

function getDescriptionForStatus(status) {
    const descriptions = {
        'confirmed': 'Payment verified, preparing order',
        'preparing': 'Items being picked and prepared',
        'picked_up': 'Driver collected order for delivery',
        'out_for_delivery': 'Order on the way to delivery address',
        'delivered': 'Order successfully delivered'
    };
    return descriptions[status] || 'Status updated';
}

function startOrderTracking() {
    // Start tracking for existing active orders
    appState.orders.forEach(order => {
        if (order.status !== 'delivered' && !appState.trackingOrders[order.id]) {
            simulateOrderProgress(order.id);
        }
    });
}

// Admin Functions
function handleAdminLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    // Check for admin users in the users array first
    const adminUser = appState.users.find(u => 
        u.email === email && 
        (u.role === 'super_admin' || u.role === 'admin' || u.role === 'manager')
    );
    
    // Also check demo admin credentials
    const isValidAdmin = adminUser || (email === 'admin@quickies.com' && password === 'admin123');
    
    if (isValidAdmin) {
        // Set the logged in user
        if (adminUser) {
            appState.user = adminUser;
        } else {
            // Use demo admin (first admin user from sample data)
            appState.user = appState.users.find(u => u.role === 'super_admin') || appState.users[0];
        }
        
        showAdminDashboard();
        showToast('Admin access granted', 'success');
        document.getElementById('admin-login-form').reset();
    } else {
        showToast('Invalid admin credentials', 'error');
    }
}

function adminLogout() {
    appState.adminSession = null;
    appState.user = null;
    showLanding();
    showToast('Admin logged out', 'info');
}

function updateAdminUI() {
    const adminUserName = document.getElementById('admin-user-name');
    const adminUserRole = document.getElementById('admin-user-role');
    
    if (appState.user) {
        adminUserName.textContent = appState.user.name;
        const roleInfo = appState.permissions.roles[appState.user.role];
        adminUserRole.textContent = roleInfo ? roleInfo.name : appState.user.role;
    }
    
    filterAdminNavigation();
}

function showDashboardSection(section) {
    appState.currentAdminSection = section;
    
    // Update nav buttons
    document.querySelectorAll('#admin-nav .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const targetBtn = document.querySelector(`#admin-nav [onclick="showDashboardSection('${section}')"]`);
    if (targetBtn) targetBtn.classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`admin-${section}`);
    if (targetSection) targetSection.classList.add('active');
    
    // Load section data
    switch (section) {
        case 'overview':
            loadDashboardOverview();
            break;
        case 'users':
            loadUsersManagement();
            break;
        case 'orders':
            loadOrdersManagement();
            break;
        case 'delivery':
            loadDeliveryManagement();
            break;
        case 'security':
            loadSecurityManagement();
            break;
    }
}

function loadDashboardOverview() {
    // Update stats
    document.getElementById('total-users').textContent = appState.users.length;
    document.getElementById('total-orders').textContent = appState.orders.length;
    document.getElementById('active-deliveries').textContent = 
        appState.orders.filter(o => o.status === 'out_for_delivery').length;
    
    const totalRevenue = appState.orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;
    
    // Load recent activity
    const recentActivity = document.getElementById('recent-activity');
    recentActivity.innerHTML = `
        <div class="card">
            <div class="card__body">
                <h3>Recent Activity</h3>
                <div class="activity-list">
                    ${generateRecentActivity()}
                </div>
            </div>
        </div>
    `;
}

function generateRecentActivity() {
    const activities = [];
    
    // Recent orders
    appState.orders.slice(0, 3).forEach(order => {
        activities.push({
            icon: 'fas fa-shopping-bag',
            text: `New order #${order.id} from ${order.customerInfo.name}`,
            time: new Date(order.createdAt).toLocaleString(),
            type: 'order'
        });
    });
    
    // Recent user registrations
    appState.users.filter(u => u.createdAt).slice(0, 2).forEach(user => {
        activities.push({
            icon: 'fas fa-user-plus',
            text: `New user registration: ${user.name}`,
            time: new Date(user.createdAt).toLocaleString(),
            type: 'user'
        });
    });
    
    return activities.map(activity => `
        <div class="activity-item" style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--color-card-border-inner);">
            <div class="activity-icon" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-bg-1); display: flex; align-items: center; justify-content: center;">
                <i class="${activity.icon}" style="color: var(--color-primary); font-size: 14px;"></i>
            </div>
            <div class="activity-content" style="flex: 1;">
                <div style="font-size: 14px; color: var(--color-text);">${activity.text}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

function loadUsersManagement() {
    if (!hasPermission('read_all_users')) {
        document.getElementById('users-table').innerHTML = `
            <div class="card">
                <div class="card__body">
                    <p>Access denied. You don't have permission to view user data.</p>
                </div>
            </div>
        `;
        return;
    }
    
    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Auth Provider</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    appState.users.forEach(user => {
        html += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${user.profilePicture}" alt="${user.name}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="role-badge role-badge--${user.role}">${appState.permissions.roles[user.role]?.name || user.role}</span></td>
                <td>
                    <span style="text-transform: capitalize;">${user.authProvider}</span>
                    ${user.authProviders ? `<br><small>+${user.authProviders.length - 1} more</small>` : ''}
                </td>
                <td><small>${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</small></td>
                <td class="table-actions">
                    ${hasPermission('*') ? `
                        <button class="action-btn action-btn--edit" onclick="showRoleAssignment(${user.id})">
                            <i class="fas fa-user-cog"></i>
                        </button>
                    ` : ''}
                    <button class="action-btn action-btn--view" onclick="viewUserDetails(${user.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    document.getElementById('users-table').innerHTML = `
        <div class="admin-table">
            ${html}
        </div>
    `;
}

function loadOrdersManagement() {
    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    appState.orders.forEach(order => {
        const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        html += `
            <tr>
                <td>
                    <div>
                        <strong>#${order.id.toString().padStart(4, '0')}</strong>
                        <br><small>${order.trackingNumber}</small>
                    </div>
                </td>
                <td>
                    <div>
                        <div>${order.customerInfo.name}</div>
                        <small>${order.customerInfo.email}</small>
                    </div>
                </td>
                <td>${itemsCount} items</td>
                <td>$${order.total.toFixed(2)}</td>
                <td><span class="status-badge status-badge--${order.status.replace(' ', '_')}">${getStatusDisplayName(order.status)}</span></td>
                <td><small>${new Date(order.createdAt).toLocaleDateString()}</small></td>
                <td class="table-actions">
                    <button class="action-btn action-btn--view" onclick="showOrderTracking(${order.id})">
                        <i class="fas fa-truck"></i>
                    </button>
                    ${hasPermission('manage_orders') ? `
                        <button class="action-btn action-btn--edit" onclick="updateOrderStatus(${order.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    document.getElementById('orders-table').innerHTML = `
        <div class="admin-table">
            ${html}
        </div>
    `;
}

function loadDeliveryManagement() {
    const activeDeliveries = appState.orders.filter(o => 
        o.status === 'out_for_delivery' || o.status === 'picked_up'
    );
    
    let html = `
        <div class="delivery-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-truck"></i></div>
                <div class="stat-content">
                    <h3>${activeDeliveries.length}</h3>
                    <p>Active Deliveries</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-users"></i></div>
                <div class="stat-content">
                    <h3>${appState.drivers.length}</h3>
                    <p>Active Drivers</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-clock"></i></div>
                <div class="stat-content">
                    <h3>28min</h3>
                    <p>Avg Delivery Time</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card__body">
                <h3>Live Deliveries</h3>
                <div class="delivery-list">
                    ${activeDeliveries.length === 0 ? '<p>No active deliveries</p>' : 
                        activeDeliveries.map(order => renderDeliveryItem(order)).join('')
                    }
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('delivery-dashboard').innerHTML = html;
}

function renderDeliveryItem(order) {
    return `
        <div class="delivery-item" style="display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--color-card-border); border-radius: 8px; margin-bottom: 12px;">
            <div class="delivery-status-icon" style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-truck"></i>
            </div>
            <div class="delivery-details" style="flex: 1;">
                <div style="font-weight: 600;">Order #${order.id.toString().padStart(4, '0')}</div>
                <div style="font-size: 14px; color: var(--color-text-secondary);">
                    ${order.customerInfo.name} • ${order.deliveryAddress.address}
                </div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">
                    Driver: ${order.driverInfo ? order.driverInfo.name : 'Assigning...'}
                </div>
            </div>
            <div class="delivery-actions">
                <button class="btn btn--outline btn--sm" onclick="showOrderTracking(${order.id})">
                    <i class="fas fa-map-marker-alt"></i>
                    Track
                </button>
            </div>
        </div>
    `;
}

function loadSecurityManagement() {
    if (!hasPermission('*')) {
        document.getElementById('security-dashboard').innerHTML = `
            <div class="card">
                <div class="card__body">
                    <p>Access denied. Only super administrators can access security settings.</p>
                </div>
            </div>
        `;
        return;
    }
    
    document.getElementById('security-dashboard').innerHTML = `
        <div class="security-overview" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 32px;">
            <div class="card">
                <div class="card__body">
                    <h4><i class="fas fa-shield-alt"></i> Role-Based Access Control</h4>
                    <div style="margin-top: 16px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Super Admins:</span>
                            <strong>${appState.users.filter(u => u.role === 'super_admin').length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Administrators:</span>
                            <strong>${appState.users.filter(u => u.role === 'admin').length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Managers:</span>
                            <strong>${appState.users.filter(u => u.role === 'manager').length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Customers:</span>
                            <strong>${appState.users.filter(u => u.role === 'customer').length}</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card__body">
                    <h4><i class="fas fa-users-cog"></i> Authentication Methods</h4>
                    <div style="margin-top: 16px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Email/Password:</span>
                            <strong>${appState.users.filter(u => u.authProvider === 'email').length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Google:</span>
                            <strong>${appState.users.filter(u => u.authProvider === 'google').length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Facebook:</span>
                            <strong>${appState.users.filter(u => u.authProvider === 'facebook').length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Apple ID:</span>
                            <strong>${appState.users.filter(u => u.authProvider === 'apple').length}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card__body">
                <h3>Role Permissions Matrix</h3>
                <div class="permissions-matrix" style="margin-top: 16px;">
                    ${renderPermissionsMatrix()}
                </div>
            </div>
        </div>
    `;
}

function renderPermissionsMatrix() {
    const roles = appState.permissions.roles;
    const allPermissions = new Set();
    
    // Collect all permissions
    Object.values(roles).forEach(role => {
        if (Array.isArray(role.permissions)) {
            role.permissions.forEach(perm => {
                if (perm !== '*') allPermissions.add(perm);
            });
        }
    });
    
    let html = `
        <table class="table" style="font-size: 12px;">
            <thead>
                <tr>
                    <th>Permission</th>
                    ${Object.keys(roles).map(role => `
                        <th style="text-align: center;">
                            <div style="writing-mode: vertical-lr; text-orientation: mixed;">${roles[role].name}</div>
                        </th>
                    `).join('')}
                </tr>
            </thead>
            <tbody>
    `;
    
    Array.from(allPermissions).forEach(permission => {
        html += `
            <tr>
                <td style="font-weight: 500;">${permission.replace(/_/g, ' ')}</td>
                ${Object.keys(roles).map(roleKey => {
                    const role = roles[roleKey];
                    const hasPermission = role.permissions.includes('*') || role.permissions.includes(permission);
                    return `
                        <td style="text-align: center;">
                            <i class="fas fa-${hasPermission ? 'check' : 'times'}" 
                               style="color: var(--color-${hasPermission ? 'success' : 'error'});"></i>
                        </td>
                    `;
                }).join('')}
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    return html;
}

// Role Management Functions
function showRoleAssignment(userId) {
    if (!hasPermission('*')) {
        showToast('Access denied', 'error');
        return;
    }
    
    const user = appState.users.find(u => u.id === userId);
    if (!user) return;
    
    // Populate user info
    document.getElementById('role-assignment-user').innerHTML = `
        <img src="${user.profilePicture}" alt="${user.name}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">
        <div>
            <strong>${user.name}</strong>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${user.email}</div>
        </div>
    `;
    
    // Set current role
    document.getElementById('role-select').value = user.role;
    
    // Update permissions display
    updatePermissionsDisplay(user.role);
    
    // Store user ID for later use
    window.currentEditingUserId = userId;
    
    document.getElementById('role-assignment-modal').classList.remove('hidden');
}

function updatePermissionsDisplay(role) {
    const roleData = appState.permissions.roles[role];
    if (!roleData) return;
    
    const permissionsDiv = document.getElementById('role-permissions');
    
    if (roleData.permissions.includes('*')) {
        permissionsDiv.innerHTML = `
            <h4 style="color: var(--color-error);">⚠️ Super Administrator</h4>
            <p>Full system access - all permissions granted</p>
        `;
    } else {
        permissionsDiv.innerHTML = `
            <h4>Permissions for ${roleData.name}</h4>
            <ul class="permission-list">
                ${roleData.permissions.map(perm => `
                    <li>${perm.replace(/_/g, ' ')}</li>
                `).join('')}
            </ul>
            <p style="font-size: 12px; color: var(--color-text-secondary);">
                ${roleData.description}
            </p>
        `;
    }
}

function updateUserRole() {
    if (!window.currentEditingUserId) return;
    
    const user = appState.users.find(u => u.id === window.currentEditingUserId);
    const newRole = document.getElementById('role-select').value;
    
    if (!user) return;
    
    const oldRole = user.role;
    user.role = newRole;
    user.permissions = appState.permissions.roles[newRole].permissions;
    
    closeModal('role-assignment-modal');
    loadUsersManagement();
    showToast(`User role updated from ${oldRole} to ${newRole}`, 'success');
    
    window.currentEditingUserId = null;
}

// Add event listener for role select change
document.addEventListener('DOMContentLoaded', function() {
    const roleSelect = document.getElementById('role-select');
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            updatePermissionsDisplay(this.value);
        });
    }
});

function viewUserDetails(userId) {
    const user = appState.users.find(u => u.id === userId);
    if (!user) return;
    
    showToast(`Viewing details for ${user.name}`, 'info');
}

function updateOrderStatus(orderId) {
    if (!hasPermission('manage_orders')) {
        showToast('Access denied', 'error');
        return;
    }
    
    showToast('Order status update feature would open here', 'info');
}

// Profile Functions
function showProfileModal() {
    if (!appState.user) {
        showSocialAuthModal();
        return;
    }
    
    showToast('Profile modal would open here', 'info');
}

function showOrderHistory() {
    if (!appState.user || !appState.user.orderHistory.length) {
        showToast('No order history found', 'info');
        return;
    }
    
    showToast('Order history would display here', 'info');
}

function showWishlist() {
    if (!appState.user || !appState.user.wishlist.length) {
        showToast('Your wishlist is empty', 'info');
        return;
    }
    
    showToast('Wishlist would display here', 'info');
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('hidden');
}

function checkPasswordStrength() {
    const password = document.getElementById('register-password').value;
    const strengthDiv = document.getElementById('password-strength');
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength === 0) {
        strengthDiv.innerHTML = '';
    } else if (strength <= 2) {
        strengthDiv.innerHTML = '<span class="strength-weak">Weak password</span>';
    } else if (strength === 3) {
        strengthDiv.innerHTML = '<span class="strength-medium">Medium password</span>';
    } else {
        strengthDiv.innerHTML = '<span class="strength-strong">Strong password</span>';
    }
}

// Utility Functions
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMessage = document.getElementById('toast-message');
    
    // Set icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
    toastMessage.textContent = message;
    
    // Remove existing classes and add new one
    toast.className = `toast toast-${type} show`;
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('show');
    }, 3000);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);