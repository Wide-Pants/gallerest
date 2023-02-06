let a_gal1 = document.getElementById("a_gal1");
let a_gal2 = document.getElementById("a_gal2");
let a_gal3 = document.getElementById("a_gal3");
let a_gal4 = document.getElementById("a_gal4");
let a_gal5 = document.getElementById("a_gal5");
let a_gal6 = document.getElementById("a_gal6");
let a_gal7 = document.getElementById("a_gal7");
let a_gal8 = document.getElementById("a_gal8");
let gal_Array = [a_gal1 ,a_gal2 ,a_gal3 ,a_gal4 ,a_gal5 ,a_gal6 ,a_gal7 ,a_gal8 ];

let pic_X = [[455, 255, 265, 165, 150],
             [1285,115, 890, 495, 510],
             [100,590, 1470, 1390, 1140],
             [730,1265, 205, 785, 400],
             [985,1270, 695, 960, 1050],
             [1635,1390, 1475, 1592, 1480],
             [985,1270, 695, 960, 1050],
             [1635,1390, 1475, 1592, 1480],
];
let pic_Y = [[50, -18, 55, 385, 100],
             [145, 500, 275, 50, 260],
             [385, 300, 55, 120, 40],
             [765, 70, 570, 720, 680],
             [560, 715, 655, 530, 550],
             [760, 485, 590, 700, 435],
             [985,1270, 695, 960, 1050],
             [1635,1390, 1475, 1592, 1480],
];
let pic_W = [[300, 230, 215, 195, 300],
             [440, 300, 350, 395, 400],
             [635, 440, 280, 250, 250],
             [420, 220, 195, 215, 250],
             [500, 175, 230, 400, 500],
             [385, 280, 175, 180, 180],
             [510,1270, 695, 960, 1050],
             [350,1390, 1475, 1592, 1480],
];
let pic_H = [[270, 275, 290, 250, 350],
             [270, 380, 420, 260, 260],
             [320, 300, 250, 250, 250],
             [550, 200, 250, 230, 230],
             [280, 225, 275, 275, 350],
             [260, 350, 225, 230, 225],
             [320,1270, 695, 960, 1050],
             [540,1390, 1475, 1592, 1480],
];
const image_array=["url(\"https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp\")",
"url(\"https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg\")",
"url(\"https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg\")",
"url(\"https://pbs.twimg.com/media/DqGBrNdUwAAG_Ja.jpg:large\")",
"url(\"https://assets.reedpopcdn.com/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg/BROK/thumbnail/1200x1200/quality/100/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg\")",
"url(\"https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg\")",
"url(\"https://pbs.twimg.com/media/DqGBrNdUwAAG_Ja.jpg:large\")",
"url(\"https://assets.reedpopcdn.com/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg/BROK/thumbnail/1200x1200/quality/100/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg\")",
"url(\"https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg\")",
];
let current = 1;
for (let a = 0; a < 8; a++) {
    gal_Array[a].style.width = `${pic_W[a][current]}px`;
    gal_Array[a].style.height =`${pic_H[a][current]}px`;
    gal_Array[a].style.left = `${pic_X[a][current]}px`;
    gal_Array[a].style.top = `${pic_Y[a][current]}px`;
    gal_Array[a].style.backgroundImage = image_array[a];
}