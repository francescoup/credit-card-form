const crediCardContainer = document.querySelector(".credid-card-container");
const creditCardBack = document.querySelector(".credid-card");
const numbersValue = document.querySelectorAll(".card-numbers span");
const fullName = document.querySelector(".name span");
const fullNameDigit = document.querySelector("#card-name");
const years = document.getElementById("years");
const months = document.getElementById("months");
const expiresDate = document.querySelectorAll(".expires span");
const personalNumbers = document.getElementById("card-number");
const cvvInput = document.querySelector(".card-cvv");
const cvvValue = document.querySelector(".card-cvv input");
const cvvNumber = document.querySelector(".cvv-txt");
const logo = document.querySelectorAll(".brand img");
const cardMask = document.querySelector(".card-mask");

personalNumbers.addEventListener("keyup", (e) => {
  cardMask.classList.remove("active-numbers");

  numbersValue[0].innerHTML = `<span class='numbers-animation'>${e.target.value.slice(
    0,
    4
  )}</span>`;

  numbersValue[1].innerHTML = `<span class='numbers-animation'>${e.target.value
    .slice(4, 8)
    .replace(/[0-9]/g, "*")}</span>`;

  numbersValue[2].innerHTML = `<span class='numbers-animation'>${e.target.value
    .slice(8, 12)
    .replace(/[0-9]/g, "*")}</span>`;

  numbersValue[3].innerHTML = `<span class='numbers-animation'>${e.target.value.slice(
    12,
    16
  )}</span>`;
});

personalNumbers.addEventListener("keyup", (e) => {
  let input = e.target.value;
  if (input.startsWith(5)) {
    logo[0].src = "assets/img/mastercard.png";
    logo[1].src = "assets/img/mastercard.png";
  } else if (input.startsWith(4)) {
    logo[0].src = "assets/img/visa.png";
    logo[1].src = "assets/img/visa.png";
  } else if (input.startsWith(3)) {
    logo[0].src = "assets/img/amex.png";
    logo[1].src = "assets/img/amex.png";
  } else if (input.startsWith(6)) {
    logo[0].src = "assets/img/discover.png";
    logo[1].src = "assets/img/discover.png";
  }
});

fullNameDigit.addEventListener("keyup", (e) => {
  cardMask.classList.remove("active-name");
  if (!e.target.value) {
    fullName.innerHTML = "FULL NAME";
  } else {
    fullName.innerHTML = `<span class='numbers-animation'>${e.target.value.toUpperCase()}</span>`;
  }
});

function addDateExpired() {
  years.addEventListener("change", () => {
    cardMask.classList.remove("active-expires");
    expiresDate[1].innerHTML = `<span class='numbers-animation'>${years.value}</span>`;
  });
  months.addEventListener("change", () => {
    cardMask.classList.remove("active-expires");
    expiresDate[0].innerHTML = `<span class='numbers-animation'>${months.value}</span>`;
  });
}

addDateExpired();

cvvInput.addEventListener("mouseover", () => {
  crediCardContainer.classList.add("active-back");
});

cvvInput.addEventListener("mouseleave", () => {
  crediCardContainer.classList.remove("active-back");
});

cvvValue.addEventListener("focus", () => {
  crediCardContainer.classList.add("active-back");
});

cvvValue.addEventListener("blur", () => {
  crediCardContainer.classList.remove("active-back");
});

cvvValue.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cvvNumber.innerHTML = "***";
  } else {
    cvvNumber.innerHTML = `<span class='numbers-animation'>${e.target.value.replace(
      /[0-9]/g,
      "*"
    )}</span>`;
  }
});

function addMaskActive(active, one, two, classOne, classTwo, classThree) {
  active.addEventListener("focus", () => {
    cardMask.classList.add(classOne);
    cardMask.classList.remove(classTwo);
    cardMask.classList.remove(classThree);
  });
}
addMaskActive(
  personalNumbers,
  fullNameDigit,
  months,
  "active-numbers",
  "active-name",
  "active-expires"
);
addMaskActive(
  months,
  personalNumbers,
  fullNameDigit,
  "active-expires",
  "active-numbers",
  "active-name"
);
addMaskActive(
  fullNameDigit,
  personalNumbers,
  months,
  "active-name",
  "active-numbers",
  "active-expires"
);

// function to check date
let date = new Date();
let dateValue = new Date().toLocaleDateString("en", { year: "2-digit" });
let dataLabel = date.getFullYear();
let dataMonths = date.getMonth();
let getYear = dataLabel - 2000;

let currentYear = dataLabel;
let endYear = dataLabel + 10;

for (let i = currentYear; i <= endYear; i++) {
  option = document.createElement("option");
  option.value = i - 2000;
  option.label = i;
  years.appendChild(option);
}
let optionsYear = years.querySelectorAll("option");
console.log(optionsYear[1]);
let currentMonths = dataMonths < 10 ? `0${dataMonths}` : dataMonths;
function checkDate() {
  months.querySelectorAll("option").forEach((options) => {
    if (
      years.value == getYear &&
      options.getAttribute("value") < currentMonths + 1
    ) {
      options.setAttribute("disabled", "disabled");
    } else {
      options.removeAttribute("disabled");
    }
  });
}
function checkDateYear() {
  if (months.value < currentMonths + 1) {
    optionsYear[1].setAttribute("disabled", "disabled");
  } else {
    optionsYear[1].removeAttribute("disabled");
  }
}
checkDate();
checkDateYear();

years.addEventListener("change", checkDate, true);
months.addEventListener("change", checkDateYear, true);

// end function to check date
