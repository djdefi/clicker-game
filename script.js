let score = 0;
let clickPower = 1;
let clickMultiplier = 1;
let autoClicker = 0;
let clickRateData = [];
let clickRateTimestamps = [];
let prestigeLevel = 0;
let prestigeMultiplier = 1;

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
  { clicks: 10000000000000, element: document.getElementById("achievement-10000000000000-status") },
  { clicks: 100000000000000, element: document.getElementById("achievement-100000000000000-status") },
];

clickButton.addEventListener("click", () => {
  score += clickPower * clickMultiplier * prestigeMultiplier;
  scoreElement.innerText = `Score: ${score}`;
  checkAchievements();
});

document.getElementById("prestige-button").addEventListener("click", prestige);

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
    score += autoClicker * clickPower * clickMultiplier * prestigeMultiplier;
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

  // Add two functions: generateSaveCode and loadFromSaveCode

function generateSaveCode() {
  const gameData = [
    score,
    clickPower,
    clickMultiplier,
    autoClicker,
    parseInt(upgradeClickPowerButton.dataset.cost),
    parseInt(upgradeClickMultiplierButton.dataset.cost),
    parseInt(upgradeAutoClickerButton.dataset.cost),
    prestigeLevel,
    prestigeMultiplier,
  ];

  const saveCode = btoa(gameData.join("|"));
  const saveCodeDisplay = document.getElementById("saveCodeDisplay");
  saveCodeDisplay.value = saveCode;
}
  
function loadFromSaveCode() {
    const saveCodeDisplay = document.getElementById("saveCodeDisplay");
    const saveCode = saveCodeDisplay.value.trim();
  
    if (!saveCode) {
      alert("Please enter a save code.");
      return;
    }
  
    try {
      const gameData = atob(saveCode).split("|").map(Number);
  
      score = gameData[0];
      clickPower = gameData[1];
      clickMultiplier = gameData[2];
      autoClicker = gameData[3];
      upgradeClickPowerButton.dataset.cost = gameData[4];
      upgradeClickMultiplierButton.dataset.cost = gameData[5];
      upgradeAutoClickerButton.dataset.cost = gameData[6];
      prestigeLevel = gameData[7];
      prestigeMultiplier = gameData[8];
  
      updateGameUI();
    } catch (error) {
      alert("Invalid save code.");
    }
  }
  
  function copySaveCodeToClipboard() {
    const saveCodeDisplay = document.getElementById("saveCodeDisplay");
    saveCodeDisplay.select();
    saveCodeDisplay.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
  
    alert("Save code copied to clipboard.");
  }

  function updateGameUI() {
    scoreElement.innerText = `Score: ${score}`;
    clickPowerElement.innerText = clickPower;
    clickMultiplierElement.innerText = clickMultiplier;
    autoClickerElement.innerText = autoClicker;
    upgradeClickPowerButton.innerText = `Upgrade (Cost: ${upgradeClickPowerButton.dataset.cost})`;
    upgradeClickMultiplierButton.innerText = `Upgrade (Cost: ${upgradeClickMultiplierButton.dataset.cost})`;
    upgradeAutoClickerButton.innerText = `Upgrade (Cost: ${upgradeAutoClickerButton.dataset.cost})`;
    document.getElementById("prestige-level").innerText = `Prestige Level: ${prestigeLevel}`; // Add this line to update the prestige level
    checkAchievements();
  }

  function prestige() {
    const requiredScore = 1000 * Math.pow(2, prestigeLevel); // Adjust the required score as needed
  
    if (score < requiredScore) {
      alert(`You need at least ${requiredScore} points to prestige.`);
      return;
    }
  
    // Calculate the prestige reward (e.g., a 10% bonus per prestige level)
    prestigeLevel++;
    prestigeMultiplier = 1 + prestigeLevel * 1;
  
    // Reset the game state
    score = 0;
    clickPower = 1;
    clickMultiplier = 1;
    autoClicker = 0;
    upgradeClickPowerButton.dataset.cost = 10;
    upgradeClickMultiplierButton.dataset.cost = 20;
    upgradeAutoClickerButton.dataset.cost = 50;
  
    // Update the UI
    updateGameUI();
    document.getElementById("prestige-level").innerText = `Prestige Level: ${prestigeLevel}`;
  }