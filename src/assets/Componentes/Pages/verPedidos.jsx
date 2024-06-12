import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';

import "../Pages/pedidos.css"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH,
    projectId: import.meta.env.VITE_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

function verPedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        async function getProdutos(db) {
            const querySnapshot = await getDocs(collection(db, "pedidosAbertos"));
            const pedidosArray = []; //armazenar coleção no array
            querySnapshot.forEach((doc) => {
                pedidosArray.push(doc.data());
            });
            setPedidos(pedidosArray);
        }
        getProdutos(db);
    }, []);

    return (
        <section className='corpo'>
            <div className='pedidos'>
                <h1>Pedidos</h1>
               
               

                <div className='header'>
                    <div className='nMesa'>
                        <h1>Numero Mesas</h1>
                        {pedidos.map((pedido, index) => (
                            <h1 key={index}>Mesa: {pedido.mesa}</h1>
                        ))}
                    </div>


                    <div>
                        <h1>Porções/Lanches</h1>
                        
                            {pedidos.map((pedido) => (
                                <div className='porcoes'>
                                    {pedido.pedidos.map((doc, index) => (
                                    <h1 key={index}>{" " + doc.name + ": " + doc.quantidade}, </h1>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default verPedidos;