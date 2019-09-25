"use strict";

window.addEventListener("load", get);

function get() {
  fetch("https://kea3rdsemester-91fd.restdb.io/rest/superheroes", {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887df9fd86cb75861e2626",
        "cache-control": "no-cache"
      }
    })
    .then(e => e.json())
    .then(superheroes => {
      superheroes.forEach(hero => {
        displayHero(hero);
      });
    });
}

get();

function displayHero(hero) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector("h1").textContent = hero.name;
  clone.querySelector("h2").textContent = hero.realname;
  clone.querySelector(".age").textContent = hero.age;
  clone.querySelector(".powers").textContent = hero.powers;
  clone.querySelector(".sex").textContent = hero.sex;
  clone.querySelector("article.hero").dataset.heroId = hero._id;
  clone.querySelector("button").addEventListener("click", () => {
    deleteIt(hero._id);
  });

  document.querySelector(".list").appendChild(clone);
}

function post() {
  const data = {
    name: document.querySelector("form #name").value,
    realname: document.querySelector("form #realname").value,
    powers: powers(),
    age: document.querySelector("form #age").value,
    sex: defineSex(),
  };

  const postData = JSON.stringify(data);
  fetch("https://kea3rdsemester-91fd.restdb.io/rest/superheroes", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887df9fd86cb75861e2626",
        "cache-control": "no-cache"
      },
      body: postData
    })
    .then(res => res.json())
    .then(data => {
      displayHero(data);
      document.querySelector("input.submit").value = "Added";
      document.querySelector("input.submit").style.backgroundColor = "green";
      document.querySelector("input.submit").style.color = "white";
      setTimeout(back, 2500);
    });

  document.querySelector("form").reset();
}

function back() {
  document.querySelector("input.submit").value = "Add hero";
  document.querySelector("input.submit").style.backgroundColor = "rgba(201, 191, 191, 0.199)";
  document.querySelector("input.submit").style.color = "black";
}

function powers() {
  const allCheckbox = Array.from(document.querySelectorAll(".powers input"));
  let powers = [];

  allCheckbox.forEach(checkIt);

  function checkIt(checkbox) {
    if (checkbox.checked) {
      powers.push(checkbox.value);
    }
  }
  return powers.join(" ");
}

function defineSex() {
  if (document.querySelector("form #female").checked) {
    return "Female";
  } else if (document.querySelector("form #male").checked) {
    return "Male";
  }
}

function capitalization(name) {
  const newNameFormat = [];

  const nameParts = name.trim().split(" ");

  nameParts.forEach(capitalize);

  function capitalize(onePart) {
    onePart = onePart.charAt(0).toUpperCase() + onePart.slice(1).toLowerCase();
    newNameFormat.push(onePart);
  }

  return newNameFormat.join(" ");
}

document.querySelector("input.submit").addEventListener("click", post);

function deleteIt(id) {
  fetch("https://kea3rdsemester-91fd.restdb.io/rest/superheroes/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887df9fd86cb75861e2626",
        "cache-control": "no-cache"
      }
    })
    .then(res => res.json())
    .then(data => {
      document.querySelector(`.hero[data-hero-id="${id}"]`).remove();
    });
}