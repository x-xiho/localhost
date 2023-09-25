const express = require('express')
var cors = require('cors')

const port = 3000
const app = express();
const excel = require('exceljs'); 

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

//비동기 함수 생성
async function ExcelTest(){
    //엑셀 워크북 생성 및 시트 생성
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
  
    //대표행(타이틀행) 설정 및 입력
  worksheet.columns = [
    {header: 'Id', key: 'id', width: 10},
    {header: 'Name', key: 'name', width: 35}, 
    {header: 'Birth', key: 'birth', width: 15},
  ];
  
  //데이터 추가 (행단위 추가)
  worksheet.addRow({id: 1, name: 'Hong', birth: new Date().toLocaleDateString()});
  worksheet.addRow({id: 2, name: 'Kim', birth: new Date().toLocaleDateString()});
  
  //엑셀 데이터 저장
  await workbook.xlsx.writeFile('export.xlsx');
  
  ////👆👆👆 여기까지가 엑셀 저장 👆👆👆
  
  ////👇👇👇 여기서부터 기존 엑셀파일에 추가 데이터 입력 👇👇👇
  
  //엑셀 데이터 읽고 워크북 불러오기
  const newWorkbook = new excel.Workbook();
  await newWorkbook.xlsx.readFile('export.xlsx');
  
  //엑셀 시트 불러오기
  const newworksheet = newWorkbook.getWorksheet('My Sheet');
  
  //데이터 추가 (행단위 추가)
  newworksheet.addRow(
    {id: 3, name: 'Lee', date: new Date().toLocaleDateString()}
  );
  
  //다른이름으로 저장 (기존 파일명과 같으면 덮어쓰기)
  await newWorkbook.xlsx.writeFile('export2.xlsx');
  
  //종료
  console.log("끝!");
  };
  
  
  //함수실행
  ExcelTest();