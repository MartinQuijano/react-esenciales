import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Moment from 'moment';

am4core.useTheme(am4themes_animated);

class PieChartCantidad extends Component {

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.exporting.menu = new am4core.ExportMenu();

        if(this.props.fechaInicio == null || this.props.fechaFin == null){
            fetch('https://esenciales-api-quijano.herokuapp.com/pedidos/categoria/masvendidos/'+this.props.cantidad)
                .then((res) => res.json())
                .then(
                    (data) => {
                        chart.data = data
                    }          
                );
        }
        else{
            let fecha_inicio = Moment(this.props.fechaInicio).format('YYYY-MM-DD');
            let fecha_fin = Moment(this.props.fechaFin).format('YYYY-MM-DD')

            fetch('https://esenciales-api-quijano.herokuapp.com/pedidos/categoria/masvendidos/'+this.props.cantidad+'/desde/'+fecha_inicio+'/hasta/'+fecha_fin)
                .then((res) => res.json())
                .then(
                    (data) => {
                        chart.data = data
                    }          
                );
        }

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.category = "categoria";
        pieSeries.dataFields.value = "cantidad";

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        } 
    }

    render() {
        return (
            <>
                <br></br>
                <div align="center">
                    Cantidad de productos vendidos
                </div>
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            </>
        );
    }
}

export default PieChartCantidad;
