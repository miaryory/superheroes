"use strict";

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
    clone.querySelector(".age").textContent = hero.age + "yo";
    clone.querySelector(".powers").textContent = hero.powers;

    document.querySelector(".list").appendChild(clone);
}

function post() {
    const data = {
        name: "The Frontender2",
        realname: "Miary",
        powers: "JS",
        age: 40
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
        });
}

document.querySelector("button").addEventListener("click", post);