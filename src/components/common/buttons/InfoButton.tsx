import { Button } from "react-bootstrap";
import { IoInformation } from "react-icons/io5";
import { FaInfo } from "react-icons/fa";
import './Buttons.scss';

interface IProps {

}

const InfoButton: React.FC<IProps> =  ({

}) => {
    return (
        <button className="info-btn text-primary" ><IoInformation   /></button>
    )
}

export default InfoButton;