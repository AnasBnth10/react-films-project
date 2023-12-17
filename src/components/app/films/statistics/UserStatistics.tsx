import { User } from '../../models/user-model';
import './UserStatistics.scss';

interface IProps {
  user: User
}

const UserStatistics: React.FC<IProps> =  ({
  user

}) => {
    return ( 
    <aside className="user-statistics-container">
 
        <div className="statistics-section">
          <h3>Total Watch Time</h3>
          <h1>{user.watchTime}</h1>
        </div>
      
        <div className="statistics-section">
          <h3>Time Spent on Categories</h3>
          <ul>
            <li>Action: 25 hours</li>
            <li>Drama: 18 hours</li>
            <li>Comedy: 15 hours</li>
          </ul>
        </div>
      
        <div className="statistics-section">
          <h3>Total Movies Watched</h3>
          <h1>{user.totalMoviesWatched} movies</h1>
        </div>
      </aside>
    )
}

export default UserStatistics;
