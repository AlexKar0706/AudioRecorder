import Link from 'next/link'
import navBarStyles from '../../styles/NavigationBar.module.css'

const NavigationLine = () => 
{
    return (
        <div className={navBarStyles.line}>
            <Link href="/">About</Link>
        </div>
    )
}

export default NavigationLine