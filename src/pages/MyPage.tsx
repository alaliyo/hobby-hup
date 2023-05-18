import { useNavigate, useOutletContext } from "react-router-dom";
import { checkToken } from "../utils/authUtils";

interface userObj {
    displayName: string;
    email: string;
}

interface myPageProps {
    userObj: userObj;
}

function MyPage() {
    const { userObj } = useOutletContext<myPageProps>();
    const navigate = useNavigate();

    checkToken(navigate);
    console.log(userObj);
    return(
        <div>
            <h3>{userObj.displayName}</h3>
        </div>
    );
}

export default MyPage;