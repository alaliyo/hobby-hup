import Explanations from "../components/home/Explanations";
import { PageBody } from "./PageStyled";

function Home() {
    return(
        <PageBody>
            <Explanations className="box1" height={0}></Explanations>
            <Explanations className="box2" height={300} />
            <Explanations className="box3" height={600} />
        </PageBody>
    );
}

export default Home;