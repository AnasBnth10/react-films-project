import { Button, Card } from "react-bootstrap";
import './FilmCard.scss';
import AddOrRemoveButton from "../../common/buttons/AddOrRemoveButton";
import ViewButton from "../../common/buttons/ViewButton";
import { User } from "../models/user-model";


interface IProps {
    id: string,
    title: string,
    year: string,
    img: string,
    type: string,
    user: User
}

const FilmCard: React.FC<IProps> =  ({
    id,
    title,
    year,
    img,
    type,
    user
}) => {
    return (
      
        <Card className="film-card" >
      <Card.Img variant="top" alt="" src={img} />
      <Card.Body className="film-card-body" >
        <Card.Title>{title}</Card.Title>
        <Card.Text>
         {type} - {year}  
        </Card.Text>
        <div className="card-buttons">
        <AddOrRemoveButton variant={"dark"} isPresentInList={user.favoriteMovies.some(movie => movie.id === id)} onClick={() => null} />
        <ViewButton variant={"success"} isWatched={true} onClick={() => null }/>
          
        </div>
      </Card.Body>
    </Card>
    )
}

export default FilmCard;
