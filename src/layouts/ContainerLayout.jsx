import { Fragment } from "react"
import Navbar from "../components/Navbar"

const ContainerLayout = ({ children }) => {

    return (
        <Fragment>
            <Navbar />
            <main className="w-full max-w-7xl mx-auto">
                {children}
            </main>
        </Fragment>
    )
}

export default ContainerLayout
