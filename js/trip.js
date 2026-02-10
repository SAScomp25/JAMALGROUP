document
  .querySelector(".cards-container")
  .addEventListener("click", function (e) {
    const button = e.target.closest(".btn");
    if (!button) return;

    const text = button.dataset.text;

    const msg = `مرحبا\nبدي استفسر عن ${text}`.trim();

    sentowhatsaap(msg);
  });

function sentowhatsaap(m) {
  const whatsappNumber = "905300727398"; // <-- غيّر هذا إلى رقمك

  if (!whatsappNumber || whatsappNumber === "00905300727398") {
    alert(
      "قم بتعديل ملف script.js وضع رقم الواتساب المستلم في المتغير whatsappNumber بصيغة دولية بدون +",
    );
    return;
  }

  const encoded = encodeURIComponent(m);

  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
}

/************************************************************************************/

//تم استدعاء الكاي
const API_KEY = "2b823e79ff233bfa299dab3d29616e2b";
//تم استدعاء الرابط الي عليه يضاف الريسبونس
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

//عملنا اوبجكت باسماء المدن
const cities = [
  { apiName: "Istanbul", label: "اسطنبول" },
  { apiName: "Bursa", label: "بورصا" },
  { apiName: "Trabzon", label: "طرابزون" },
];

//استدعاء الديف الي بجه يكون فيه الشغل
const container = document.getElementById("weather-container");

//طلي المعلومات من الايبي
async function fetchFromAPI(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

//ضفنا شو البيانات الي بدنا اياها
function buildWeatherURL(city) {
  return `${BASE_URL}?q=${city}&units=metric&lang=ar&appid=${API_KEY}`;
}

function getTodayName() {
  const days = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const todayIndex = new Date().getDay();
  return days[todayIndex];
}

function renderWeather(cityName, data) {
  const today = getTodayName();

  const div = document.createElement("div");
  div.className = "city";

  div.innerHTML = `
    <h3>${cityName}</h3>
    <p>📅 ${today}</p>
    <p>🌡️ ${data.main.temp} °C</p>
    <p>🌥️ ${data.weather[0].description}</p>
  `;

  container.appendChild(div);
}

async function initApp() {
  for (let city of cities) {
    try {
      const url = buildWeatherURL(city.apiName);
      const data = await fetchFromAPI(url);
      renderWeather(city.label, data);
    } catch (error) {
      console.error(error);
    }
  }
}

initApp();
