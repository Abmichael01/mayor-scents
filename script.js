// Product data - Perfumes
const products = [
    {
        id: 1,
        name: "Golden Amber",
        description: "A luxurious blend of amber, vanilla, and sandalwood.",
        price: 3500,
        oldPrice: 4500,
        image: "perfume1.jpg",
        category: "women",
        badge: "women",
        size: "50ml"
    },
    {
        id: 2,
        name: "Midnight Gold",
        description: "Deep and mysterious with notes of oud, amber, and musk.",
        price: 4200,
        oldPrice: null,
        image: "perfume2.jpg",
        category: "unisex",
        badge: "unisex",
        size: "100ml"
    },
    {
        id: 3,
        name: "Amber Woods",
        description: "Warm and sophisticated with woody and spicy notes.",
        price: 3800,
        oldPrice: 4800,
        image: "perfume3.jpg",
        category: "men",
        badge: "men",
        size: "75ml"
    },
    {
        id: 4,
        name: "Honey Elixir",
        description: "A sweet composition of honey, vanilla, and caramel.",
        price: 3200,
        oldPrice: null,
        image: "perfume4.jpg",
        category: "women",
        badge: "women",
        size: "50ml"
    },
    {
        id: 5,
        name: "Royal Oud",
        description: "Sophisticated blend of oud, leather, and exotic spices.",
        price: 4500,
        oldPrice: 5500,
        image: "perfume5.jpg",
        category: "men",
        badge: "men",
        size: "100ml"
    },
    {
        id: 6,
        name: "Amber Sunset",
        description: "Warm amber and vanilla create a cozy, inviting scent.",
        price: 3900,
        oldPrice: null,
        image: "perfume6.jpg",
        category: "unisex",
        badge: "unisex",
        size: "75ml"
    }
];

// WhatsApp number
const whatsappNumber = "+2348001234567"; // Replace with actual number

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts('all');
    
    // Set up event listeners
    setupEventListeners();
    
    // Add scroll animation
    setupScrollAnimation();
    
    // Setup mobile menu
    setupMobileMenu();
});

// Display products based on category
function displayProducts(category) {
    // Clear the product grid
    productGrid.innerHTML = '';
    
    // Filter products based on category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Create and append product cards
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create the product image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-image';
    imageDiv.style.backgroundColor = getPerfumeColor(product.category);
    
    // Add badge if exists
    if (product.badge) {
        const badge = document.createElement('span');
        badge.className = `product-badge ${product.badge}`;
        badge.textContent = product.badge;
        imageDiv.appendChild(badge);
    }
    
    // Create product info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info';
    
    // Product name
    const name = document.createElement('h3');
    name.textContent = product.name;
    
    // Product description
    const description = document.createElement('p');
    description.textContent = product.description;
    
    // Size information
    const sizeInfo = document.createElement('p');
    sizeInfo.textContent = `Size: ${product.size}`;
    sizeInfo.style.fontWeight = '500';
    
    // Price information
    const priceDiv = document.createElement('div');
    priceDiv.className = 'product-price';
    
    const currentPrice = document.createElement('span');
    currentPrice.className = 'current-price';
    currentPrice.textContent = `₦${product.price}`;
    
    priceDiv.appendChild(currentPrice);
    
    // Add old price if exists
    if (product.oldPrice) {
        const oldPrice = document.createElement('span');
        oldPrice.className = 'old-price';
        oldPrice.textContent = `₦${product.oldPrice}`;
        priceDiv.appendChild(oldPrice);
    }
    
    // Product actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'product-actions';
    
    const buyNowBtn = document.createElement('a');
    buyNowBtn.className = 'buy-now';
    buyNowBtn.textContent = 'Buy Now';
    buyNowBtn.href = createWhatsAppLink(product);
    buyNowBtn.target = '_blank';
    
    // Append all elements
    actionsDiv.appendChild(buyNowBtn);
    
    infoDiv.appendChild(name);
    infoDiv.appendChild(description);
    infoDiv.appendChild(sizeInfo);
    infoDiv.appendChild(priceDiv);
    infoDiv.appendChild(actionsDiv);
    
    card.appendChild(imageDiv);
    card.appendChild(infoDiv);
    
    return card;
}

// Create WhatsApp link with pre-filled message
function createWhatsAppLink(product) {
    const message = `Hello Mayor Scents I will like to purchase this "${product.name}"`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Get a color based on perfume category
function getPerfumeColor(category) {
    switch(category) {
        case 'women':
            return '#f8e8d4'; // Light amber
        case 'men':
            return '#e6d2b5'; // Light brown
        case 'unisex':
            return '#f0e6d2'; // Light gold
        default:
            return '#f0e6d2';
    }
}

// Set up mobile menu
function setupMobileMenu() {
    // Create menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
}

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and display products
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Set up scroll animation for elements
function setupScrollAnimation() {
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        // Add sticky class to nav when scrolled
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
}