import React from 'react';
import UserBlockButton from './UserBlockButton';

const UserDetails = ({ user, onUpdateUser, userIds }) => {
  return (
    <tr>
      <td>{user.id}</td>

      <td>{user.displayName}</td>
      <td>{user.email}</td>
      <td>{user.creationTime}</td>
      <td>{user.lastLoginAt}</td>
      <td>
      <UserBlockButton userId={user.id} docId={userIds[user.id]} isBlocked={user.isBlocked} onUpdate={onUpdateUser} />

     </td>
    </tr>
  );
};

export default UserDetails;
