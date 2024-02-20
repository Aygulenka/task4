// import React, { useState } from 'react';
// import { doc, getFirestore } from 'firebase/firestore';
// import { updateDoc, setDoc } from 'firebase/firestore';
// import { db } from './firebase';

// const UserBlockButton = ({ userId, isBlocked, onUpdate }) => {
//   const [loading, setLoading] = useState(false);
//   const getUserIdFromDocumentId = async (userId) => {
//     try {
//       const firestore = getFirestore();
//       const userQuerySnapshot = await firestore.collection('users').where('userId', '==', userId).get();
//       if (!userQuerySnapshot.empty) {
//         const userDoc = userQuerySnapshot.docs[0];
//         console.log('Идентификатор документа:', userDoc.id);
//       } else {
//         console.log('Документ не найден для пользователя с userId:', userId);
//       }
//     } catch (error) {
//       console.error('Ошибка при получении документа:', error);
//     }
//   };
//   const handleBlockUser = async () => {
//     setLoading(true);
//     try {
//       const userRef = doc(db, 'users', userId);
//       if (isBlocked) {
//         await updateDoc(userRef, { isBlocked: false });
//       } else {
//         await setDoc(userRef, { isBlocked: true }, { merge: true });
//       }

//       // Получаем идентификатор документа
//       const documentId = userRef.id;
//       console.log('Идентификатор документа:', documentId);

//       console.log(`Пользователь ${userId} был ${isBlocked ? 'разблокирован' : 'заблокирован'}.`);
//       onUpdate(); // Вызываем функцию onUpdate для обновления данных в родительском компоненте
//     } catch (error) {
//       console.error(`Ошибка при обновлении состояния блокировки пользователя ${userId}:`, error);
//     }
//     setLoading(false);
//   };

//   return (
//     <button onClick={handleBlockUser} disabled={loading}>
//       {isBlocked ? 'Разблокировать' : 'Заблокировать'}
//     </button>
//   );
// };

// export default UserBlockButton;
import React, { useState } from 'react';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const UserBlockButton = ({ docId, isBlocked, onUpdate }) => { // Заменяем userId на docId
  const [loading, setLoading] = useState(false);

  const handleBlockUser = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, 'users', docId); // Используем пропс docId
      if (isBlocked) {
        await updateDoc(userRef, { isBlocked: false });
      } else {
        await setDoc(userRef, { isBlocked: true }, { merge: true });
      }
      console.log(`Пользователь ${docId} был ${isBlocked ? 'разблокирован' : 'заблокирован'}.`);
      onUpdate();
    } catch (error) {
      console.error(`Ошибка при обновлении состояния блокировки пользователя ${docId}:`, error);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleBlockUser} disabled={loading}>
      {isBlocked ? 'Разблокировать' : 'Заблокировать'}
    </button>
  );
};

export default UserBlockButton;

