import { useContext } from "react"
import { ThemeContext } from "../../Context/ThemeContext"

export default function Home(){

    const {theme, toggleTheme} = useContext(ThemeContext)

    return <h1 onClick={toggleTheme}>Teste</h1>
}