import { ReactNode } from 'react';
import Footer from '../footer/Footer';
import NavBar from '../nav/NavBar';
import './Layout.scss';


interface IProps {
children: ReactNode
}

const Layout: React.FC<IProps> =  ({
children
}) => {
    return (
        <div className='app-containers'>
        <NavBar />
        <div className='children'>
            {children}
        </div>
        <br/>
        <Footer/>
        </div>
    )
}

export default Layout;