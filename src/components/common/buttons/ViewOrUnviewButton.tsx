import { Button } from "react-bootstrap";
import { FaEyeSlash, FaHeart,FaEye } from "react-icons/fa";
import { IoHeartDislike } from "react-icons/io5";
import { FcLike } from "react-icons/fc";

interface IProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    isViewed: boolean,
    
}

const ViewOrUnviewButton: React.FC<IProps> =  ({
    onClick,
    isViewed

}) => {
    return (
        <Button onClick={onClick} className={"view-or-unview-btn"} variant={isViewed ? "danger" : "dark"} >{isViewed ? <div className="card-btn-unview"><span>Unview </span><FaEyeSlash   /></div> : <div className="card-btn-view"><span>Viewed </span><FaEye   /></div> }</Button>
    )
}

export default ViewOrUnviewButton;