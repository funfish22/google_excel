let sendButton = document.getElementById('send');
let searchButton = document.getElementById('search');
let searchSuccess = document.getElementById('searchSuccess');
let all = document.getElementById('all');

let allDom = ''
let searchSuccessDom = ''

function send() {
  let name = document.querySelector('#nameValue').value;
  let phone = document.querySelector('#phoneValue').value;
  let adress = document.querySelector('#adressValue').value;
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbwa-x0rnFLSIZ4OxBhzDeFzdetQ0qdMcM4S2L4e_1Nil7WFwd2QsR7HSK620vqjj_37/exec",
    type: "POST",
    data: {
        "name": name,
        "phone": phone,
        "adress": adress,
        "action": 'add'
    },
    success: function(response) {
      if(response == "成功"){
        alert("成功");
        searchAll()
      }
      if(response == "失敗"){
        alert("失敗");
      }
    },
  });
};

function search() {
  let searchName = document.querySelector('#searchValue').value;
  searchSuccess.innerHTML = ''
  searchSuccessDom = ''
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxA0IH7JNis6pO44nON4UGtN4S628aTFDwg8eowqAO6eaANTFSfL0k1CMuuWWqbDbT6/exec",
    type: "POST",
    data: {
        "searchName": searchName,
        "action": 'search'
    },
    success: function(response) {
      console.log('response', response)
      response.forEach((element, index) => {
        console.log('element', element)
        console.log('index', index)
        searchSuccessDom += `<div>第${index + 1}筆，姓名:${element.data[0]}，電話:${element.data[1]}，地址:${element.data[2]}</div>`
      })
      console.log('searchSuccessDom', searchSuccessDom)
      searchSuccess.innerHTML = searchSuccessDom
    },
  });
}

sendButton.addEventListener('click', send);
searchButton.addEventListener('click', search)

function searchAll() {
  all.innerHTML = ''
  allDom = ''
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxA0IH7JNis6pO44nON4UGtN4S628aTFDwg8eowqAO6eaANTFSfL0k1CMuuWWqbDbT6/exec",
    type: "GET",
    success: function(response) {
      console.log('response', response)
      response.forEach((element, index) => {
        console.log('element', element)
        console.log('index', index)
        allDom += `<div>第${index + 1}筆，姓名:${element.data[0]}，電話:${element.data[1]}，地址:${element.data[2]}，<button id="removeButton" value="${element.index}">刪除 序號${element.index}</button></div>`
      })
      all.innerHTML = allDom
    },
  });
}

$('body').on('click', '#removeButton', function(e) {
  console.log('e', e.target.value)
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxA0IH7JNis6pO44nON4UGtN4S628aTFDwg8eowqAO6eaANTFSfL0k1CMuuWWqbDbT6/exec",
    type: "POST",
    data: {
        "deleteId": e.target.value,
        "action": 'delete'
    },
    success: function(response) {
      if(response == "成功"){
        alert("成功");
        searchAll()
      }
      if(response == "失敗"){
        alert("失敗");
      }
    },
  });
})

searchAll()