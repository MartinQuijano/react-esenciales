import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Moment from 'moment';
import Alert from 'react-bootstrap/Alert'
import '../../css/Charts.css';

am4core.useTheme(am4themes_animated);

class PieChartProductos extends Component {

    constructor(props) {
        super(props);
        this.state = { error: null }
    }

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.exporting.menu = new am4core.ExportMenu();

        if (this.props.categoria == null && (this.props.fechaInicio == null || this.props.fechaFin == null)) {
            fetch('https://esenciales-api-quijano.herokuapp.com/productos/masvendidos/' + this.props.cantidad)
                .then((res) => res.json())
                .then(
                    (data) => {
                        if (data.error) {
                            this.setState({ error: data.error })
                        }
                        chart.data = data
                    }
                );
        }
        else if (this.props.categoria == null && (this.props.fechaInicio != null && this.props.fechaFin != null)) {
            let fecha_inicio = Moment(this.props.fechaInicio).format('YYYY-MM-DD');
            let fecha_fin = Moment(this.props.fechaFin).format('YYYY-MM-DD')

            fetch('https://esenciales-api-quijano.herokuapp.com/productos/masvendidos/' + this.props.cantidad + '/desde/' + fecha_inicio + '/hasta/' + fecha_fin)
                .then((res) => res.json())
                .then(
                    (data) => {
                        if (data.error) {
                            this.setState({ error: data.error })
                        }
                        chart.data = data
                    }
                );
        } else if (this.props.categoria != null && (this.props.fechaInicio == null || this.props.fechaFin == null)) {

            fetch('https://esenciales-api-quijano.herokuapp.com/productos/masvendidos/' + this.props.cantidad + '/categoria/' + this.props.categoria)
                .then((res) => res.json())
                .then(
                    (data) => {
                        if (data.error) {
                            this.setState({ error: data.error })
                        }
                        chart.data = data
                    }
                );
        } else {
            let fecha_inicio = Moment(this.props.fechaInicio).format('YYYY-MM-DD');
            let fecha_fin = Moment(this.props.fechaFin).format('YYYY-MM-DD')

            fetch('https://esenciales-api-quijano.herokuapp.com/productos/masvendidos/' + this.props.cantidad + '/categoria/' + this.props.categoria + '/desde/' + fecha_inicio + '/hasta/' + fecha_fin)
                .then((res) => res.json())
                .then(
                    (data) => {
                        if (data.error) {
                            this.setState({ error: data.error })
                        }
                        chart.data = data
                    }
                );
        }

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.category = "marca";
        pieSeries.dataFields.value = "cantidad";

        let title = chart.titles.create();
        title.text = "Productos más vendidos";

        chart.responsive.enabled = true;
        chart.responsive.useDefault = false;

        pieSeries.alignLabels = false;

        pieSeries.ticks.template.events.on("ready", hideSmall);
        pieSeries.ticks.template.events.on("visibilitychanged", hideSmall);
        pieSeries.labels.template.events.on("ready", hideSmall);
        pieSeries.labels.template.events.on("visibilitychanged", hideSmall);
        pieSeries.labels.template.events.on("shown", hideSmall);
        pieSeries.ticks.template.events.on("shown", hideSmall);

        function hideSmall(ev) {
            if (ev.target.dataItem.values.value.percent < 2) {
                ev.target.hide();
            }
            else {
                ev.target.show();
            }
        }

        chart.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 800) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {

                if (target instanceof am4charts.AxisLabelCircular ||
                    target instanceof am4charts.PieTick) {
                    var state = target.states.create(stateId);
                    state.properties.disabled = true;

                    return state;
                }
                return null;
            }
        });

        chart.legend = new am4charts.Legend();
        chart.legend.scrollable = true;
        chart.legend.maxHeight = 75;

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        if (this.state.error != null) {
            return (
                <>
                    <Alert variant="danger m-4">
                        {this.state.error}
                    </Alert>
                </>
            )
        } else
            return (
                <>
                    <br></br>
                    <div id="chartdiv"></div>
                </>
            );
    }
}

export default PieChartProductos;
