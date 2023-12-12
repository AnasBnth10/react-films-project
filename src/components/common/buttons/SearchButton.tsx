import { Button } from "react-bootstrap";
import './Buttons.scss'
;
import { ChangeEvent, MouseEventHandler } from "react";

interface IProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SearchButton: React.FC<IProps> =  ({
    onClick
}) => {
    return (
        <Button className="search-btn" onClick={onClick} variant="dark">Search</Button>
    )
}

export default SearchButton;