const scenarios = [
  {
    text: "🌅 清晨，家族旅行的第一天，你被鳥鳴聲喚醒。你會怎麼開始這段旅程？",
    options: [
      { text: "📅 確認行程並整理裝備。", type: "INTJ" },
      { text: "🥐 準備驚喜早餐給家人！", type: "ESFJ" },
      { text: "🎶 放音樂讓早晨充滿活力！", type: "ENFP" },
      { text: "😴 再賴床一下，充飽精神再出門。", type: "ISFJ" }
    ]
  },
  {
    text: "🚗 途中經過風景小路，你會怎麼做？",
    options: [
      { text: "🛣️ 按計劃前行。", type: "ISTJ" },
      { text: "🌿 探索小路找新驚喜。", type: "ENFP" },
      { text: "📷 停下來拍照紀錄美景。", type: "ISFJ" },
      { text: "🗺️ 建議改變路線尋找捷徑。", type: "INTJ" }
    ]
  },
  {
    text: "🍽️ 午餐時間到了，大家餓了。你會怎麼安排？",
    options: [
      { text: "📍 找最近的餐廳，不拖時間。", type: "ISTJ" },
      { text: "🎉 找有趣的在地小吃體驗地方文化。", type: "ENFP" },
      { text: "💖 選擇家人喜歡的餐廳，照顧大家需求。", type: "ESFJ" },
      { text: "📑 看評價與推薦，精挑細選。", type: "INTJ" }
    ]
  },
  {
    text: "🏞️ 下午安排戶外活動，遇到突如其來的雨。你的反應是？",
    options: [
      { text: "🌂 準備雨具繼續行程。", type: "ISFJ" },
      { text: "💡 馬上找室內活動替代方案。", type: "INTJ" },
      { text: "🍿 提議去看電影或逛街。", type: "ENFP" },
      { text: "📝 檢視計劃，確保後續行程不受影響。", type: "ISTJ" }
    ]
  },
  {
    text: "🌙 夜晚結束時，你會怎麼總結這趟旅行？",
    options: [
      { text: "📖 寫下回憶日記，紀錄點滴。", type: "ISFJ" },
      { text: "📷 整理今天的照片與影片。", type: "ESFJ" },
      { text: "🍻 和家人聊聊最有趣的時刻。", type: "ENFP" },
      { text: "🗂️ 檢討行程，思考下次改進空間。", type: "INTJ" }
    ]
  }
];

const characterProfiles = {
  ESFJ: {
    name: "野原廣志 (ESFJ)",
    description: "擁有 ESFJ 的友善個性，是團體中的最佳支持者。",
    image: "images/hiroshi.jpg"
  },
  INTJ: {
    name: "毛利小五郎 (INTJ)",
    description: "展現 INTJ 的冷靜與策略性，縝密思考。",
    image: "images/kogoro.jpg"
  },
  ISTJ: {
    name: "櫻廣志 (ISTJ)",
    description: "秉持踏實與責任感，確保大小事有條不紊。",
    image: "images/sakura.jpg"
  },
  ENFP: {
    name: "漩渦鳴人 (ENFP)",
    description: "充滿熱情，用積極態度影響身邊的人。",
    image: "images/naruto.jpg"
  },
  ISFJ: {
    name: "佛傑·佛傑 (ISFJ)",
    description: "溫柔體貼，充分體現照顧與保護特質。",
    image: "images/loidy.jpg"
  }
};

let currentScenario = 0;
const chosenTypes = [];

function loadScenario(index) {
  const scenario = scenarios[index];
  $("#scenarioText").text(scenario.text);
  const optionsDiv = $("#options").empty();

  scenario.options.forEach((option) => {
    $("<button>")
      .addClass("option")
      .text(option.text)
      .on("click", function () {
        $(".option").removeClass("selected");
        $(this).addClass("selected");
        chosenTypes[index] = option.type;
        $("#nextButton").prop("disabled", index >= scenarios.length - 1);
        $("#finishButton").toggle(index === scenarios.length - 1);
      })
      .appendTo(optionsDiv);
  });

  $("#nextButton")
    .toggle(index < scenarios.length - 1)
    .prop("disabled", true);
  $("#finishButton")
    .toggle(index === scenarios.length - 1)
    .hide();
}

function showResult() {
  const resultType = mostFrequentType(chosenTypes);
  const profile = characterProfiles[resultType];

  $("#quiz").hide();
  $("#resultTitle").text(`你的人格類型是：${profile.name}`);
  $("#characterImage").attr("src", profile.image);
  $("#resultDescription").text(profile.description);
  $("#result").show();
}

function mostFrequentType(types) {
  const frequency = types.reduce(
    (acc, type) => ((acc[type] = (acc[type] || 0) + 1), acc),
    {}
  );
  return Object.keys(frequency).reduce((a, b) =>
    frequency[a] >= frequency[b] ? a : b
  );
}

$("#startButton").on("click", function () {
  $("#intro").hide();
  $("#quiz").show();
  loadScenario(currentScenario);
});

$("#nextButton").on("click", function () {
  if (currentScenario < scenarios.length - 1) {
    currentScenario++;
    loadScenario(currentScenario);
  }
});

$("#finishButton").on("click", function () {
  if (chosenTypes[currentScenario]) {
    showResult();
  }
});

$("#restartButton").on("click", function () {
  currentScenario = 0;
  chosenTypes.length = 0;
  $("#result").hide();
  $("#intro").show();
});
