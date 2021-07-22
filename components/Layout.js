import NavigationBar from "./navigation/NavigationBar";
import Footer from "./Footer";

const Layout = ({ children }) => 
{
    return (
        <>
            <NavigationBar />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout;