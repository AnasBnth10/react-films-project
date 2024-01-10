import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';




interface IProps {
data: any
}

const DoughnutChart: React.FC<IProps> =  ({
data
}) => {
    Chart.register(ArcElement, Tooltip, Legend);
    return (
        <div className='chart-container'>
        <Doughnut data={data} />
        </div>
    )
}

export default DoughnutChart;