import React from 'react';
import { Card, CardContent, Grid, Grow } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Creators as AuthActions } from "../../store/ducks/_Authentication";
import { Creators as LoadingActions } from "../../store/ducks/_Loading";
// import { Creators as MsgActions } from "../../store/ducks/_Menssage";
// import { Creators as ProfessorsActions } from "../../store/ducks/_Professors";

import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [
    {name: 'Group A', value: 400}, 
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, 
    {name: 'Group D', value: 200}
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;   

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const SimplePieChart = () => (
	<PieChart width={600} height={300}>
        <Pie
            data={data} 
            cx={300} 
            cy={150} 
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100} 
            fill="#8884d8"
        >
            { data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>) }
        </Pie>
    </PieChart>
)

const CoursesGraph = ({ load }) => (
    <Grid container style={{flexGrow: 1}} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
            <Grow in={load.isLoadingFinished}>
                <Card style={{width: 600}}>
                    <SimplePieChart />
                </Card>
            </Grow>
        </Grid>
    </Grid>
)

const mapStateToProps = state => ({
    // auth: state.authReducers,
    load: state.loadingReducers,
    // msg: state.msgReducers,
    // professors: state.professorsReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    // ...AuthActions,
    ...LoadingActions,
    // ...MsgActions,
    // ...ProfessorsActions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoursesGraph);
