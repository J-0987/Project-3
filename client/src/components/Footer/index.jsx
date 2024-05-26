import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-gray-200 py-6 w-full">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center py-3 md:py-0">
                        <p className="text-gray-700">&copy; THE SHOP</p>
                    </div>
                    <div className="text-center py-3 md:py-0">
                        <Link to="/about" className="text-blue-500 hover:underline">
                            <p>About The Shop</p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
