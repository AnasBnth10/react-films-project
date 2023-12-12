import './Footer.scss';

interface IProps {

}

const Footer: React.FC<IProps> =  ({

}) => {
    return (
        <footer>
        <h5>&copy; <span id="currentYear">{new Date().getFullYear()}</span> Films API - Anas Bentaher</h5>
        

    </footer>
    )
}

export default Footer;