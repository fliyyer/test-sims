import { Fragment } from "react"
import Navbar from "../components/Navbar"
import HeaderHome from "../components/HeaderHome"

const HomePage = () => {
    return (
        <Fragment>
            <Navbar />
            <main className="w-full max-w-7xl mx-auto">
                <HeaderHome />
            </main>
        </Fragment>
    )
}

export default HomePage
