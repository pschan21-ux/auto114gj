/* =====================================================================
   auto114gj.com 유튜브 클립 모달
   - @auto-114 채널 최신 업로드 재생목록(UUq40pvIKSshCYvXMEmc_utw)을
     페이지 이탈 없이 모달에서 바로 시청
   - iframe은 모달을 열 때만 로드(페이지 속도 영향 없음)
   - 문구는 i18n.js 사전에 등록되어 언어 전환 시 함께 번역됨
   ===================================================================== */
(function () {
  'use strict';
  var CHANNEL_URL = 'https://www.youtube.com/@auto-114';
  var UPLOADS = 'UUq40pvIKSshCYvXMEmc_utw'; // 채널 업로드 재생목록 (UC→UU)
  var EMBED = 'https://www.youtube-nocookie.com/embed/videos?listType=playlist&list=' + UPLOADS + '&rel=0';

  function init() {
    var css = document.createElement('style');
    css.textContent =
      '#yt-fab{position:fixed;bottom:14px;left:14px;z-index:99998;display:flex;align-items:center;gap:8px;background:#ff0000;color:#fff;border:1.5px solid #111417;border-radius:26px;padding:10px 16px;font-size:13.5px;font-weight:800;cursor:pointer;font-family:"Noto Sans KR",sans-serif;box-shadow:3px 3px 0 #111417;transition:.15s;}' +
      '#yt-fab:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 #111417;}' +
      '@media(max-width:680px){#yt-fab{bottom:64px;left:14px;padding:9px 13px;font-size:12.5px;}}' +
      '#yt-modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:100000;align-items:center;justify-content:center;padding:16px;}' +
      '#yt-modal-bg.on{display:flex;}' +
      '#yt-modal{background:#111417;border-radius:12px;width:100%;max-width:860px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.5);}' +
      '#yt-modal .yt-h{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;}' +
      '#yt-modal .yt-h h3{color:#fff;font-size:15px;font-weight:800;margin:0;font-family:"Noto Sans KR",sans-serif;display:flex;align-items:center;gap:8px;}' +
      '#yt-modal .yt-h h3 .dot{width:10px;height:10px;border-radius:50%;background:#ff0000;display:inline-block;}' +
      '#yt-modal .yt-x{width:32px;height:32px;border:none;background:rgba(255,255,255,.12);border-radius:50%;color:#fff;font-size:18px;cursor:pointer;}' +
      '#yt-modal .yt-x:hover{background:#ff0000;}' +
      '#yt-frame-wrap{position:relative;width:100%;aspect-ratio:16/9;background:#000;}' +
      '#yt-frame-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}' +
      '#yt-modal .yt-f{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;gap:10px;flex-wrap:wrap;}' +
      '#yt-modal .yt-f p{color:rgba(255,255,255,.65);font-size:12.5px;margin:0;font-family:"Noto Sans KR",sans-serif;}' +
      '#yt-modal .yt-go{background:#fff;color:#111417;text-decoration:none;font-size:12.5px;font-weight:800;padding:8px 14px;border-radius:6px;font-family:"Noto Sans KR",sans-serif;}' +
      '#yt-modal .yt-go:hover{background:#ff0000;color:#fff;}';
    document.head.appendChild(css);

    var fab = document.createElement('button');
    fab.id = 'yt-fab';
    fab.type = 'button';
    fab.innerHTML = '▶ <span>유튜브 영상</span>';

    var bg = document.createElement('div');
    bg.id = 'yt-modal-bg';
    bg.innerHTML =
      '<div id="yt-modal">' +
      '<div class="yt-h"><h3><span class="dot"></span>오토일일사 유튜브</h3><button class="yt-x" type="button">×</button></div>' +
      '<div id="yt-frame-wrap"></div>' +
      '<div class="yt-f"><p>차량 소개 영상을 바로 확인하세요</p>' +
      '<a class="yt-go" href="' + CHANNEL_URL + '" target="_blank" rel="noopener">채널 바로가기 ↗</a></div>' +
      '</div>';

    document.body.appendChild(fab);
    document.body.appendChild(bg);

    var loaded = false;
    function open() {
      if (!loaded) {
        var f = document.createElement('iframe');
        f.src = EMBED;
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        f.allowFullscreen = true;
        f.title = 'Auto114 YouTube';
        document.getElementById('yt-frame-wrap').appendChild(f);
        loaded = true;
      }
      bg.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      bg.classList.remove('on');
      document.body.style.overflow = '';
      var f = document.querySelector('#yt-frame-wrap iframe');
      if (f) f.src = f.src; // 재생 정지
    }
    fab.addEventListener('click', open);
    bg.querySelector('.yt-x').addEventListener('click', close);
    bg.addEventListener('click', function (e) { if (e.target === bg) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
