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

// img 가운데 정렬위해 class 추가하기
const paragh = document.querySelectorAll('p');

paragh.forEach((el) => {
  const imgList = el.querySelectorAll('img');
  if(imgList.length){
    el.className += 'align-img'
  }
})

// 큰 제목들 모아서 nav 만들기 위해 class 추가하기
const content = document.querySelector('.entry-content').querySelector('.contents_style');
const nav_ul = document.querySelector('#container .content-wrap nav ul');
const h1_tags = content.querySelectorAll('h1');
const h2_tags = content.querySelectorAll('h2');
const h3_tags = content.querySelectorAll('h3');
const h4_tags = content.querySelectorAll('h4');
const h_tags_arr = [h1_tags, h2_tags, h3_tags, h4_tags];

h_tags_arr.forEach((el) => {
  for(let item of el){
    item.className += "nav-tag"
  }
});

const nav_tags = document.querySelectorAll('.nav-tag');
// 아니 nav_tags는 왜 배열이 아니야? 출력은 이렇게 되는데 ?
// NodeList(9) [h1.nav-tag, h2.nav-tag, h3.nav-tag, h3.nav-tag, 
// h3.nav-tag, h3.nav-tag, h3.nav-tag, h3.nav-tag, h4.nav-tag]

/* chapter 구분없이 <ul>에 <li> 태그 꽉꽉 채운 것 */

// const filter_nav = [...nav_tags].filter((el) => el.querySelector('b'));
// const copy_f_nav = filter_nav.slice();

// console.log(copy_f_nav);

// for(let item of [...filter_nav]){
  
//   const li = document.createElement('li');
//   const text = item.querySelector('b').textContent;

//   if(text){
//     li.setAttribute('class', `nav-${item.tagName}`);
//     li.textContent = text;
//     nav_ul.append(li);
//   }

// }
// console.log(nav_ul);

/* chapter 구분한 상태로 <ul>에 <li> 태그 꽉꽉 채운 것 */
/* nav 목록을 tree 구조로 refactoring 해보기 ***** */
const nav_tags_list = () => {

  const nav_tags_num = [...nav_tags]
                         .filter((el) => el.querySelector('b'))
                         .map((el) => {
                            const num = Number(el.tagName[1]);
                            return num;
                          });

  let nav_org = []; 
  let p = [];
  
  [...nav_tags_num].forEach((el, idx, arr) => {

    p.push(nav_tags[idx]); /*여기만 바꿔주면 뭐~*/
    
    if(arr[idx] > arr[idx+1]){
      nav_org.push(p);
      p = [];
    }
    if(arr.length === idx + 1){
      nav_org.push(p);
    }

  });

  return nav_org;
}

const arrange_list = nav_tags_list();

arrange_list.forEach((p) => {
  for(let item of p){
    const li = document.createElement('li');
    const text = item.querySelector('b').textContent;
    li.setAttribute('class', `nav-${item.tagName}`);
    li.textContent = text;
    nav_ul.append(li);
  }
  const space = document.createElement('div');
  space.setAttribute('class', 'space');
  nav_ul.append(space);
});

const nav_ul_li = nav_ul.querySelectorAll('li');

// h1,h2,h3,h4 제목들 offsetTop 위치 모으는 함수
function getElementsOffsetTop(){
  let output = [];
  for(let i=1; i<=4; i++){
    const elements = document.querySelectorAll(`.entry-content h${i}`);
    elements.forEach(el => output.push(el.offsetTop));
  }
  return output.sort((a, b) => a - b);
}

const range = getElementsOffsetTop();

// scrollEvent : 제목을 지나갈 때 side_nav에 강조 표시
window.addEventListener('scroll', function(){
  let location = document.documentElement.scrollTop;
  
  for(let i=0; i<range.length; i++){
    if(range[i]-180 <= location && location <= range[i+1]-180){
      nav_ul_li[i].classList.add('bold');
    }
    else{
      nav_ul_li[i].classList.remove('bold');
    }
  }
  
});

// offsetParent & offsetLeft & offsetTop

// 잘 쓰이는 프로퍼티는 아님. offset은 요소가 화면에서 차지하는 영역 전체 크기를 나타낸다.
// offsetLeft : offsetParent를 기준으로 


