import DoughnutChart from '../../../common/charts/DoughnutChart';
import { User } from '../../models/user-model';
import './UserStatistics.scss';

interface IProps {
  user: User,
  data: {}
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
          
          <div className='chart-container'>
          
          {
            Object.keys(data).length != 0 ? <> 
            <h3>Categories</h3>
            <ul>
            {
              user.listOfGenres.map((genre) => (
                <li><span className="genre-name">{genre.name}: </span> {genre.watchTime} minutes</li>
              ))
            }
          </ul>
          <DoughnutChart data={data} />
          <br/>
          </> : <div className='no-viewed-films-box'>
            <p className='no-viewed-films-message'>No movies watched yet...  Start exploring and enjoy your film journey!</p></div>
          }
          </div>
        </div>
        <br/>
      
        <div className="statistics-section">
          <h3>Total Movies Watched</h3>
          <h1>{user.totalMoviesWatched} movies</h1>
        </div>
      </aside>
    )
}

export default UserStatistics;
