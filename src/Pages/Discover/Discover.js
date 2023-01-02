import Header from "../../Components/Header/Header";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function Discover() {
    return (
        <div>
            <Header page='discover' />
            <FadeIn>
                <h1 className="content-container mt-5 text-center">
                    Coming Soon!
                </h1>
            </FadeIn>
        </div>
    )
}