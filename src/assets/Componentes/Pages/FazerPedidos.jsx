
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';

import "../Pages/pedidos.css"
import { set } from 'firebase/database';
import { isCompositeComponent } from 'react-dom/test-utils';

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
        
        console.log(produtos)

        altura = event.clientY + 20
        if(verificador == false){
            setVerificador(true)
        } else {
            setVerificador(false)
        }

    }

    function teste(e){
        console.log(e)
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
                                       
                                        <div className='inputs'> 
                                            <input type="checkbox" />
                                            <input type="number" name="" id="" />
                                        </div>
                                        
                                    </li>
                                ))
                        }
                        
                        <div className='enviar'>
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