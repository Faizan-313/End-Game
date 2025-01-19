import Logo from '../../Public/images/logo.webp'

export default function Header(){
    return (
        <header>
            <div className='logo-heading'>
                <img src={Logo} className="logo" alt="Vite logo" />
                <h1>Assembly Endgame</h1>
            </div>
            <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
        </header>
    )
}