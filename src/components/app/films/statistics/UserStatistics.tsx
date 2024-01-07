import DoughnutChart from '../../../common/charts/DoughnutChart';
import { User } from '../../models/user-model';
import './UserStatistics.scss';

interface IProps {
  user: User,
  data: any
}

const UserStatistics: React.FC<IProps> =  ({
  user,
  data

}) => {
    return ( 
    <aside className="user-statistics-container">
 
        <div className="statistics-section">
          <h3>Total Watch Time</h3>
          <h1>{user.watchTime} minutes</h1>
        </div>
      
        <div className="statistics-section">
          <h3>Time Spent on Categories</h3>
          <ul>
            {
              user.listOfGenres.map((genre) => (
                <li><span className="genre-name">{genre.name}: </span> {genre.watchTime} minutes</li>
              ))
            }
          </ul>
          <DoughnutChart data={data} />
        </div>
      
        <div className="statistics-section">
          <h3>Total Movies Watched</h3>
          <h1>{user.totalMoviesWatched} movies</h1>
        </div>
      </aside>
    )
}

export default UserStatistics;
