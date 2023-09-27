import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [get, setGet] = useState(false);
  const [data, setData] = useState([]);

  const handleget = (e) => {
    axios.get('http://localhost:3000/api/getFormData')
      .then(response => {
        setData(response.data);
        setGet(!get);
      })

      .catch(error => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    radio: '',
    // 나머지 필드들 추가
  });


  // 버튼 누르면 데이터 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/api/saveFormData', formData)
      .then((response) => {
        console.log(response.data);
        alert('데이터가 성공적으로 저장');
      })

      .catch((error) => {
        console.error(error);
        alert('데이터 저장 중 오류가 발생');
      });

  };

  // 변경되는 데이터를 formData에 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className='container'>

      {/* form태그 시작 */}
      <form onSubmit={handleSubmit}>

        <fieldset >
          <legend>form 데이터 연습</legend>

          {/* 아이디 비밀번호 예시 */}
          이메일: <input type="email" name="email" placeholder="이메일" onChange={handleChange} value={formData.email} />
          <br />
          비밀번호: <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} value={formData.password} />
          <br />

          <h3> 나의 취향은? </h3>

          <label>
            1. 운동 <input type="radio" value='운동' checked={formData.radio === '운동'} name="radio" onChange={handleChange} />
          </label>

          <label>
            2. 미술 <input type="radio" value='미술' checked={formData.radio === '미술'} name="radio" onChange={handleChange} />
          </label>

          <label>
            3. 음악 <input type="radio" value='음악' checked={formData.radio === '음악'} name="radio" onChange={handleChange} />
          </label>


        </fieldset>


        <input type="submit" value="로그인" />
        <input type="reset" value="리셋" />
        <input type="button" value="내정보" onClick={handleget} />
      </form>

      {get ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.email}, {item.password}, {item.radio}</li>
          ))}
        </ul>
      ) : null}


    </div>
  );
}

export default App;