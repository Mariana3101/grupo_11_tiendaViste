import React, { Component } from 'react';

class Categoria extends Component{
   constructor (){
       super();
       this.state = {
           valor:1
       }
   }

    
    cambiarColor(valor, id){
        if (!document.getElementById(id).style.backgroundColor || document.getElementById(id).style.backgroundColor==="blue")
            document.getElementById(id).style.backgroundColor= '#00aae4' ;
        else
            document.getElementById(id).style.backgroundColor="blue";

    }
  
   


    render(){
      

        return(
            <div className="col-lg-6 mb-4" >
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categorías en Base de Datos</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div id='1' className="card bg-info2 text-white shadow" onClick={(e)=>this.cambiarColor(e, '1' )} >
                                <div className="card-body">
                                  Bebe-Niña
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div id='2' className="card bg-info2 text-white shadow"  onClick={(e)=>this.cambiarColor(e, '2' )} >
                                <div className="card-body">
                                  Bebe-Niño
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div  id='3' className="card bg-info2 text-white shadow" onClick={(e)=>this.cambiarColor(e, '3' )}>
                                <div className="card-body ">
                                    Niña
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div  id='4'className="card bg-info2 text-white shadow"onClick={(e)=>this.cambiarColor(e, '4' )} >
                                <div className="card-body">
                                    Niño
                                </div>
                            </div>
                        </div>
                        
                      
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
}export default Categoria;