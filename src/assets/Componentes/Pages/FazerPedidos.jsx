
import { initializeApp } from 'firebase/app';
import { getFirestore,addDoc, getDocs, collection, documentId } from "firebase/firestore";
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
    const [pedidos, setPedidos] = useState([])
    const [quantidade, setQuantidade] = useState([])
    const [confPedidos, setConfiPedidos] = useState()
    const [mesa, setMesa] = useState()
    
    useEffect ( () => {
        async function getProdutos(db){

        const querySnapshot = await getDocs(collection(db, "produtos", ));

        querySnapshot.forEach((doc) => {
            setProdutos(doc.data())
        });
    }
        getProdutos(db)
    }, []);

    async function confirmar() {
        await addDoc(collection(db, "pedidosAbertos"), {
            mesa: mesa,
            pedidos: pedidos
        });
        alert("Pedido confirmado!");
        window.location.reload(true);

    }



    let tipos = ["porcoes", "refrigerantes"]


    //função para quando clicar na seta, fechar o quadrado de pedidos
    function fechar(event){
        const pegarId = event.target.id
        setEscolher(tipos[pegarId])
        

        altura = event.clientY + 20

        if(verificador == false){
            setVerificador(true)
            quantidadeZerar.value = ""
            zerarCheck.checked = false

        } else {
            setVerificador(false)

        }

    }

   

    //enviar o pedido completo
    function enviar(){

        setVerificador(true)

        let confirmarPedidos = document.getElementById("configmarPedidos")
        setConfiPedidos(confirmarPedidos)

        confirmarPedidos.innerHTML = pedidos.map( (doc) => (
            
            `<h1>${doc.name} : ${doc.quantidade} </h1>`
        ))

        
    }
    
//verificar a marcação do checkbox
    function marcarPedidos(e) {
        const { name, checked } = e.target;

        setPedidos(prevPedidos => {
            if (checked) {
                return [...prevPedidos, { name, quantidade: name || quantidade }];
            } else {
                return prevPedidos.filter(pedido => pedido.name !== name);
            }
        });
    }

        //Atualizar a quantidade do input "quantidade"
            function atualizarQuantidade(e) {
                const { name, value } = e.target;
                setQuantidade(prevQuantidade => ({
                    ...prevQuantidade,
                    [name]: value
                }));
                if(quantidade != ""){
                    setPedidos(prevPedidos => {
                        const pedidoIndex = prevPedidos.findIndex(pedido => pedido.name === name); //encontrar valor no array
                        if (pedidoIndex >= -1) {
                            const updatedPedidos = [...prevPedidos];
                            updatedPedidos[pedidoIndex].quantidade = value; //atualizar pedidos
                            return updatedPedidos;
                        } else {
                            return prevPedidos;
                        }
                    });
                }
                
            }

            function mesas(e){
                let escolhaMesa = e.target
                setMesa(escolhaMesa.innerText)
                console.log(escolhaMesa)

                if(escolhaMesa.className == ""){
                    escolhaMesa.classList.add("active")
                } else{
                    escolhaMesa.classList.remove("active")

                }
                
            }

    return (
        <section className='produtos'>
                <h1 className='titulo'>Mesas</h1>

              
            <ul onClick={mesas} className='mesas'>
                <li >1</li>
                <li >2</li>
                <li >3</li>
                <li >4</li>
                <li >5</li>
                <li >6</li>
            </ul>


            <div className='prod'>

                <div className='seta' > 
                    <div></div>

                    <h1>Porções</h1>

                    <button onClick={fechar} id='0'>V</button>
                </div>

                    <div className='detalhes' style={{ transform: verificador == false ? "translateY(0)" : "translateY(200%)", opacity: verificador !== false ? "0" : "1" , top: altura}} >
                        
                        {
                            escolher && 
                                produtos[escolher].map( (doc) => (
                                    <li>
                                        <h1>{doc.nome} {doc.desc}</h1>
                                       
                                        <label className='inputs'> 
                                            <input id='checador1' onChange={marcarPedidos} type="checkbox" name={doc.nome} />
                                            <input id='checador2' type="number" onChange={atualizarQuantidade} name={doc.nome} />
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
                    <div className='seta' > 
                        <div></div>

                        <h1>Refrigerantes</h1>
                        
                        <button onClick={fechar} id='1'>V</button>
                    </div>
            </div>
                
           

                        <div style={{ transform: confPedidos != undefined ? "translateX(0px)" : "translateX(-100%)"}} className='confirmarPedidos'>
                           
                            <h1>Confirmar pedido</h1>
                            <h1 id='configmarPedidos'>teste</h1>

                            <div onClick={confirmar} className='confirmar'>Confirmar pedidos</div>
                            <div className='cancelar' onClick={
                                function(){
                                    setConfiPedidos(undefined)
                                }
                            }>Cancelar</div>
                        </div>
        </section>


    );
}

export default FazerP;

