import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Navbar.css';

import PieChartCantidad from '../Pie-chart-cantidad';
import PieChartIngresos from '../Pie-chart-ingresos';
import PieChartProductos from '../Pie-chart-productos';
import SimpleColumnTotal from '../Simple-column-total';


class NavbarEsenciales extends Component {
    constructor(props) {
        super(props);
        this.state = { cantidad: '0', fechaInicio: null, fechaFin: null, categoria: null, categorias: [] }
        this.manejarClickEnBoton = this.manejarClickEnBoton.bind(this);
        this.manejarCambioCantidad = this.manejarCambioCantidad.bind(this);
        this.manejarCambioCategoria = this.manejarCambioCategoria.bind(this);
        this.manejarCambioPrimeraFecha = this.manejarCambioPrimeraFecha.bind(this);
        this.manejarCambioSegundaFecha = this.manejarCambioSegundaFecha.bind(this);
    }

    componentDidMount() {
        fetch('https://esenciales-api-quijano.herokuapp.com/categorias')
        .then((res) => res.json())
        .then(
            (data) => {
                this.setState({ categorias: data})
            }
        );
    }

    componentWillUnmount() {}

    manejarCambioCantidad(event) {
        this.setState({ cantidad: event.target.value });
    }

    manejarCambioCategoria(event) {
        var valueToLowerCase = event.target.value.toLowerCase();
        if (valueToLowerCase.length === 0) {
            valueToLowerCase = null;
        }
        this.setState({ categoria: valueToLowerCase });
    }

    manejarCambioPrimeraFecha(date) {
        this.setState({ fechaInicio: date });
    }

    manejarCambioSegundaFecha(date) {
        this.setState({ fechaFin: date });
    }

    manejarClickEnBoton(componente) {
        this.props.alClickearUnBoton(componente, this.state.cantidad, this.state.fechaInicio, this.state.fechaFin, this.state.categoria);
    }
      
    render() {

        return (
            <Navbar expand="lg">
                <Navbar.Brand href="/" onClick={() => this.manejarClickEnBoton(null)}><img src="/img/logo_esenciales.png" alt="" width="175" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() => this.manejarClickEnBoton(SimpleColumnTotal)}>Total</Nav.Link>
                        <NavDropdown alignRight title="Productos" id="dropdown-menu-align-right" >
                            <Form className="formulario">
                                <Form.Group>
                                    <Form.Label className="label">Cantidad de productos</Form.Label>
                                    <Form.Control type="text" placeholder="Ingresar cantidad" onChange={this.manejarCambioCantidad} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="label">Categoria</Form.Label>
                                    <Form.Control as="select" defaultValue="Elegir categoria" onChange={this.manejarCambioCategoria}>
                                        <option key={''} >{null} </option>
                                        {this.state.categorias.map((categoria) => (
                                            <option key={categoria.categoria} >{categoria.categoria} </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="label">Fecha inicio</Form.Label>
                                    <DatePicker className="datepicker" onChange={this.manejarCambioPrimeraFecha} value={this.state.fechaInicio} dateFormat="dd/MM/y" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="label">Fecha fin</Form.Label>
                                    <DatePicker className="datepicker" onChange={this.manejarCambioSegundaFecha} value={this.state.fechaFin} dateFormat="dd/MM/y" />
                                </Form.Group>
                                <Button className="button" onClick={() => this.manejarClickEnBoton(PieChartProductos)}>
                                    Consultar
                                </Button>
                            </Form>
                        </NavDropdown>
                        <NavDropdown alignRight title="Categor??as" id="dropdown-menu-align-right">
                            <NavDropdown alignRight title="M??s cantidad de productos vendidos" id="dropdown-menu-align-right">
                                <Form className="formulario">
                                    <Form.Group>
                                        <Form.Label className="label">Cantidad de categor??as</Form.Label>
                                        <Form.Control type="text" placeholder="Ingresar cantidad" onChange={this.manejarCambioCantidad} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="label">Fecha inicio</Form.Label>
                                        <DatePicker className="datepicker" onChange={this.manejarCambioPrimeraFecha} value={this.state.fechaInicio} dateFormat="dd/MM/y" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="label">Fecha fin</Form.Label>
                                        <DatePicker className="datepicker" onChange={this.manejarCambioSegundaFecha} value={this.state.fechaFin} dateFormat="dd/MM/y" />
                                    </Form.Group>
                                    <Button className="button" onClick={() => this.manejarClickEnBoton(PieChartCantidad)}>
                                        Consultar
                                    </Button>
                                </Form>
                            </NavDropdown>
                            <NavDropdown alignRight title="M??s ingresos generados" id="dropdown-menu-align-right">
                                <Form className="formulario">
                                    <Form.Group>
                                        <Form.Label className="label">Cantidad de categor??as</Form.Label>
                                        <Form.Control type="text" placeholder="Ingresar cantidad" onChange={this.manejarCambioCantidad} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="label">Fecha inicio</Form.Label>
                                        <DatePicker className="datepicker" onChange={this.manejarCambioPrimeraFecha} value={this.state.fechaInicio} dateFormat="dd/MM/y" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="label">Fecha fin</Form.Label>
                                        <DatePicker className="datepicker" onChange={this.manejarCambioSegundaFecha} value={this.state.fechaFin} dateFormat="dd/MM/y" />
                                    </Form.Group>
                                    <Button className="button" onClick={() => this.manejarClickEnBoton(PieChartIngresos)}>
                                        Consultar
                                    </Button>
                                </Form>
                            </NavDropdown>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

        );
    };
}

export default NavbarEsenciales;