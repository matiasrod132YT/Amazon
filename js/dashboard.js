// dashboard.js

import { auth, db } from './firebase.js';
import { signOutUser, checkAuthState } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('signOutButton');
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            signOutUser()
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error during sign out:", error.message);
                });
        });
    }

    checkAuthState((user) => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            loadProducts();
        }
    });
});

function loadProducts() {
    const productsContainer = document.getElementById('products');
    // Example products (replace with dynamic data from Firestore)
    const exampleProducts = [
        { id: '1', name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
    ];

    exampleProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    // Logic to add product to cart (e.g., save to localStorage or update Firestore)
    console.log(`Product ${productId} added to cart.`);
}

document.getElementById('checkoutButton').addEventListener('click', () => {
    // Logic for checkout process
    console.log('Checkout button clicked.');
});
