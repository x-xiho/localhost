import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // 필요한 다른 사용자 데이터 추가
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios를 사용하여 백엔드로 POST 요청 보내기
      const response = await axios.post('http://localhost:3000/saveToExcel', formData);

      console.log('백엔드 응답:', response.data);
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  return (
    <div className="container">

      {/* form태그 시작 */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>로그인 데이터</legend>

          {/* 아이디 비밀번호 예시 */}
          아이디: 
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          비밀번호: 
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </fieldset>

        {/* 여러가지 옵션 선택 데이터들 */}
        <fieldset>
          <legend>여러가지 옵션 선택 데이터들</legend>
          남<input type="radio" name="gender" />
          여<input type="radio" name="gender" />

          <br />
          관심사: 연예 <input type="checkbox" name="checkbox1" />
          스포츠<input type="checkbox" name="checkbox1" />
          IT<input type="checkbox" name="checkbox1" />

          <br />
          지역선택<select name="city1">
            <optgroup label="서울">
              <option value="songpa">송파구</option>
              <option value="gangnam">강남구</option>
              <option value="gangdong">강동구</option>
            </optgroup>
            <optgroup label="경기도">
              <option value="seongnam-si">성남시</option>
              <option value="yongin-si">수원시</option>
              <option value="anyang-si">안양시</option>
            </optgroup>
          </select>
          <br />

          재산범위 <input type="range" min="0" max="100" step="10" name="range" />
        </fieldset>

        {/* 제출 버튼 */}
        <input type="submit" value="로그인" />
        <input type="reset" value="리셋" />
      </form>
    </div>
  );
}

export default App;

