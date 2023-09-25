const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const PORT = 3000;
const CLIENT_ID = '793984160ff87c17d408ab1cc03f38ef';
const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';

app.get('/', (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoAuthURL);
});

app.get('/oauth', async (req, res) => {
  const { code } = req.query;

  // 카카오 토큰 얻기
  const tokenParams = {
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
  };

  try {
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', querystring.stringify(tokenParams), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const { access_token } = tokenResponse.data;

    // 카카오 사용자 정보 가져오기
    const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userData = userResponse.data;
    // 이곳에서 userData 활용

    res.json(userData);
  } catch (error) {
    console.error('Error during Kakao login:', error);
    res.status(500).send('Kakao login failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
