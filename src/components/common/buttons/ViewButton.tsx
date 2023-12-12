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
        <Button onClick={onClick} variant={variant}>{isWatched ? <><span>Not Watched </span><FaEyeSlash  /></> : <><span>Watched </span><GrView  /></> } </Button>
    )
}

export default ViewButton;