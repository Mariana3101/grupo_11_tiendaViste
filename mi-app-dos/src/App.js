import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import './Categoria.css';
import MenuLateral from './components/MenuLateral';
import NavBar from './components/NavBar';
import UltimoItems from './components/UltimoItems';
import Metricas from './components/Metricas'
import Categoria from './components/Categoria';

class App extends Component{

    /* --- Aca arrancamos dandole el estado */
    constructor(props){
        super(props);
        this.state= {
            amount : '',
            quantity: '',
            users: '',
            
        }
    }

    /* Funcion para llamar a la API, hacemos una func porq vamos a llamar a varias */

    apiCall(url, consecuencia){
        fetch(url)
            .then( response => response.json() )
            .then( data => consecuencia(data) )
            .catch( error => console.log(error))
    }

    /* Esta es la funcion consecuencia de "apiCall()" */

    mostrarProductos = (data)=>{
        console.log(data);
        
       this.setState(
           {
            amount: data.metadata.amount,
            quantity: data.metadata.quantity,
                  
           }
        ) 
        
        
        
    }
    mostrarUsuarios= (data)=>{
      console.log(data);
      
     this.setState(
         {
          users: data.metadata.quantity,
         }
      ) 
           
  }

  


    /* Cuando el componente carga, recien ahi llamamos a la API */
    componentDidMount(){
        console.log("Me monté!!");
        this.traerProductos() 
        this.traerUsuarios()
        }

    /* Aca va la funcion a la q llamamos desde el componentDidMount */
    traerProductos(){
        this.apiCall("http://localhost:4000/api/productos", this.mostrarProductos)
    }
    traerUsuarios(){
      this.apiCall("http://localhost:4000/api/users", this.mostrarUsuarios)
  }
    
    render(){
        return(

<span>

<div id="wrapper">

    {/* Aca va el MenuLateral */}
<MenuLateral/>

    <div id="content-wrapper" className="d-flex flex-column">
     <div id="content">
{/* Aca va la NavBar*/}

 <NavBar/>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">App Dashboard Viste</h1>
            </div>
            <div className="row">

    <Metricas
        title = 'Cantidad de Productos'
        quantity = {this.state.quantity}
        borderColor = 'border-left-primary'
        textColor = 'text-primary'/>

                      
    <Metricas
    title = 'Total de inventario'
    amount= {this.state.amount}
    borderColor = 'border-left-success'
    textColor = 'text-success'/>


    <Metricas
    title = 'Usuarios total en la BD'
    users = {this.state.users}
    borderColor = 'border-left-warning'
    textColor = 'text-warning '/>



{/* Caja de ultimo items*/}
                   
                   
<UltimoItems
            title="Último Producto Cargado"
            />
{/*Aca van las categoias*/}

<Categoria/>
                   
                </div>
            </div>

        </div>
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Dashboard 2020</span>
                </div>
            </div>
        </footer>


    </div>


</div>


</span>
  )
}
}

export default App;
