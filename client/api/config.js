/**
 * 接口域名
 */

export const API_HOST = (process.env.NODE_ENV === 'production') ?
  'http://127.0.0.1:3001' :
  (process.env.NODE_ENV === 'preproduction' ?
    'http://127.0.0.1:3001' :
    (process.env.NODE_ENV === 'testing' ?
      'http://127.0.0.1:3001' :
      (process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:3001' :
        'http://127.0.0.1:3001')))