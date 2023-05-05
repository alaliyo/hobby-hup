import Explanations from "../components/home/Explanations";

function Home() {
    return(
        <div>
            <Explanations className="box1" height={0}></Explanations>
            <Explanations className="box2" height={300} />
            <Explanations className="box3" height={600} />
        </div>
    );
}

export default Home;