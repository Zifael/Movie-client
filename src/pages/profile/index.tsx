import React from 'react';
import { useSelector } from 'react-redux';
import { userModel } from 'entities/user'

function Profile() {

    const user = useSelector(userModel.selectors.user)

    return (
        <div>
            <h1>{user.email}</h1>
            <h1>{user.login}</h1>
        </div>
    );
}

export default Profile;