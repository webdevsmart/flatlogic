export default {
  isBackend: process.env.REACT_APP_BACKEND,
  id_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpmYWxzZSwibG9naW4iOiJ1c2VyIiwiaWF0IjoxNTczNzQ4ODI1LCJleHAiOjE2MjA0MDQ4MjV9.Jd1Trqu6izHq2R3uw4enrDlQKG4mzZdipSMdYQD_9JM',
  api_url: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/graphql`, 
  port: process.env.REACT_APP_SERVER_PORT,
  server_url: process.env.REACT_APP_SERVER_URL,
};