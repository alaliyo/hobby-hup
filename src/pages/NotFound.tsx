import styled from 'styled-components';

function NotFound() {
    return(
        <NotFoundBody>
            <h1>404 오류입니다. url을 확인해주세</h1>
        </NotFoundBody>
    );
}

export default NotFound;

const NotFoundBody = styled.div`
    margin-top: 200px;
    text-align: center;
`;