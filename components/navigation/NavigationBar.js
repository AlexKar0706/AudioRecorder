import NavigationLine from './NavigationLine'
import navBarStyles from '../../styles/NavigationBar.module.css'

const NavigationBar = () => 
{
    return (
        <div className={navBarStyles.nav}>
            <NavigationLine />
        </div>
    )
}

export default NavigationBar