export default function Footer(){
    const year = new Date().getFullYear();
    return (
        <p>&copy; {year} <strong> Peer Faizan</strong>. All rights reserved.</p>
    )
}