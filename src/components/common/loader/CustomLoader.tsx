import { ClipLoader } from "react-spinners";



interface IProps {
    loading: boolean;
}

const CustomLoader: React.FC<IProps> =  ({
    loading
}) => {
    return (
       <ClipLoader loading={loading} color="#F0E68C" size={30} />
    )
}

export default CustomLoader;