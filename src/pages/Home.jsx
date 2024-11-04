import HeaderHome from "../components/HeaderHome"
import { Outlet } from "react-router-dom"
import ContainerLayout from "../layouts/ContainerLayout"
import MetaTag from "../layouts/MetaTag"

const HomePage = () => {

    return (
        <ContainerLayout>
            <MetaTag title="Welcome SIMS PPOB" description="Home" />
            <HeaderHome />
            <Outlet />
        </ContainerLayout>
    )
}

export default HomePage
