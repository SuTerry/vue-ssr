/**
 * 接口域名
 */

const port = require('../../config')[process.env.NODE_ENV].port

export const API_HOST = (process.env.NODE_ENV === 'production') ?
  `http://127.0.0.1:${port}` :
  (process.env.NODE_ENV === 'preproduction' ?
    `http://127.0.0.1:${port}` :
    (process.env.NODE_ENV === 'testing' ?
      `http://127.0.0.1:${port}` :
      (process.env.NODE_ENV === 'development' ?
        `http://10.10.202.109:${port}` :
        `http://127.0.0.1:${port}`)))