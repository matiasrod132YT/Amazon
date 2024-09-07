import React, { useState } from 'react';
import { firestore } from './firebase';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await firestore.collection('products').add({
                name,
                price: parseFloat(price),
            });
            // Redirige al dashboard después de agregar el producto
            window.location.href = '/dashboard';
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <input type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
