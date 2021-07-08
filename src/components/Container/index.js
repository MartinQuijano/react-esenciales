import React, { Component } from 'react';
import Navbar from '../NavbarEsenciales';

class Container extends Component {

    constructor(props) {
        super(props);
        this.manejarCambioDeComponente = this.manejarCambioDeComponente.bind(this);
        this.manejarCambioDeComponenteTotal = this.manejarCambioDeComponenteTotal.bind(this);
        this.state = { componenteSeleccionado: null, cantidad: '0', fechaInicio: null, fechaFin: null, categoria: null, date: null, dateType: null, añoActual: null }
    }

    manejarCambioDeComponente(componente, nCantidad, fechaI, fechaF, categ) {
        this.setState({ componenteSeleccionado: componente, cantidad: nCantidad, fechaInicio: fechaI, fechaFin: fechaF, categoria: categ, date: null, dateType: null, añoActual: null});
    }

    manejarCambioDeComponenteTotal(newDateType, newDate, newAñoActual){
        this.setState({ dateType: newDateType, date: newDate, añoActual: newAñoActual });
    }

    renderizarComponente() {
        if (this.state.componenteSeleccionado != null) {
            const Comp = this.state.componenteSeleccionado;
            return <Comp key={this.state.cantidad + this.state.fechaInicio + this.state.fechaFin + this.state.categoria + this.state.date + this.state.dateType}
                cantidad={this.state.cantidad} fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} categoria={this.state.categoria} date={this.state.date}
                dateType={this.state.dateType} añoActual={this.state.añoActual}
                alClickearUnaColumna={this.manejarCambioDeComponenteTotal}/>
        }
    }

    render() {
        return (
            <>
                <Navbar alClickearUnBoton={this.manejarCambioDeComponente} />

                {this.renderizarComponente()}
            </>
        );
    };
}

export default Container;