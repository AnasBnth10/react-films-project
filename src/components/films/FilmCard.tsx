import { Button, Card } from "react-bootstrap";
import Layout from "../common/layout/Layout"
import './FilmCard.scss';
import ViewButton from "../common/buttons/ViewButton";
import InfoButton from "../common/buttons/InfoButton";
import AddButton from "../common/buttons/AddOrRemoveButton";
import AddOrRemoveButton from "../common/buttons/AddOrRemoveButton";

interface IProps {
    title: string,
    year: string,
    img: string,
    type: string
}

const FilmCard: React.FC<IProps> =  ({
    title,
    year,
    img,
    type
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
        <AddOrRemoveButton variant={"dark"} isPresentInList={false} onClick={() => null} />
        <ViewButton variant={"success"} isWatched={true} onClick={() => null }/>
          
        </div>
      </Card.Body>
    </Card>
    )
}

export default FilmCard;
