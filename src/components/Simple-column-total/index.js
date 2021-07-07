import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SimpleColumnTotal extends Component {
    constructor(props){
        super(props);
        this.manejarClickEnColumna = this.manejarClickEnColumna.bind(this);
        this.manejarClickEnColumnaAño = this.manejarClickEnColumnaAño.bind(this);

    }

    manejarClickEnColumna(dateType, fecha){
        this.props.alClickearUnaColumna(dateType, fecha);
    }

    manejarClickEnColumnaAño(dateType, fecha, anio){
        this.props.alClickearUnaColumna(dateType, fecha, anio);
    }

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.exporting.menu = new am4core.ExportMenu();

        let url;

        if(this.props.dateType == null)
            url = 'https://esenciales-api-quijano.herokuapp.com/pedidos/ventas/anios';
        else if(this.props.dateType === 'meses')
            url = 'https://esenciales-api-quijano.herokuapp.com/pedidos/ventas/meses/anio/' + this.props.date;
        else if(this.props.dateType === 'dias')
            url = 'https://esenciales-api-quijano.herokuapp.com/pedidos/ventas/dias/mes/' + this.props.date;

        fetch(url)
                .then((res) => res.json())
                .then(
                    (data) => {
                        chart.data = data
                    }
                    
                );

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "fecha";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;


        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
        });

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "total";
        series.dataFields.categoryX = "fecha";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        chart.scrollbarX = new am4core.Scrollbar();
        
        if(this.props.dateType !== 'dias'){
            series.columns.template.events.on("hit", function(ev){

                let dateType;
                if(this.props.dateType == null)
                    dateType = 'meses';
                else if(this.props.dateType === 'meses')
                    dateType = 'dias';
                if(this.props.dateType == null)
                    this.manejarClickEnColumnaAño(dateType, ev.target.dataItem.dataContext.fecha, ev.target.dataItem.dataContext.fecha);
                if(this.props.dateType === 'meses')
                    this.manejarClickEnColumnaAño(dateType, ev.target.dataItem.dataContext.fecha, this.props.añoActual);
            }, this);
        }
        
        let title = chart.titles.create();

        if(this.props.dateType == null)
            title.text = 'Ingresos totales';
        else if(this.props.dateType === 'meses')
            title.text = 'Ingresos totales del año ' + this.props.añoActual;
        else if(this.props.dateType === 'dias')
            title.text = 'Ingresos totales del mes ' + this.props.date + ' del año ' + this.props.añoActual;

        categoryAxis.events.on("sizechanged", function(ev) {
            let axis = ev.target;
            let cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
            axis.renderer.labels.template.maxWidth = cellWidth;
            });

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        } 
    }

    renderButton(){
        if(this.props.dateType === 'meses')
            return <div><Button className="button" onClick={() => this.manejarClickEnColumnaAño(null, null, this.props.añoActual)}>Volver a años</Button></div>
        else if(this.props.dateType === 'dias')
            return <div><Button className="button" onClick={() => this.manejarClickEnColumnaAño('meses', this.props.añoActual, this.props.añoActual)}>Volver a meses</Button></div>
    }

    render() {

        return (
            <>
                <br></br>
                <div id="chartdiv" ></div>
                { this.renderButton() }
                
            </>
        );
    }
}

export default SimpleColumnTotal;
