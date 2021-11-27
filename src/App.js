import React from 'react';
import styled from 'styled-components';
import { NavLink, Routes, Route  } from 'react-router-dom';
import Check from './componentes/Check';
import Home from './componentes/Home';
import Error404 from './componentes/Error404';
import Carrito from './componentes/Carrito';

//reducers
import reducer from './reducers/tiendaReducer';

//provider
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const App = () => {
// const agregarProductoAlCarrito = (id, nombre) => {
//   //Si el carrito no tiene elementos agregamos uno
//     if(carrito.length === 0){
//       setCarrito([{id: id, nombre: nombre, cantidad: 1}]);
//     }else{
//       //de otra forma debemos revisar que el carrito no tenga el prodcuto que queremos agregar
//       //si ya tiene el producto entonces queremos actualizar su valor
//       //si no tiene el producto entonces lo agregamos
//       //para poder editar el arreglo tenemos que clonarlo
//       const nuevoCarrito = [...carrito];
//       //comprobamos si el carrito ya tiene el id del producto que vamos a agregar
//       const yaEstaEnCarrito = nuevoCarrito.filter( productoDeCarrito =>{
//         return productoDeCarrito.id === id
//       }).length > 0;
//       //si ya tenemos el producto actualizamos
//       if(yaEstaEnCarrito){
//         //para ello debemos buscarlo por su posicion
//         //en base a la posicion actualizamos el valor
//         nuevoCarrito.forEach((productoDeCarrito, index)=>{
//           if(productoDeCarrito.id === id){
//             const cantidad = nuevoCarrito[index].cantidad;
//             nuevoCarrito[index] = {id: id, nombre: nombre, cantidad: cantidad + 1};
//           }
//         });
//         // de otra forma entonces agregamos el producto al arreglo
//       }else{
//         nuevoCarrito.push({
//           id: id,
//           nombre: nombre,
//           cantidad: 1
//         })
//       }
//       //actualizamos el carrito
//       setCarrito(nuevoCarrito);
//     }
// }


//store
const store = createStore(reducer);
//console.log(store);

  return (
    <Provider store={store}>
      <Contenedor>
        <Menu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/Carrito'>Carrito</NavLink>
          <NavLink to='/Check'>Check</NavLink>
        </Menu>
        <Main>
            <Routes>
              <Route path="/Carrito" element={<Carrito/>} />
              <Route path="/Check" element={<Check/>} />
              <Route path="/*" element={<Home />} />
              <Route  element={<Error404/>} />
            </Routes>
        </Main>
      </Contenedor>
    </Provider>
  );
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: flex;
    flex-wrap:wrap;
    gap: 20px;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Main = styled.div`
  width: 100%;
`;

const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    border-radius: 3px;

    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }

    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;


export default App;