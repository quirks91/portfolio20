/* GGang SectionIn */
$.fn.GgangSectionIn = function(fuc){

  /* 변수 선언 */
  let el = $(this);
  let winScrollTop; // 스크롤바의 높이를 담을 변수를 선업합니다
  let sectionOfffsetTop; // 섹션의 오프셋탑값을 저장할 변수
  let sectionHeight; //섹션의 높이를 담을 변수
  let sectionOffsetBottom; //섹션의 오프셋 바텀값을 저장할 변수
  let checkInSection = false; //섹션에 진입해 함수가 실행되었는지 체크하는 변수
  let fastIn; //섹션에 더 빠르게 진입하도록 값을 조절할 변수

  let startFunction = fuc; //깡 섹션인 함수에 전달된 함수
  let isFunction = typeof(startFunction) === 'function' ? true : false; //전달된 값이 함수인지 체크

  function setProperty(){ // 스크롤할때 변할 값들을 셋팅해주는 함수

    fastIn = $(window).height() / 2; // 섹션에 더 빨리 진입해 함수가 실행되록 값을 조절함
      winScrollTop = $(window).scrollTop(); //스크롤바의 현재 위치를 구합니다
      sectionOfffsetTop = el.offset().top - fastIn; //섹션의 오프셋 탑 값
      sectionHeight = el.height(); //섹션의 높이값
      sectionOffsetBottom = sectionOfffsetTop + sectionHeight + fastIn; //섹션의 오프셋 바텀값

  };

function inSection(){ // 섹션에 진입했을때 액션을 처리해줄 함수입니다.
  setProperty(); // 스크롤할때 변해야할 값들의 변수를 선언한 함수입니다
  if(winScrollTop >= sectionOfffsetTop && winScrollTop <= sectionOffsetBottom){ //해당 섹션의 위치에 도달했는지 체크합니다.
    if(isFunction && !checkInSection){ //실행될 함수가 있고 한번도 실행이 되지 않았다면 실행합니다
      checkInSection = true;
      startFunction(); //스타트 함수 실행
    }
  }
};

  function init(){ //최초 한번실행
      inSection(); // 섹션에 진입했을때 처리해줄 함수입니다.
  };

  $(window).scroll(function(e){ //스크롤 이벤트를 추가합니다.
      inSection(); // 섹션에 진입했을때 처리해줄 함수입니다.
  });

  $(window).resize(function(){ //리사이즈 이벤트를 추가합니다.
      inSection();
  });

  init(); //start

};

$(function(){

$('.sec01').GgangSectionIn(function(){
  $('.sec01').addClass('active');
});

$('.section_today').GgangSectionIn(function(){
  $('.section_today').addClass('active');
  countDate();
});

$('.section_product .prd_mask').GgangSectionIn(function(){
  $('.section_product .prd_mask').addClass('active');
});

$('.section_product .text_img').GgangSectionIn(function(){
  $('.section_product .text_img').addClass('active');
});

$('.section_textmask').GgangSectionIn(function(){
  $('.section_textmask').addClass('active');
});

$('.section_overlap').GgangSectionIn(function(){
  $('.section_overlap').addClass('active');
});

/* 날짜 카운트*/
  function countDate(){

      let el = $('.date_count');
      let date = new Date();
      let todayDate = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()); //오늘의 날짜를 구함
      let rolling = 24; //롤링될 개수
      let resultArray = [];
          resultArray = todayDate.split(''); //롱링할 오늘날짜를 나눠서 배열에 담음

      $.each(resultArray, function(idx, val) {
    let conuntBox = $('<div class="count_box" />');
    let numberArray = []; //쪼갠 날짜를 담을 배열 선언
    let number = Number(val);

          for(let i = 0; i <= rolling; i++){ //롤링될 숫자만큼 값을 생성해 배열에 담음
              let sum = number + i;
              let num = sum >= 10 ? Number(String(sum).split('')[1]) : sum; //값이 10보다커질경우 첫번째 자릿수를 버리도록 함
              numberArray[i] = num;
          };

          numberArray.reverse(); //롤링방향 때문에 배열을 뒤집어줍니다.

          numberArray.forEach(function(val){ //날짜를 담은 span엘리먼트를 coutBox에 어펜드

             let countValue = $('<span/>', {
                  text: val
      });

             countValue.appendTo(conuntBox)

          });

    conuntBox //최종 엘리먼트에 추가함. 딜레이와 큐를 이용해 롤링 타이밍을 처리합니.
    .appendTo(el)
    .delay(idx * 300)
    .queue(function(){
      $(this).addClass('active');
    });
      });

  };

/* 네비 리모컨*/
$('.nav_list .list li a').click(function(e){

  if($(this.hash).offset()){
    $('html')
    .animate({
      scrollTop:$(this.hash).offset().top
    }, 500);
  }

});

});
