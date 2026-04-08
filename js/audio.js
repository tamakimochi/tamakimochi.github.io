/* =====================
  AUDIO PLAYBACK
  全ボイスMP3ファイル再生
===================== */
// MP3ファイルのパス定義
var MP3_FILES = {
  cm: "./audio/CMナレーション.mp3",
  doc: "./audio/ドキュメンタリーナレーション.mp3",
  ehon: "./audio/キャラナレーション.mp3",
  boy: "./audio/sample1.mp3",
  girl: "./audio/sample2.mp3",
  woman: "./audio/sample3.mp3",
};

// 現在再生中のAudio要素
var curAudio = null;
var curId = null;
function stopCurrent() {
  // MP3停止
  if (curAudio) {
    curAudio.pause();
    curAudio.currentTime = 0;
    curAudio = null;
  }
}

/* =====================
  PLAY BUTTONS
===================== */
document.querySelectorAll(".pb").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var id = this.dataset.id;
    var self = this;

    // 同じボタンを押したら停止
    if (curId === id) {
      stopCurrent();
      curId = null;
      self.classList.remove("playing");
      self.innerHTML = "<span>▶</span> 再生する";
      showT("再生を停止しました");
      return;
    }

    // 他のボタンを止める
    stopCurrent();
    curId = null;
    document.querySelectorAll(".pb.playing").forEach(function (b) {
      b.classList.remove("playing");
      b.innerHTML = "<span>▶</span> 再生する";
    });
    if (!MP3_FILES[id]) return;
    curId = id;
    self.classList.add("playing");
    self.innerHTML = "<span>⏹</span> 停止する";
    var lbl = {
      cm: "CMナレーション",
      doc: "ドキュメンタリーナレーション",
      ehon: "キャラクターナレーション",
      boy: "少年",
      girl: "少女",
      woman: "成人女性",
    };
    showT("🎙 " + lbl[id] + " を再生中");
    
    // MP3再生
    var audio = new Audio(MP3_FILES[id]);
    curAudio = audio;
    audio.play().catch(function () {
      showT("⚠ 音声ファイルを読み込めませんでした");
      stopCurrent();
      curId = null;
      self.classList.remove("playing");
      self.innerHTML = "<span>▶</span> 再生する";
    });
    audio.addEventListener("ended", function () {
      if (curId === id) {
        curAudio = null;
        curId = null;
        self.classList.remove("playing");
        self.innerHTML = "<span>▶</span> 再生する";
        showT("再生が終了しました");
      }
    });
  });
});