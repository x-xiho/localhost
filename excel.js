const express = require('express');
const app = express();
const ExcelJS = require('exceljs'); // ExcelJS 라이브러리 import
const xlsx = require('xlsx');

app.use(express.json());


// ExcelTest 함수 정의
async function ExcelTest() {
  try {
    // 엑셀 워크북 생성 및 시트 생성
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    // 대표행(타이틀행) 설정 및 입력
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 35 },
      { header: 'Birth', key: 'birth', width: 15 },
      { header: 'Password', key: 'password', width: 15 }
    ];

    // 데이터 추가 (행단위 추가)
    worksheet.addRow({ id: 1, name: 'Hong', birth: new Date().toLocaleDateString(), password: 'abc123' });
    worksheet.addRow({ id: 2, name: 'Kim', birth: new Date().toLocaleDateString(), password: 'abc123' });
    worksheet.addRow({ id: 3, name: 'Lee', birth: new Date().toLocaleDateString(), password: 'abc123' });
    worksheet.addRow({ id: 4, name: 'Park', birth: new Date().toLocaleDateString(), password: 'abc123' });
    worksheet.addRow({ id: 5, name: 'Hyo', birth: new Date().toLocaleDateString(), password: 'abc123' });

    // 엑셀 데이터 저장
    await workbook.xlsx.writeFile('export.xlsx');

    ////👆👆👆 여기까지가 엑셀 저장 👆👆👆

    // 엑셀 데이터 읽고 워크북 불러오기
    const newWorkbook = new ExcelJS.Workbook();
    await newWorkbook.xlsx.readFile('export.xlsx');

    // 엑셀 시트 불러오기
    const newworksheet = newWorkbook.getWorksheet('My Sheet');
  
    // 다른 이름으로 저장 (기존 파일명과 같으면 덮어쓰기)
    await newWorkbook.xlsx.writeFile('export.xlsx');

    // 종료
    console.log("끝!");
  } catch (error) {
    console.error("Excel 처리 중 오류 발생:", error);
  }
}

// post시에 클라이언트로부터 값을 받기 
app.post('/api/saveFormData', async (req, res) => {
const requestData = req.body; // 클라이언트가 보낸 JSON 데이터
console.log('받은 데이터:', requestData); // 클라이언트로부터 받은 데이터 사용

// 클라이언트에 응답
  res.json({ message: '데이터가 성공적으로 받아졌습니다.' });
  });

// 클라이언트에 반환 테스트
app.get('/getUserInfo', async (req, res) => {
  
  res.status(200).json([
    { id: 1, pw: '1234', name: 'JUST' },
    { id: 2, pw: '1234', name: 'DO' },
    { id: 3, pw: '1234', name: 'IT' }
  ]);
});

// excel파일에 있는 전체 데이터 리턴
app.get('/getExcelData', (req, res) => {
  // 엑셀 파일을 읽어서 데이터 추출
  const workbook = xlsx.readFile('./export.xlsx');
  const sheetName = workbook.SheetNames[0]; // 첫 번째 시트를 사용하는 예제
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // 데이터를 JSON 형식으로 클라이언트에게 반환
  res.json(data);
});

// id가 1인 사용자의 값만 리턴해주는 endpoint
app.get('/getUserById/:id', (req, res) => {
  const userId = parseInt(req.params.id); // URL 파라미터에서 id 추출
  const filePath = './export.xlsx'; // Excel 파일의 경로

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = 'My Sheet'; // 첫 번째 시트를 사용하는 예제
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // id가 1인 사용자 찾기
    const user = data.find(item => item.Id === userId);

    if (!user) {
      // 사용자를 찾지 못한 경우 404 에러 반환
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 사용자를 찾은 경우 해당 사용자 정보를 JSON 형식으로 반환
    res.json(user);
  } catch (error) {
    // 파일을 읽는 동안 에러가 발생한 경우 처리
    console.error('파일 읽기 에러:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});


// 서버 시작
const port = 3000; // 사용할 포트 번호
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
