import * as anime from "./search_modal.js";
import { mv_pic_H, mv_pic_Y, pic_Array, current } from "./move_gallery.js"

let blur = document.getElementById("blur");
const SIZEUP = 15;

let a_gal1 = document.getElementById("a_gal1");
let a_gal2 = document.getElementById("a_gal2");
let a_gal3 = document.getElementById("a_gal3");
let a_gal4 = document.getElementById("a_gal4");
let a_gal5 = document.getElementById("a_gal5");
let a_gal6 = document.getElementById("a_gal6");
let a_gal7 = document.getElementById("a_gal7");
let a_gal8 = document.getElementById("a_gal8");

let a_btn = document.getElementById("assemble_button");
let a_btn_first = a_btn.children[0];
let a_btn_second = a_btn.children[1];


let gal_Array = [a_gal1, a_gal2, a_gal3, a_gal4, a_gal5, a_gal6, a_gal7, a_gal8];

let a_pic_X = [[-672, 0, 265, 165, 150],
[-812, -780, 890, 495, 510],
[-702, -1200, 1470, 1390, 1140],
[-362, 0, 205, 785, 400],
[68, 1600, 695, 960, 1050],
[68, 1190, 1475, 1592, 1480],
[-57, 1270, 695, 960, 1050],
[463, 0, 1475, 1592, 1480],
];
let a_pic_Y = [[-440, -360, 55, 385, 100],
[-160, 0, 275, 50, 260],
[120, 0, 55, 120, 40],
[-440, -900, 570, 720, 680],
[-440, 0, 695, 960, 1050],
[-150, 0, 655, 530, 550],
[120, 0, 590, 700, 435],
[-150, 1200, 1475, 1592, 1480],
];
let a_pic_W = [300, 440, 635, 420, 500, 385, 510, 350];

let a_pic_H = [270, 270, 320, 550, 280, 260, 320, 540];

const image_array = ["url(\"https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp\")",
    "url(\"https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg\")",
    "url(\"https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg\")",
    "url(\"https://a-static.besthdwallpaper.com/pokemon-party-wallpaper-3000x2000-17797_42.jpg\")",
    "url(\"https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg\")",
];



function spread_scroll_gal(mvdr) {
    for (let b = 0; b < 3; b++) {
        pic_Array[b].animate([
            {
                top: `${-mv_pic_H[b][current] - 600}px`
            }
        ], {
            duration: mvdr,
            fill: "forwards",
            easing: "ease-out"
        });
    }
    for (let b = 3; b < 6; b++) {
        pic_Array[b].animate([
            {
                top: `${mv_pic_H[b][current] + 1200}px`
            }
        ], {
            duration: mvdr,
            fill: "forwards",
            easing: "ease-out"
        });
    }
}

function reasemmble_scroll_gal(mvdr) {
    for (let b = 0; b < 3; b++) {
        pic_Array[b].animate([
            {
                top: `${mv_pic_Y[b][current] - SIZEUP}px`
            }
        ], {
            duration: mvdr,
            fill: "forwards",
            easing: "ease-out"
        });
    }
    for (let b = 3; b < 6; b++) {
        pic_Array[b].animate([
            {
                top: `${mv_pic_Y[b][current] - SIZEUP}px`
            }
        ], {
            duration: mvdr,
            fill: "forwards",
            easing: "ease-out"
        });
    }
}

let state_in = false;

a_btn.addEventListener(`click`, () => {
    if (state_in == false) {
        for (let a = 0; a < 8; a++) {
            gal_Array[a].style.width = `${a_pic_W[a]}px`;
            gal_Array[a].style.height = `${a_pic_H[a]}px`;
            gal_Array[a].style.left = `50%`;
            gal_Array[a].style.top = `50%`;
            gal_Array[a].style.transform = `translate(${a_pic_X[a][0] + a_pic_X[a][1]}px,${a_pic_Y[a][0] + a_pic_Y[a][1]}px)`
            gal_Array[a].style.backgroundImage = image_array[current];
        }
        a_btn_first.animate([{ transform: 'rotate(135deg)' }], { duration: 500, fill: `forwards` })
        a_btn_second.animate([{ transform: 'rotate(45deg)' }], { duration: 500, fill: `forwards` })
        blur.animate([{ opacity: 0 }], { duration: 500, fill: `forwards` })
        anime.slogans_fadeout_anime(600);
        anime.under_select_hide(600);
        anime.search_bar_fadeout(600);
        spread_scroll_gal(1500);
        for (let a = 0; a < 8; a++) {
            gal_Array[a].animate([
                {
                    left: `50%`,
                    top: `50%`,
                    transform: `translate(${a_pic_X[a][0]}px,${a_pic_Y[a][0]}px)`
                }], {
                duration: 1000,
                fill: "forwards",
                easing: "ease-out"
            })
        } state_in = true;
    } else {
        a_btn_first.animate([{ transform: 'rotate(90deg)' }], { duration: 500, fill: `forwards` })
        a_btn_second.animate([{ transform: 'rotate(0deg)' }], { duration: 500, fill: `forwards` })
        blur.animate([{ opacity: 0.3 }], { duration: 1000, fill: `forwards` })
        anime.slogans_fadein_anime(700);
        anime.under_select_appear(700);
        anime.search_bar_fadein(700);
        reasemmble_scroll_gal(1200);
        for (let a = 0; a < 8; a++) {
            gal_Array[a].animate([
                {
                    left: `50%`,
                    top: `50%`,
                    transform: `translate(${a_pic_X[a][0] + a_pic_X[a][1]}px,${a_pic_Y[a][0] + a_pic_Y[a][1]}px)`
                }], {
                duration: 1000,
                fill: "forwards",
                easing: "ease-in"
            })
        } state_in = false;
    }
}
)
