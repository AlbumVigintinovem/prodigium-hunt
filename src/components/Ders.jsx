import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Ders = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, [])

  return (
    <div>
      {loading && <div>Yükleniyor..</div>}

      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Ders