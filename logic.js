
        // Food Data
        const foodData = [
            {
                id: 1,
                name: "Margherita Pizza",
                category: "pizza",
                price: 299,
                description: "Fresh basil, mozzarella, and tomato sauce on crispy crust",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
                badge: "Popular"
            },
            {
                id: 2,
                name: "Chicken Supreme Pizza",
                category: "pizza",
                price: 449,
                description: "Loaded with chicken, pepperoni, mushrooms, and cheese",
                image: "https://images.unsplash.com/photo-1734099387978-463d8fd09678?auto=format&fit=crop&w=600&q=80",
                badge: "Bestseller"
            },
            {
                id: 3,
                name: "Classic Burger",
                category: "burger",
                price: 199,
                description: "Juicy beef patty with lettuce, tomato, and special sauce",
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
                badge: "Hot"
            },
            {
                id: 4,
                name: "Chicken Deluxe Burger",
                category: "burger",
                price: 249,
                description: "Grilled chicken breast with cheese and fresh vegetables",
                image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=600&q=80",
                badge: "New"
            },
            {
                id: 5,
                name: "Chocolate Cake",
                category: "dessert",
                price: 149,
                description: "Rich chocolate cake with creamy frosting",
                image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?auto=format&fit=crop&w=600&q=80",
                badge: "Sweet"
            },
            {
                id: 6,
                name: "Strawberry Cheesecake",
                category: "dessert",
                price: 179,
                description: "Creamy cheesecake topped with fresh strawberries",
                image: "https://images.unsplash.com/photo-1676300185983-d5f242babe34?auto=format&fit=crop&w=600&q=80",
                badge: "Premium"
            },
            {
                id: 7,
                name: "Cola",
                category: "drinks",
                price: 59,
                description: "Refreshing cold cola drink",
                image: "https://images.unsplash.com/photo-1648569883125-d01072540b4c?auto=format&fit=crop&w=600&q=80",
                badge: "Refreshing"
            },
            {
                id: 8,
                name: "Fresh Orange Juice",
                category: "drinks",
                price: 89,
                description: "Freshly squeezed orange juice, rich in vitamin C",
                image: "https://images.unsplash.com/photo-1641659735894-45046caad624?auto=format&fit=crop&w=600&q=80",
                badge: "Healthy"
            },
            {
                id: 9,
                name: "Chicken Fried Rice",
                category: "chinese",
                price: 189,
                description: "Wok-tossed rice with chicken, vegetables, and soy sauce",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
                badge: "Spicy"
            },
            {
                id: 10,
                name: "Vegetable Hakka Noodles",
                category: "chinese",
                price: 159,
                description: "Stir-fried noodles with fresh vegetables and Chinese spices",
                image: "https://images.unsplash.com/photo-1644159414617-a4071b251c57?auto=format&fit=crop&w=600&q=80",
                badge: "Vegetarian"
            },
            {
                id: 11,
                name: "Butter Chicken",
                category: "indian",
                price: 299,
                description: "Tender chicken in rich, creamy tomato-based curry",
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
                badge: "Authentic"
            },
            {
                id: 12,
                name: "Paneer Tikka Masala",
                category: "indian",
                price: 249,
                description: "Grilled paneer cubes in spiced tomato gravy",
                image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
                badge: "Vegetarian"
            }
        ];



        // Cart functionality
        let cart = [];
        let orders = [];
        let currentCategory = 'all';

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function () {
            displayFoodItems();
            updateCartUI();
        });

        // Display food items
        function displayFoodItems(items = foodData) {
            const foodGrid = document.getElementById('foodGrid');
            foodGrid.innerHTML = '';

            items.forEach(item => {
                const cartItem = cart.find(cartItem => cartItem.id === item.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                const foodCard = document.createElement('div');
                foodCard.className = 'food-card';
                foodCard.innerHTML = `
                    <div class="food-image" style="background-image: url('${item.image}')">
                        <div class="food-badge">${item.badge}</div>
                    </div>
                    <div class="food-info">
                        <h3 class="food-name">${item.name}</h3>
                        <p class="food-description">${item.description}</p>
                        <div class="food-price">₹${item.price}</div>
                        <div class="food-actions">
                            ${quantity === 0 ?
                        `<button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>` :
                        `<div class="quantity-controls">
                                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${quantity - 1})">-</button>
                                    <span class="qty-display">${quantity}</span>
                                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${quantity + 1})">+</button>
                                </div>`
                    }
                        </div>
                    </div>
                `;
                foodGrid.appendChild(foodCard);
            });
        }

        // Filter by category
        function filterByCategory(category) {
            currentCategory = category;

            // Update category card active state
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });

            if (category !== 'all') {
                event.target.closest('.category-card').classList.add('active');
                const filteredItems = foodData.filter(item => item.category === category);
                displayFoodItems(filteredItems);
            } else {
                displayFoodItems();
            }
        }

        // Search functionality
        function searchFood() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

            if (searchTerm === '') {
                displayFoodItems();
                return;
            }

            const filteredItems = foodData.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );

            displayFoodItems(filteredItems);

            // Update the page title to show search results
            const foodSection = document.querySelector('.food-section h2');
            if (filteredItems.length > 0) {
                foodSection.textContent = `Search Results for "${searchTerm}" (${filteredItems.length} items)`;
            } else {
                foodSection.textContent = `No results found for "${searchTerm}"`;
            }
        }

        // Add search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchFood();
            }
        });

        // Add to cart
        function addToCart(itemId) {
            const item = foodData.find(item => item.id === itemId);
            const existingItem = cart.find(cartItem => cartItem.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...item,
                    quantity: 1
                });
            }

            updateCartUI();
            displayFoodItems(getCurrentItems());
            showAddToCartAnimation();
        }

        // Update quantity
        function updateQuantity(itemId, newQuantity) {
            if (newQuantity === 0) {
                cart = cart.filter(item => item.id !== itemId);
            } else {
                const item = cart.find(cartItem => cartItem.id === itemId);
                if (item) {
                    item.quantity = newQuantity;
                }
            }

            updateCartUI();
            displayFoodItems(getCurrentItems());
        }

        // Get current items based on filter
        function getCurrentItems() {
            if (currentCategory === 'all') {
                return foodData;
            }
            return foodData.filter(item => item.category === currentCategory);
        }

        // Update cart UI
        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

            // Update cart items
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price} x ${item.quantity}</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                `).join('');
            }

            // Update total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: ₹${total}`;
        }

        // Toggle cart sidebar
        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.toggle('open');
        }

        // Show add to cart animation
        function showAddToCartAnimation() {
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.animation = 'none';
            setTimeout(() => {
                cartIcon.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
        }

        // Proceed to checkout
        function proceedToCheckout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            toggleCart();
            showCheckoutPage();
        }

        // Show checkout page
        function showCheckoutPage() {
            document.getElementById('homePage').style.display = 'none';
            document.getElementById('checkoutPage').style.display = 'block';
            document.getElementById('orderConfirmation').style.display = 'none';

            // Populate checkout items
            const checkoutItems = document.getElementById('checkoutItems');
            const checkoutTotal = document.getElementById('checkoutTotal');

            checkoutItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</div>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const deliveryFee = 29;
            const finalTotal = total + deliveryFee;

            checkoutTotal.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Subtotal:</span>
                    <span>₹${total}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Delivery Fee:</span>
                    <span>₹${deliveryFee}</span>
                </div>
                <hr style="margin: 1rem 0;">
                <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold;">
                    <span>Total:</span>
                    <span>₹${finalTotal}</span>
                </div>
            `;
        }

        // Place order
        function placeOrder() {
            const form = document.getElementById('orderForm');

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Show loading
            const placeOrderBtn = document.querySelector('.place-order-btn');
            const originalText = placeOrderBtn.textContent;
            placeOrderBtn.innerHTML = '<div class="loading"></div> Placing Order...';
            placeOrderBtn.disabled = true;

            // Simulate order processing
            setTimeout(() => {
                const orderNumber = 'ORD' + Date.now();
                const orderData = {
                    orderNumber: orderNumber,
                    items: [...cart],
                    customerInfo: {
                        name: document.getElementById('fullName').value,
                        phone: document.getElementById('phone').value,
                        email: document.getElementById('email').value,
                        address: document.getElementById('address').value,
                        paymentMethod: document.getElementById('paymentMethod').value,
                        specialInstructions: document.getElementById('specialInstructions').value
                    },
                    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 29,
                    timestamp: new Date().toISOString(),
                    status: 'confirmed'
                };

                orders.push(orderData);

                // Clear cart
                cart = [];
                updateCartUI();

                // Show confirmation
                showOrderConfirmation(orderNumber);

                // Reset form and button
                form.reset();
                placeOrderBtn.textContent = originalText;
                placeOrderBtn.disabled = false;
            }, 2000);
        }

        // Show order confirmation
        function showOrderConfirmation(orderNumber) {
            document.getElementById('checkoutPage').style.display = 'none';
            document.getElementById('orderConfirmation').style.display = 'block';
            document.getElementById('orderNumber').textContent = `Order #: ${orderNumber}`;
        }

        // Show home page
        function showHomePage() {
            document.getElementById('homePage').style.display = 'block';
            document.getElementById('checkoutPage').style.display = 'none';
            document.getElementById('orderConfirmation').style.display = 'none';

            // Reset category filter
            currentCategory = 'all';
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });

            // Reset search
            document.getElementById('searchInput').value = '';
            document.querySelector('.food-section h2').textContent = 'Popular Items';

            displayFoodItems();
        }

        // Show menu (same as home for now)
        function showMenu() {
            showHomePage();
        }

        // Show orders
        function showOrders() {
            if (orders.length === 0) {
                alert('No orders yet! Place your first order to see it here.');
                return;
            }

            let ordersList = orders.map(order => `
                <div style="background: white; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h4>${order.orderNumber}</h4>
                    <p>Date: ${new Date(order.timestamp).toLocaleDateString()}</p>
                    <p>Total: ₹${order.total}</p>
                    <p>Status: <span style="color: #2ecc71; font-weight: bold;">✅ ${order.status}</span></p>
                    <p>Items: ${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</p>
                </div>
            `).join('');

            alert(`Your Orders:\n\n${orders.map(order =>
                `${order.orderNumber} - ₹${order.total} - ${order.status.toUpperCase()}`
            ).join('\n')}`);
        }

        // Add CSS animation for pulse effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Close cart when clicking outside
        document.addEventListener('click', function (e) {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartIcon = document.querySelector('.cart-icon');

            if (cartSidebar.classList.contains('open') &&
                !cartSidebar.contains(e.target) &&
                !cartIcon.contains(e.target)) {
                toggleCart();
            }
        });

        // Smooth scrolling for better UX
        function smoothScrollTo(element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Add some interactive feedback
        document.addEventListener('DOMContentLoaded', function () {
            // Add hover effects to buttons
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-2px)';
                });
                button.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0)';
                });
            });
        });