import { Button } from "react-bootstrap";
import { GrView  } from "react-icons/gr";
import { FaEyeSlash } from "react-icons/fa";

interface IProps {
    variant: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    isWatched: boolean
}

const ViewButton: React.FC<IProps> =  ({
    variant,
    onClick,
    isWatched
}) => {
    return (
        <Button onClick={onClick} className="view-btn" variant={variant}>{isWatched ? <><FaEyeSlash color="red" style={{ color: 'red'}}  /></> : <><GrView style={{ color: "red"}}  /></> } </Button>
    )
}

export default ViewButton;