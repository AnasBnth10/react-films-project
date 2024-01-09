import { Button } from "react-bootstrap";
import { GrView  } from "react-icons/gr";
import { FaEyeSlash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


interface IProps {
}

const CustomSkeleton: React.FC<IProps> =  ({
}) => {
    return (
       <Skeleton baseColor="lightgrey" highlightColor="F0E68C" />
    )
}

export default CustomSkeleton;