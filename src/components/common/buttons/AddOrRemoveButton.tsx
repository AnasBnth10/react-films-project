import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { IoHeartDislike } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import "./Buttons.scss";

interface IProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    isPresentInList: boolean
}

const AddOrRemoveButton: React.FC<IProps> =  ({
    onClick,
    isPresentInList

}) => {
    return (
        <Button onClick={onClick} className={"add-or-remove-btn"} variant={isPresentInList ? "danger" : "dark"} >{isPresentInList ? <div className="card-btn-dislike"><span>Dislike </span><IoHeartDislike  /></div> : <div className="card-btn-like"><span>Like   </span><FaHeart   /></div> }</Button>
    )
}

export default AddOrRemoveButton;