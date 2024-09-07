import React, { useEffect, useState } from 'react';
import { firestore, auth } from './firebase';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verifica si el usuario está autenticado y es admin
        const checkUser = async () => {
            const user = auth.currentUser;
            if (user) {
                // Aquí puedes verificar si el usuario tiene el rol de admin
                // Por simplicidad, vamos a asumir que si el email contiene "admin", es admin
                setIsAdmin(user.email.includes("admin"));
                // Carga los productos
                const snapshot = await firestore.collection('products').get();
                setProducts(snapshot.docs.map(doc => doc.data()));
            }
        };
        checkUser();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - ${product.price}</li>
                ))}
            </ul>
            {isAdmin && <a href="/add-product">Add Product</a>}
        </div>
    );
};

export default Dashboard;
