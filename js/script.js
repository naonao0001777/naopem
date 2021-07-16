// PhotoSwipe
// initPhotoSwipeFromDOM(".js-my-gallery");

$(function () {
  // 画面を読み込む際はローディングを出す
  $(".loader-wrap").css("display", "block");
  $(".loader").css("display", "block");
  $(".wrapper").css("display", "none");

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
  topBtn.css('bottom', '-100px');
  var showFlag = false;
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({ 'bottom': '20px' }, 200);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({ 'bottom': '-100px' }, 550);
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

  // // スクロール途中から表示したいメニューバーを指定
  // var aboutimagelayout = $(".about-image-layout");
  // var aboutname = $(".about-name");
  // var aboutprofilewrapper = $(".about-profile-wrapper");
  // // メニューバーは初期状態では消しておく
  // aboutimagelayout.hide();
  // aboutname.hide();
  // aboutprofilewrapper.hide();
  // // worksSection.hide();
  // // contactSection.hide();
  // // 表示を開始するスクロール量を設定(px)
  // var TargetPos = 400;
  // // スクロールされた際に実行
  // $(window).scroll(function () {z
  //   // 現在のスクロール位置を取得
  //   var ScrollPos = $(window).scrollTop();
  //   // 現在のスクロール位置と、目的のスクロール位置を比較
  //   if (ScrollPos > TargetPos) {
  //     // 表示(フェイドイン)
  //     aboutimagelayout.fadeIn(1000);
  //     aboutname.fadeIn(1000);
  //     aboutprofilewrapper.fadeIn(1000);
  //   }
  // });

  // 画面ロード時フェードインする
  $(window).on("load", function () {
    // ローディングをフェードアウト
    $(".loader-wrap").fadeOut(600);
    $(".loader").fadeOut(600);

    // wrapper
    $(".wrapper").fadeIn(600);

    // ナビゲーションバー
    setTimeout(function () {
      $('.gnav').fadeIn(400);
    }, 600);

    // タイトルロゴ
    setTimeout(function () {
      $(".logo").fadeIn(1600);
    }, 1000);
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
});

// 10秒たったら強制的にロードをします
$(function () {
  setTimeout("stopload()", 10000);
});

function stopload() {
  // wrapperを表示
  $(".wrapper").css("display", "block");
  // ローディングをフェードアウト
  $(".loader-wrap").fadeOut(600);
  $(".loader").fadeOut(600);
};
