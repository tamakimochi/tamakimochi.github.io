/* =====================
  DATA
===================== */
var WD = [
  {
    id: 1,
    month: "2025.05",
    title: "〇〇コスメブランド　テレビCMナレーション",
    tag: "CMナレーション",
    img: "./img/tamaki_mochi.png",
    desc: "某大手コスメブランドの15秒・30秒テレビCM向けナレーションを担当。製品の温かみとブランドの上品さを表現するため、柔らかくも信頼感のある声で収録しました。",
    client: "〇〇コスメブランド",
    format: "wav 48kHz/24bit",
    duration: "15秒・30秒 各1本",
    delivery: "3営業日",
  },
  // {
  //   id: 2,
  //   month: "2025.04",
  //   title: "△△出版　絵本「はるのかぜ」朗読",
  //   tag: "絵本の朗読",
  //   img: "./img/tamaki_mochi.png",
  //   desc: "子ども向け絵本の朗読音声を収録。春をテーマにした温かなストーリーに合わせ、優しく穏やかなトーンで物語を読み聞かせました。",
  //   client: "△△出版",
  //   format: "mp3 / wav",
  //   duration: "約12分",
  //   delivery: "5営業日",
  // },
];
var ALL_TAGS = ["すべて"].concat(
  WD.map(function (w) {
    return w.tag;
  }).filter(function (t, i, a) {
    return a.indexOf(t) === i;
  }),
);