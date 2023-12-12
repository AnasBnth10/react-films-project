import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { IoHeartDislike } from "react-icons/io5";
import { FcLike } from "react-icons/fc";

interface IProps {
    variant: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    isPresentInList: boolean
}

const AddOrRemoveButton: React.FC<IProps> =  ({
    variant,
    onClick,
    isPresentInList

}) => {
    return (
        <Button onClick={onClick} variant={variant}>{isPresentInList ? <><span>Dislike </span><IoHeartDislike  /></> : <><span>Like </span><FaHeart  /></> }</Button>
    )
}

export default AddOrRemoveButton;