import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const Carrito = ({carrito, eliminarProductoAlCarrito}) => {
    return (
        <div>
            <h3>Carrito de compras</h3>
            {carrito.length > 0 ?
                carrito.map((producto, index)=>{
                    return(
                        <Producto key={index}>
                            <NombreProducto>{producto.nombre}</NombreProducto>
                            Cantidad:{producto.cantidad}
                            <Boton onClick={()=>eliminarProductoAlCarrito(producto.id, producto.nombre)}>Eliminar del carrito</Boton>
                        </Producto>
                    )
                })
            :
                <p>Aun no has agregado productos</p>
            }
        </div>
    );
}

const Producto = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ebebf3;
    font-size: 14px;
`;

const NombreProducto = styled.p`
    font-weight: bold;
    font-size: 16px;
    color: #000
`;

const Boton = styled.button`
    border: none;
    background: red;
    color: #fff;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    text-align: center;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    border-radius: 3px;
    transition: .3s ease all;

    &:hover {
        background: #1c6ab9;
    }
`;

const mapStateToProps = (estado) => {
    return {
        carrito: estado.carrito
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        eliminarProductoAlCarrito: (id) => {
            dispatch({ type: 'ELIMINAR_PRODUCTO_AL_CARRITO', idEliminar: id});
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Carrito);