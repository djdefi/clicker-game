let score = 0;
let clickPower = 1;
let clickMultiplier = 1;
let autoClicker = 0;
let clickRateData = [];
let clickRateTimestamps = [];

const scoreElement = document.getElementById("score");
const clickButton = document.getElementById("click-button");
const upgradeClickPowerButton = document.getElementById("upgrade-click-power");
const clickPowerElement = document.getElementById("click-power");
const upgradeClickMultiplierButton = document.getElementById("upgrade-click-multiplier");
const clickMultiplierElement = document.getElementById("click-multiplier");
const upgradeAutoClickerButton = document.getElementById("upgrade-auto-clicker");
const autoClickerElement = document.getElementById("auto-clicker");
const achievements = [
  { clicks: 100, element: document.getElementById("achievement-100-status") },
  { clicks: 1000, element: document.getElementById("achievement-1000-status") },
  { clicks: 10000, element: document.getElementById("achievement-10000-status") },
  { clicks: 100000, element: document.getElementById("achievement-100000-status") },
  { clicks: 1000000, element: document.getElementById("achievement-1000000-status") },
  { clicks: 10000000, element: document.getElementById("achievement-10000000-status") },
  { clicks: 100000000, element: document.getElementById("achievement-100000000-status") },
  { clicks: 1000000000, element: document.getElementById("achievement-1000000000-status") },
  { clicks: 10000000000, element: document.getElementById("achievement-10000000000-status") },
  { clicks: 100000000000, element: document.getElementById("achievement-100000000000-status") },
  { clicks: 1000000000000, element: document.getElementById("achievement-1000000000000-status") },
];

clickButton.addEventListener("click", () => {
  score += clickPower * clickMultiplier;
  scoreElement.innerText = `Score: ${score}`;
  checkAchievements();
});

function upgrade(costElement, valueElement, upgradeElement, currentValue, costMultiplier) {
  const cost = parseInt(costElement.dataset.cost);
  if (score >= cost) {
    score -= cost;
    currentValue++;
    scoreElement.innerText = `Score: ${score}`;
    valueElement.innerText = currentValue;
    costElement.dataset.cost = Math.floor(cost * costMultiplier);
    costElement.innerText = `Upgrade (Cost: ${costElement.dataset.cost})`;
  }
  return currentValue;
}

upgradeClickPowerButton.addEventListener("click", () => {
  const cost = parseInt(upgradeClickPowerButton.dataset.cost);
  if (score >= cost) {
    score -= cost;
    clickPower++;
    scoreElement.innerText = `Score: ${score}`;
    clickPowerElement.innerText = clickPower;
    upgradeClickPowerButton.dataset.cost = Math.floor(cost * 1.5);
    upgradeClickPowerButton.innerText = `Upgrade (Cost: ${upgradeClickPowerButton.dataset.cost})`;
  }
});

upgradeClickPowerButton.addEventListener("click", () => {
  clickPower = upgrade(upgradeClickPowerButton, clickPowerElement, upgradeClickPowerButton, clickPower, 1.5);
});

upgradeClickMultiplierButton.addEventListener("click", () => {
  clickMultiplier = upgrade(upgradeClickMultiplierButton, clickMultiplierElement, upgradeClickMultiplierButton, clickMultiplier, 1.5);
});

upgradeAutoClickerButton.addEventListener("click", () => {
  autoClicker = upgrade(upgradeAutoClickerButton, autoClickerElement, upgradeAutoClickerButton, autoClicker, 1.5);
});

function checkAchievements() {
  achievements.forEach((achievement) => {
    if (score >= achievement.clicks) {
      achievement.element.innerText = "Complete";
    }
  });
}

function autoClick() {
  score += autoClicker * clickPower * clickMultiplier;
  scoreElement.innerText = `Score: ${score}`;
  checkAchievements();
}

setInterval(autoClick, 1000);

// Add this function to create the chart
function createClickRateChart() {
    const ctx = document.getElementById("click-rate-chart").getContext("2d");
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: clickRateTimestamps,
        datasets: [
          {
            label: "Click Rate",
            data: clickRateData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  // Call createClickRateChart() to initialize the chart
  const clickRateChart = createClickRateChart();
  
  // Add this function to update the click rate data
  function updateClickRateData() {
    const currentTime = new Date().toLocaleTimeString();
    const currentClickRate = clickPower * clickMultiplier + autoClicker * clickMultiplier;
  
    clickRateData.push(currentClickRate);
    clickRateTimestamps.push(currentTime);
  
    if (clickRateData.length > 1000) {
      clickRateData.shift();
      clickRateTimestamps.shift();
    }
  
    clickRateChart.update();
  }
  
  // Call updateClickRateData() every second
  setInterval(updateClickRateData, 1000);
