import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import { db } from './firebase';
import { Timestamp, collection, getDocs } from "firebase/firestore";
import './Home.css'
import './button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import UserBlockButton from './UserBlockButton';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map((doc) => {
        // Получаем данные каждого документа
        const userData = doc.data();
        // Добавляем идентификатор документа к данным
        userData.id = doc.id;
        return userData;
      });
      console.log("Список пользователей:", userList);

      // Создаем массив идентификаторов пользователей
      const ids = userList.map(user => user.id);
      console.log("Идентификаторы пользователей:", ids);

      setUsers(userList);
      setUserIds(ids); // Сохраняем идентификаторы пользователей в переменную состояния
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };
  
  

  const handleUpdateUser = () => {
    // Эта функция будет вызываться из компонента UserBlockButton для обновления данных пользователя
    console.log('Данные пользователя были обновлены');
    // Вы можете добавить здесь логику для обновления пользовательских данных в состоянии
    // Например, можно заново загрузить список пользователей с сервера
  };
  return (
    <div className="content-container">
      <h1>Welcome to the HomePage</h1>
      
      <div className='buttons'>
      {/* <UserBlockButton/> */}
      <UserBlockButton onSelectAll={true} isSelected={false} />
        <button class="glow-on-hover" type="button">
        <FontAwesomeIcon icon={faUserXmark} className='icon'/>
            DELETE
        </button>
        </div>
       <table className='table'>
        <thead>
          <tr className='tr'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Last Login At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
       <UserDetails key={user.userId} user={user} onUpdateUser={handleUpdateUser} />
    ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;





// // // import React, { useState, useEffect } from 'react';
// // // import { db } from "./firebase";
// // // import { collection, getDocs } from 'firebase/firestore';

// // // const AllUsers = () => {
// // //   const [users, setUsers] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     fetchUsers();
// // //   }, []);

// // //   const fetchUsers = async () => {
// // //     try {
// // //       const usersCollection = collection(db, 'users');
// // //       const querySnapshot = await getDocs(usersCollection);
// // //       const usersList = querySnapshot.docs.map(doc => doc.data());
// // //       setUsers(usersList);
// // //     } catch (error) {
// // //       console.error('Error fetching users:', error);
// // //       setError(error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>All Users</h2>
// // //       {error && <div>Error: {error}</div>}
// // //       <table>
// // //         <thead>
// // //           <tr>
// // //             <th>ID</th>
// // //             <th>Display Name</th>
// // //             <th>Email</th>
// // //             <th>Email Verified</th>
// // //             <th>Registration Date</th>
// // //             <th>Last Login Date</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {users.map((user, index) => (
// // //             <tr key={index}>
// // //               <td>{index + 1}</td>
// // //               <td>{user.displayName}</td>
// // //               <td>{user.email}</td>
// // //               <td>{user.emailVerified ? 'Yes' : 'No'}</td>
// // //               <td>{new Date(user.metadata.creationTime).toLocaleString()}</td>
// // //               <td>{new Date(user.metadata.lastLoginAt).toLocaleString()}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default AllUsers;
// // // import React, { useState, useEffect } from 'react';
// // // import { db } from "./firebase";
// // // import { collection, getDocs } from 'firebase/firestore';

// // // const AllUsers = () => {
// // //   const [users, setUsers] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     fetchUsers();
// // //   }, []);

// // //   const fetchUsers = async () => {
// // //     try {
// // //       const usersCollection = collection(db, 'users');
// // //       const querySnapshot = await getDocs(usersCollection);
// // //       const usersList = querySnapshot.docs.map(doc => doc.data());
// // //       console.log('Users from Firestore:', usersList); // Debug output
// // //       setUsers(usersList);
// // //     } catch (error) {
// // //       console.error('Error fetching users:', error);
// // //       setError(error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>All Users</h2>
// // //       {error && <div>Error: {error}</div>}
// // //       <table>
// // //         <thead>
// // //           <tr>
// // //             <th>ID</th>
// // //             <th>Display Name</th>
// // //             <th>Email</th>
// // //             <th>Email Verified</th>
// // //             <th>Registration Date</th>
// // //             <th>Last Login Date</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {users.map((user, index) => (
// // //             <tr key={index}>
// // //               <td>{index + 1}</td>
// // //               <td>{user.displayName}</td>
// // //               <td>{user.email}</td>
// // //               <td>{user.emailVerified ? 'Yes' : 'No'}</td>
// // //               <td>{new Date(user.metadata.creationTime).toLocaleString()}</td>
// // //               <td>{new Date(user.metadata.lastLoginAt).toLocaleString()}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default AllUsers;
// // Ваш файл HomePage.js

// import React, { useState, useEffect } from 'react';
// import UserDetails from './UserDetails';
// import UserBlockButton from './UserBlockButton'; // Импортируем компонент кнопки блокировки
// import { db } from './firebase';
// import { collection, getDocs } from "firebase/firestore";
// import './Home.css'
// import './button.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserXmark } from '@fortawesome/free-solid-svg-icons';

// const HomePage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'users'));
//       const userList = querySnapshot.docs.map((doc, ident) => {
//         return {
//           id: ident,
//           ...doc.data(),
//         };
//       });
//       console.log(querySnapshot.docs)
//       setUsers(userList);
//     } catch (error) {
//       console.error('Ошибка при получении пользователей:', error);
//     }
//   };

//   return (
//     <div className="content-container">
//       <h1>Welcome to the HomePage</h1>
//       <div className='buttons'>
//         <button class="glow-on-hover" type="button">
//           <FontAwesomeIcon icon={faUserXmark} className='icon' />
//           DELETE
//         </button>
//       </div>
//       <table className='table'>
//         <thead>
//           <tr className='tr'>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Created At</th>
//             <th>Last Login At</th>
//             <th>Status</th>
//             {/* <th>Actions</th> Добавляем новую колонку для кнопки блокировки */}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <UserDetails user={user} />
//               {/* <tr>
//                 <UserBlockButton user={user} />
//               </tr> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HomePage;
