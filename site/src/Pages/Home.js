import React from 'react';

const Home = (props) => {
    const {apiUrl, user} = props;

    return (
        <div>
            <h1>{user.username}</h1>
        </div>
    );
}

export default Home;