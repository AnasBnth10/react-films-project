import { Button } from "react-bootstrap";
import { GrView  } from "react-icons/gr";
import { FaEyeSlash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


interface IProps {
    width?: string | number | undefined,
    height?: string | number | undefined
}

const CustomSkeleton: React.FC<IProps> =  ({
    width,
    height
}) => {
    return (
       <Skeleton baseColor="#F0E68C" highlightColor="lightgrey" width={width} height={height} />
    )
}

export default CustomSkeleton;