// PhotoSwipe
// initPhotoSwipeFromDOM(".js-my-gallery");

$(function () {
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
    if ($(this).scrollTop() > 300) {
      if (!showFlag) {
        showFlag = true;
        topBtn.stop().animate({ 'bottom': '20px' }, 200);
        gnavbar.animate({
          'background-color': 'rgba(255, 0, 0, 0.7)'
        }, 400);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({ 'bottom': '-100px' }, 550);
        gnavbar.animate({
          'background-color': 'rgba(255, 0, 0, 0.0)'
        }, 400);
      }
    }
  });

  // 途中のところで更新をしても表示
  $(window).on("load", function () {
    if ($(this).scrollTop() > 300) {
      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({ 'bottom': '20px' }, 200);
      }
    }
  });

  // // マウスオーバーでかっこよくしようとしたよ
  // $('.skill-content').hover(function () {
  //   $('.caption', this).animate({
  //     top: "75px"
  //   }, 500);
  // }, function () {
  //   $('.caption', this).animate({
  //     top: "150px"
  //   }, 500);
  // });

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

// 5秒たったら強制的にロードをします
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
    , 5000);
});