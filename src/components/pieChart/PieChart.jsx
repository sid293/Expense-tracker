import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 800 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartExample extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
    constructor(props){
        super(props);
        // console.log("piechart props ",props);
        this.state = {
            wB:props.walletBalance,
            categorised:props.categorised,
            pieData:props.pieData
        }
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps) {
      if (prevProps.walletBalance !== this.props.walletBalance) {
        this.setState({ wB: this.props.walletBalance });
      }
      if (prevProps.categorised !== this.props.categorised) {
        this.setState({ categorised: this.props.categorised });
      }
      if (prevProps.pieData !== this.props.pieData) {
        this.setState({ pieData: this.props.pieData });
      }
    }

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400} style={{}}>
          <Pie
            data={this.state.pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        {this.state.categorised && this.state.pieData && 
        
            <div style={{
                position:'relative',
                bottom:"40px",
                color:"white",
                display:"flex",
                justifyContent:"center"}}>{Object.keys(this.state.categorised).map((category,index)=>{
                    return (<div key={index} style={{display:"flex",justifyContent:"center"}}><div style={{height:"10px",width:"30px",margin:"10px",backgroundColor:COLORS[index]}}></div><div>{category}</div></div>)})} </div>
        }
      </ResponsiveContainer>
    );
  }
}
