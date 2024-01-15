import { User } from "../components/app/models/user-model";

export class GraphDataService {

    public static prepareGraphData(user : User,setGraphData: (data : {}) => void){
    
        const doughnutChartColors: string[] = [
            "#4CAF50", // Green
            "#2196F3", // Blue
            "#FFC107", // Yellow
            "#E91E63", // Pink
            "#673AB7", // Purple
            "#FF5722", // Deep Orange
            "#9C27B0", // Deep Purple
            "#FF9800", // Orange
            "#00BCD4", // Cyan
            "#795548"  // Brown
          ];
          

        let _labels : string[] = [];
        let _data : number[] = [];
        user
            .listOfGenres
            .forEach(genre => {
                _labels.push(genre.name);
                _data.push(genre.watchTime);
            });

            if(_data.length === 0)
            {
                setGraphData({});
            }
            else {

            setGraphData({
                labels: _labels,
                datasets: [
                    {
                        label: 'Watchtime',
                        data: _data,
                        backgroundColor: doughnutChartColors.slice(0,_labels.length),
                        hoverOffset: 4
                    }
                ]
            })
        }
}
}