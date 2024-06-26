const body = document.querySelector(`body`)
let pic1 = document.getElementById("pic1");
let pic2 = document.getElementById("pic2");
let pic3 = document.getElementById("pic3");
let pic4 = document.getElementById("pic4");
let pic5 = document.getElementById("pic5");
let pic6 = document.getElementById("pic6");
let pic_Array = [pic1, pic2, pic3, pic4, pic5, pic6];
let dum1 = document.getElementById("dum1");
let dum2 = document.getElementById("dum2");
let dum3 = document.getElementById("dum3");
let dum4 = document.getElementById("dum4");
let dum5 = document.getElementById("dum5");
let dum6 = document.getElementById("dum6");
let dum_Array = [dum1, dum2, dum3, dum4, dum5, dum6];
const SIZEUP = 15;
let mv_pic_X = [[455, 255, 265, 165, 150],
             [1285,115, 890, 495, 510],
             [100,590, 1470, 1390, 1140],
             [730,1265, 205, 785, 400],
             [985,1270, 695, 960, 1050],
             [1635,1390, 1475, 1592, 1480],
];
let mv_pic_Y = [[50, -18, 55, 385, 100],
             [145, 500, 275, 50, 260],
             [385, 300, 55, 120, 40],
             [765, 70, 570, 720, 680],
             [560, 715, 655, 530, 550],
             [760, 485, 590, 700, 435]
];
let mv_pic_W = [[245, 230, 215, 195, 300],
             [425, 300, 350, 395, 400],
             [400, 440, 280, 250, 250],
             [300, 220, 195, 215, 250],
             [400, 175, 230, 400, 500],
             [175, 280, 175, 180, 180],
];
let mv_pic_H = [[245, 275, 290, 250, 350],
             [300, 380, 420, 260, 260],
             [515, 300, 250, 250, 250],
             [275, 200, 250, 230, 230],
             [275, 225, 275, 275, 350],
             [175, 350, 225, 230, 225],
];
const image_array=["url(\"https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp\")",
"url(\"https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg\")",
"url(\"https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg\")",
"url(\"https://a-static.besthdwallpaper.com/pokemon-party-wallpaper-3000x2000-17797_42.jpg\")",
"url(\"https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg\")",
];

let current = 0;

document.addEventListener('scroll',(e)=>{
    console.log(`scroll`)
    
    e.preventDefault();
})

for (let a = 0; a < 6; a++) {
    pic_Array[a].style.width = `${mv_pic_W[a][current]+SIZEUP}px`;
    pic_Array[a].style.height =`${mv_pic_H[a][current]+SIZEUP}px`;
    pic_Array[a].style.left = `${mv_pic_X[a][current]-SIZEUP}px`;
    pic_Array[a].style.top = `${mv_pic_Y[a][current]-SIZEUP}px`;
    pic_Array[a].style.backgroundImage = image_array[current];
}

async function scrolling_down(mv_duration){
    for (let b = 0; b < 6; b++) {
        dum_Array[b].style.width = `${mv_pic_W[b][current+1]+SIZEUP}px`;
        dum_Array[b].style.height = `${mv_pic_H[b][current+1]+SIZEUP}px`;
        dum_Array[b].style.left = `${mv_pic_X[b][current+1]-SIZEUP}px`;
        dum_Array[b].style.top = "-400px";
        dum_Array[b].style.backgroundImage = image_array[current+1]
        {
            dum_Array[b].animate([
                {
                    opacity:1
                }
            ], {
                duration: 0,
                fill: "forwards",
            });
            dum_Array[b].animate([
                {
                    display: `block`,
                    top: `${-mv_pic_H[b][current+1]-50}px`
                },
                {
                    top: `${mv_pic_Y[b][current+1]-SIZEUP}px`
                }
            ], {
                duration: mv_duration,
                fill: "forwards",
                easing: "ease-out"
            });
        }
        pic_Array[b].animate([
            {
                top: `${mv_pic_Y[b][current]-5}px`
            },
            {
                top:`${mv_pic_H[b][current]+1200}px`
            }
        ], {
            duration: mv_duration,
            fill: "forwards",
            easing: "ease-out"
        });
            setTimeout(()=>{
                pic_Array[b].animate([{
                    width:`${mv_pic_W[b][current+1]+SIZEUP}px`,
                    height:`${mv_pic_H[b][current+1]+SIZEUP}px`,
                    left:`${mv_pic_X[b][current+1]-SIZEUP}px`,
                    top:`${mv_pic_Y[b][current+1]-SIZEUP}px`,
                    backgroundImage: image_array[current+1]
    
                }],{
                    duration: 0,
                    fill: "forwards",
                })
                dum_Array[b].animate([
                    {
                        opacity:0
                    }
                ], {
                    duration: 0,
                    fill: "forwards",
                });
            },mv_duration)
    }
    await new Promise((resolve, reject) => setTimeout(()=>{resolve(); current++}, mv_duration));
}


async function scrolling_up(mv_duration){
    for (let b = 0; b < 6; b++) {
        dum_Array[b].style.width = `${mv_pic_W[b][current-1]+SIZEUP}px`;
        dum_Array[b].style.height = `${mv_pic_H[b][current-1]+SIZEUP}px`;
        dum_Array[b].style.left = `${mv_pic_X[b][current-1]-SIZEUP}px`;
        dum_Array[b].style.top = `${mv_pic_H[b][current-1]+1150}px`;
        dum_Array[b].style.backgroundImage = image_array[current-1]
        {
            dum_Array[b].animate([
                {
                    opacity:1
                }
            ], {
                duration: 0,
                fill: "forwards",
            });
            dum_Array[b].animate([
                {
                    top: `${mv_pic_H[b][current-1]+1150}px`
                },
                {
                    top: `${mv_pic_Y[b][current-1]-SIZEUP}px`
                }
            ], {
                duration: mv_duration,
                fill: "forwards",
                easing: "ease-out"
            });
        }
        pic_Array[b].animate([
            {
                top: `${mv_pic_Y[b][current]-SIZEUP}px`
            },
            {
                top:`${-mv_pic_H[b][current]-600}px`
            }
        ], {
            duration: mv_duration,
            fill: "forwards",
            easing: "ease-out"
        });
            setTimeout(()=>{
                pic_Array[b].animate([{
                    width:`${mv_pic_W[b][current-1]+SIZEUP}px`,
                    height:`${mv_pic_H[b][current-1]+SIZEUP}px`,
                    left:`${mv_pic_X[b][current-1]-SIZEUP}px`,
                    top:`${mv_pic_Y[b][current-1]-SIZEUP}px`,
                    backgroundImage: image_array[current-1]
    
                }],{
                    duration: 0,
                    fill: "forwards",
                })
                dum_Array[b].animate([
                    {
                        opacity:0
                    }
                ], {
                    duration: 0,
                    fill: "forwards",
                });
            },mv_duration)
    }
    await new Promise((resolve, reject) => setTimeout(()=>{resolve(); current--}, mv_duration));
}
async function move_anime(mv_for) {
    if(mv_for>current){
        for (current;0 < (mv_for-current);)
           await scrolling_down(700)
    }
    else if(mv_for<current)//scroll up
    {
        for (current;0 < (current-mv_for);)
            await scrolling_up(700)
    }
}
export { move_anime, current , mv_pic_H, mv_pic_X, mv_pic_Y, mv_pic_W, pic_Array,SIZEUP};
