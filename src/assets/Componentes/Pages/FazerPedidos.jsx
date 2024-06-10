
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";
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

let altura;

function FazerP() {

    const [produtos, setProdutos] = useState()
    const [verificador, setVerificador] = useState()
    const [escolher, setEscolher] = useState("")
   
    
    useEffect ( () => {
        async function getProdutos(db){

        const querySnapshot = await getDocs(collection(db, "produtos"));

        querySnapshot.forEach((doc) => {
            setProdutos(doc.data())
        });
    }
        getProdutos(db)
    }, []);

    let tipos = ["porcoes", "refrigerantes"]

  

    function fechar(event){
        const pegarId = event.target.id
        setEscolher(tipos[pegarId])
        
        altura = event.clientY + 20

        if(verificador == false){
            setVerificador(true)
        } else {
            setVerificador(false)
        }

    }

    const [pedidos, setPedidos] = useState([{}])
    const [quantidade, setQuantidade] = useState([])

    function enviar(){
        console.log(pedidos)
        console.log(quantidade)
    }


    function marcarPedidos(e) {
        const { name, checked } = e.target;
        setPedidos(prevPedidos => {
            if (checked) {
                return [...prevPedidos, { name, quantidade: quantidade[name] || 1 }];
            } else {
                return prevPedidos.filter(pedido => pedido.name !== name);
            }
        });
    }
        
            function atualizarQuantidade(e) {
                const { name, value } = e.target;
                setQuantidade(prevQuantidade => ({
                    ...prevQuantidade,
                    [name]: value
                }));
                setPedidos(prevPedidos => {
                    const pedidoIndex = prevPedidos.findIndex(pedido => pedido.name === name);
                    if (pedidoIndex > -1) {
                        const updatedPedidos = [...prevPedidos];
                        updatedPedidos[pedidoIndex].quantidade = value;
                        return updatedPedidos;
                    } else {
                        return prevPedidos;
                    }
                });
            }
    return (
        <section className='produtos'>

            <div className='prod'>
                <div className='seta' > 
                    <div></div>

                    <h1>Porções</h1>

                    <button onClick={fechar} id='0'>V</button>
                </div>

                    <div className='detalhes' style={{ transform: verificador == false ? "translateY(0)" : "translateY(100%)", opacity: verificador !== false ? "0" : "1" , top: altura}} >
                        
                        {
                            escolher && 
                                produtos[escolher].map( (doc) => (
                                    <li>
                                        <h1>{doc.nome} {doc.desc}</h1>
                                       
                                        <label className='inputs'> 
                                            <input onChange={marcarPedidos} type="checkbox" name={doc.nome} />
                                            <input type="number" onChange={atualizarQuantidade} name="" id="" />
                                        </label>
                                        
                                    </li>
                                ))
                        }
                        
                        <div onClick={enviar} className='enviar'>
                            <h1>Enviar</h1>
                        </div>

                    </div>
                    
            </div>


            <div className='prod'>
                <div className='Refrigerantes'>
                    <div className='seta' > 
                        <div></div>

                        <h1>Refrigerantes</h1>
                        
                        <button onClick={fechar} id='1'>V</button>

                    </div>
                </div>
            </div>
                
           
        </section>

    );
}

export default FazerP;



// import { initializeApp } from 'firebase/app';
// import { getFirestore, getDocs, collection } from "firebase/firestore";
// import { useEffect, useState } from 'react';

// import "../Pages/pedidos.css";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_API_KEY,
//     authDomain: import.meta.env.VITE_AUTH,
//     projectId: import.meta.env.VITE_ID,
//     storageBucket: import.meta.env.VITE_STORAGE,
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Firestore
// const db = getFirestore(app);

// let altura;

// function FazerP() {

//     const [produtos, setProdutos] = useState({});
//     const [verificador, setVerificador] = useState(false);
//     const [escolher, setEscolher] = useState("");
   
//     useEffect(() => {
//         async function getProdutos(db) {
//             const querySnapshot = await getDocs(collection(db, "produtos"));
//             const produtosData = {};
//             querySnapshot.forEach((doc) => {
//                 produtosData[doc.id] = doc.data().items; // assuming "items" holds the list of products
//             });
//             setProdutos(produtosData);
//         }
//         getProdutos(db);
//     }, []);

//     const tipos = ["porcoes", "refrigerantes"];

//     function fechar(event) {
//         const pegarId = event.target.id;
//         setEscolher(tipos[pegarId]);
//         altura = event.clientY + 20;
//         setVerificador(prevVerificador => !prevVerificador);
//     }

//     const [pedidos, setPedidos] = useState([]);
//     const [quantidade, setQuantidade] = useState({});

//     function enviar() {
//         console.log(pedidos);
//         console.log(quantidade);
//     }

//     function marcarPedidos(e) {
//         const { name, checked } = e.target;
//         setPedidos(prevPedidos => {
//             if (checked) {
//                 return [...prevPedidos, { name, quantidade: quantidade[name] || 1 }];
//             } else {
//                 return prevPedidos.filter(pedido => pedido.name !== name);
//             }
//         });
//     }

//     function atualizarQuantidade(e) {
//         const { name, value } = e.target;
//         setQuantidade(prevQuantidade => ({
//             ...prevQuantidade,
//             [name]: value
//         }));
//         setPedidos(prevPedidos => {
//             const pedidoIndex = prevPedidos.findIndex(pedido => pedido.name === name);
//             if (pedidoIndex > -1) {
//                 const updatedPedidos = [...prevPedidos];
//                 updatedPedidos[pedidoIndex].quantidade = value;
//                 return updatedPedidos;
//             } else {
//                 return prevPedidos;
//             }
//         });
//     }

//     return (
//         <section className='produtos'>
//             <div className='prod'>
//                 <div className='seta'> 
//                     <div></div>
//                     <h1>Porções</h1>
//                     <button onClick={fechar} id='0'>V</button>
//                 </div>

//                 <div className='detalhes' style={{ transform: verificador ? "translateY(100%)" : "translateY(0)", opacity: verificador ? "0" : "1", top: altura }}>
//                     {
//                         escolher && produtos[escolher] && produtos[escolher].map((doc, index) => (
//                             <li key={index}>
//                                 <h1>{doc.nome} {doc.desc}</h1>
//                                 <label className='inputs'> 
//                                     <input onChange={marcarPedidos} type="checkbox" name={doc.nome} />
//                                     <input type="number" onChange={atualizarQuantidade} name={doc.nome} id="" />
//                                 </label>
//                             </li>
//                         ))
//                     }
//                     <div onClick={enviar} className='enviar'>
//                         <h1>Enviar</h1>
//                     </div>
//                 </div>
//             </div>

//             <div className='prod'>
//                 <div className='Refrigerantes'>
//                     <div className='seta'> 
//                         <div></div>
//                         <h1>Refrigerantes</h1>
//                         <button onClick={fechar} id='1'>V</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default FazerP;