console.log("I'm here")

// 메뉴 버튼 열고 닫기
const menu_btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const sidebar = document.querySelector('.menu-contents .sidebar');
const menuBTN = () => {
  let len = menu_btn.classList.length;
  if(len === 1){
    menu_btn.className += ' after';
    menu.className += ' after';
    sidebar.className += ' after';
  }
  else{
    menu_btn.classList.remove('after');
    menu.classList.remove('after');
    sidebar.classList.remove('after');
  }
}