$(function () {
  const duration = 500;

  // ヘッダーメニューのホバーアニメーション
  const $header_link = $(".header_link");

  $header_link
    .on("mouseenter", function () {
      $(this).find("span").stop(true).animate(
        {
          width: "100%",
        },
        duration,
        "easeInOutBack"
      );
    })
    .on("mouseleave", function () {
      $(this).find("span").stop(true).animate(
        {
          width: 0,
        },
        duration,
        "easeInCirc"
      );
    });


  // ハンバーガーメニュー
  const $sidemenu = $('.sidemenu');
  const $humburger_btn = $('.toggle_wrap');
  

  $humburger_btn.on('click', function() {
    $humburger_btn.toggleClass('open');
    
    if($(this).hasClass('open')) {
      $sidemenu.stop(true).animate({
        right: '0'
      }, duration, 'easeInExpo');

    }else {
      $sidemenu.stop(true).animate({
        right: '-100%'
      }, duration, 'easeInExpo');
    }
  })

  $header_link.on('click', function() {
    if($humburger_btn.hasClass('open')) {
      $sidemenu.stop(true).animate({
        right: '-100%'
      }, duration, 'easeInOutBack');
      $humburger_btn.removeClass('open');
    }
  })
  
  

  // スムーススクロール
  const $html_body = $("html,body");

  $header_link.on("click", function () {
    const target = $($(this).attr("href")).offset().top;

    $html_body.animate({ scrollTop: target }, duration, "easeInCirc");

    return false;
  });

  // スティッキーヘッダー

  const $header_clone = $(".header_clone"),
        $fv = $(".fv");

  $('.header').each(function () {

    const $window = $(window), // Window オブジェクト
          $header = $(this);
     // HTML の上辺からFVの底辺までの距離 = ヘッダーのトップ位置 + FVの最下層まで
      threshold = $fv.outerHeight() + $header.innerHeight();


    // スクロール時の処理を 1 秒間あたり 15 までに制限
    $window.on('scroll', $.throttle(1000 / 15, function () {
        if ($window.scrollTop() > threshold) {
            $header_clone.addClass('active');
        } else {
            $header_clone.removeClass('active');
        }
    }));
    // スクロールイベントを発生させ、初期位置を決定
    $window.trigger('scroll');
});

  // fvアニメーション
  const $fv_text = $(".fv_content_text"),
        $fv_title = $(".fv_content_title"),
        $fv_welcome = $('.fv_content_welcome')

  $fv.on("inview", function (event, isInView) {
    if (isInView) {
      $fv_title.addClass("animate__bounceIn");
      $fv_welcome.addClass("animate__flipInX");

      $fv_text.addClass("animate__zoomIn");
      $fv_text.addClass("active");
    } else {
      $fv_title.removeClass("animate__bounceIn");
    }
  });

  // メインアニメーション

  // Aboutアニメーション
  const $about = $(".about_flex");

  $about.on("inview", function () {
    $(this).addClass("animate__fadeIn");
    $(".about h1").addClass("animate__backInUp");
  });

  // Skillアニメーション
  const $skill = $(".skill_caption2");
  $skill.on("inview", function () {
    $(".skill_caption1").addClass("animate__fadeInTopLeft");

    $(".skill_caption2").addClass("animate__fadeInBottomRight");
  });

  // Worksアニメーション
  const $works = $(".works_item");
  $works.on("inview", function () {
    $(this).addClass("animate__fadeIn");
  });
});
