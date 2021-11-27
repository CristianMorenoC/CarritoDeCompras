import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faMinus } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux';

const Check = ({carrito, sumarUnProducto, restarUnProducto, eliminarProductoAlCarrito}) => {
    return (
        <ContenedorCheck>
            <h1>Check</h1>
            {
                carrito.length > 0 ? 
                carrito.map((producto, index)=>{
                    return (
                        <Producto key={index}>
                            <div>
                                <NombreProducto>{producto.nombre}</NombreProducto>
                                Cantidad:{producto.cantidad}
                            </div>
                            <ContenedorBoton>
                                <Boton verde onClick={()=>sumarUnProducto(producto.id, producto.nombre)}><FontAwesomeIcon icon={faPlus} /></Boton>
                                <Boton onClick={()=>restarUnProducto(producto.id, producto.nombre)}><FontAwesomeIcon icon={faMinus} /></Boton>
                                <Boton rojo onClick={()=>eliminarProductoAlCarrito(producto.id)}><FontAwesomeIcon icon={faTrashAlt} /></Boton>
                            </ContenedorBoton>
                        </Producto>
                    )
                })
                :
                <P>Aun no has agregado productos</P>
            }
        </ContenedorCheck>
    );
}

const Producto = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ebebf3;
    font-size: 14px;
    justify-content: space-between;
`;

const NombreProducto = styled.p`
    font-weight: bold;
    font-size: 16px;
    color: #000
`;

const ContenedorCheck= styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    `;

const ContenedorBoton = styled.div`
    display: flex;
    flex
`;

const Boton = styled.button`
    font-size: 1rem;
    height: 30px;
    width: 30px;
    margin: 5px;
    border-radius: 50%;
    border: none;
    cursor: pointer;


    &:hover{
        background: #C2B8B6;
    }


    ${props => props.rojo && css`
        &:hover{
            background: #B13A21;
        }
    `}


    ${props => props.verde && css`
        &:hover{
            background: #47E131;
        }
    `}
`;

const P = styled.p`
        width: 100%;
`;


const mapStateToProps = estado => {
    return {
        carrito: estado.carrito
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sumarUnProducto: (id, nombre) => {
            dispatch({type:'SUMAR_PRODUCTO_AL_CARRITO', nombreSuma:nombre, idSumar: id});
        },
        restarUnProducto: (id, nombre) => {
            dispatch({type:'RESTAR_PRODUCTO_AL_CARRITO', nombreResta:nombre, idRestar:id});
        },
        eliminarProductoAlCarrito: (id) => {
            dispatch({type:'ELIMINAR_PRODUCTO_AL_CARRITO', idEliminar:id});
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Check);