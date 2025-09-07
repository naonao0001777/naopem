// PhotoSwipe
// initPhotoSwipeFromDOM(".js-my-gallery");

$(function () {
  // 時間帯に応じて背景画像を変更
  function setBackgroundByTime() {
    const now = new Date();
    const hour = now.getHours();
    const parallaxBg = document.querySelector('.parallax-bg');
    
    // 既存のクラスを削除
    parallaxBg.classList.remove('morning', 'night');
    
    // 時間帯に応じてクラスを追加
    if (hour >= 5 && hour < 14) {
      // 朝 (5:00-13:59)
      parallaxBg.classList.add('morning');
    } else {
      // 夜 (14:00-4:59)
      parallaxBg.classList.add('night');
    }
  }
  
  // ページ読み込み時に背景を設定
  setBackgroundByTime();
  
  // 1時間ごとに背景をチェック（オプション）
  setInterval(setBackgroundByTime, 3600000); // 60 * 60 * 1000 = 1時間

  // 画面を読み込む際はローディングを出す
  $(".loader-wrap").css("display", "block");
  $(".loader").css("display", "block");

  //iOS対策
  //iOSでは疑似要素を含むaタグのリンクは２回タップしないと遷移とページ内スクロールをしないため、
  //ユーザーエージェント判定でiOSの場合はbodyタグにiosを付与し、対象の疑似要素をdisplay: noneする
  var ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) {
    $("body").addClass("ios");
  }

  //Worksのリンクを有効化
  //スライド（Swiper）内に記載のリンクを有効にするため下記の記述が必要 (;´･ω･)ｳｰﾝ･･･
  $(".works-url").on("click", "a", function (e) {
    e.stopPropagation();
  });

  //#region スクロール

  //ページ内スクロール
  var $nav = $(".gnav");
  var navHeight = $nav.outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      300,
      "swing"
    );
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300
    );
    return false;
  });

  // ページトップの表示
  var showFlag = false;
  var topBtn = $('#js-page-top');
  var gnavbar = $('.gnav');
  topBtn.css('bottom', '-100px');
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      if(!showFlag){
        showFlag = true;
        topBtn.stop().animate({ 'bottom': '20px' }, 200);
        gnavbar.stop().animate({
          'background-color': 'rgba(255, 0, 0, 0.7)'
        }, 250);
  
      }
    } else {
      if(showFlag){
        showFlag = false;
        topBtn.stop().animate({ 'bottom': '-100px' }, 550);
        gnavbar.stop().animate({
          'background-color': 'rgba(255, 0, 0, 0.0)'
        }, 250);
      }

    }
    scrollFadeAnime();
  });

  // 途中のところで更新をしても表示
  $(window).on("load", function () {
    if ($(window).scrollTop() > 300) {
      if(!showFlag){
        showFlag = true;
        topBtn.stop().animate({ 'bottom': '20px' }, 200);
      }
    }
  });

  // ウィンドウがリサイズされたときの時計表示
  var datedisplay = $('#datetime');
  var displaywidth = $(window).width();
  $(window).resize(function () {
    displaywidth = $(window).width();
    if (displaywidth < 900) {
      datedisplay.css("display", "none");
    }
    else {
      if ($(window).scrollTop() < 850) {
        datedisplay.css("display", "inline-block");
      }
    }
  });

  // 時計のスクロール表示
  $(window).scroll(function () {
    if ($(window).scrollTop() > 850) {
      datedisplay.css("display", "none");
    } else {
      if (displaywidth > 900) {
        datedisplay.css("display", "inline-block");
      }
    }
  });
  //#endregion

  // 画面ロード時フェードインする
  $(window).on("load", function () {
    // ローディングをフェードアウト
    $(".loader-wrap").fadeOut(600);
    $(".loader").fadeOut(600);
    // 本体
    $(".wrapper").fadeIn(600);
    // タイトルロゴ
    setTimeout(function () {
      $(".logo").fadeIn(1500);
    }, 700);
  });
});

// 6秒たったら強制的にロードをします
$(function () {
  setTimeout(function () {
    // 本体を表示
    $(".wrapper").css("display", "block");
    // タイトルを表示
    $(".logo").css("display", "block");
    // ローディングをフェードアウト
    $(".loader-wrap").fadeOut(600);
    $(".loader").fadeOut(600);
  }
    , 6000);
});

// 時計
function showtime() {
  var today = new Date();
  $weekday = ['日', '月', '火', '水', '木', '金', '土'];
  var month = today.getMonth() + 1;
  $('#datetime').html(month + "月" + today.getDate() + "日(" + $weekday[today.getDay()] + ") " + today.getHours() + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2));
}
setInterval(showtime, 1000);

// スクロールフェードイン
function scrollFadeAnime() {
  $('.fadeUpTrigger').each(function () {
    var elementPos = $(this).offset().top - 50;
    var top = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (top >= elementPos - windowHeight) {
      $(this).addClass('fadeUp');
    }
    else {
      $(this).removeClass('fadeUp ');
    }
  });
}