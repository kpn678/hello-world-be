let axios = require('axios');

const harperGetMessage = (room) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw= process.env.HARPERDB_PW;
  if (!dbPw || !dbUrl) return null; 

  let data = JSON.stringify({
    operation: 'SQL',
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`
  });

  let config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-type': 'application/json',
      Authorization: dbPw
    },
    data: data
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data))
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

module.exports = harperGetMessage;