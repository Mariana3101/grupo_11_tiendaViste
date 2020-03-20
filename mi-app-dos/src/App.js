import React from 'react';
//import logo from './logo.svg';
import './App.css';
import MenuLateral from './components/MenuLateral';
import NavBar from './components/NavBar';
import InfoProductos from './components/InfoProductos';
import Precio from './components/Precio';
import UltimoItems from './components/UltimoItems';
import Categoria from './components/Categoria';

function App() {
  return (

<body>


<div id="wrapper">

    {/* Aca va el MenuLateral */}
    <  MenuLateral />

    <div id="content-wrapper" className="d-flex flex-column">


        <div id="content">
{/* Aca va la NavBar*/}

  < NavBar />

         
            <div className="container-fluid">


                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard Viste</h1>
                </div>


                <div className="row">

{/* Aca va InfoProductos*/}

<InfoProductos/>                    

{/* Aca va Precio*/}
                   <Precio/>

                   {/* Aca va InfoUsers*/}

                  
                    </div>


                <div className="row">

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


</body>
  );
}

export default App;
