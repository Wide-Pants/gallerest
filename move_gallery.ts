const pic1 :any = document.getElementById(`pic1`);
const pic2 :any = document.getElementById(`pic2`);
const pic3 :any = document.getElementById(`pic3`);
const pic4 :any = document.getElementById(`pic4`);
const pic5 :any = document.getElementById(`pic5`);
const pic6 :any = document.getElementById(`pic6`);

const pic_Array : any[] = [pic1,pic2,pic3,pic4,pic5,pic6]

const dum1 :any = document.getElementById(`dum1`);
const dum2 :any = document.getElementById(`dum2`);
const dum3 :any = document.getElementById(`dum3`);
const dum4 :any = document.getElementById(`dum4`);
const dum5 :any = document.getElementById(`dum5`);
const dum6 :any = document.getElementById(`dum6`);

const dum_Array : any[] = [dum1,dum2,dum3,dum4,dum5,dum6]

const pic_X : number[][] = [[255,265],
                            [115,890],
                            [590,1470],
                            [1265,205],
                            [1270,695],
                            [1390,1475],
                            ];

const pic_Y : number[][] = [[-18,55],
                            [500,275],
                            [300,55],
                            [70,570],
                            [715,655],
                            [485,590]
                            ]

const pic_W : number[][] = [[230,215],
                            [300,350],
                            [440,280],
                            [220,195],
                            [175,230],
                            [280,175],
                            ]

const pic_H : number[][] = [[275,290],
                            [380,420],
                            [300,250],
                            [200,250],
                            [225,275],
                            [350,225],
                            ]

pic_Array[0].style.backgroundImage = `url("https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp")`;
pic_Array[1].style.backgroundImage = `url("https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg")`;
pic_Array[2].style.backgroundImage = `url("https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg")`;
pic_Array[3].style.backgroundImage = `url("https://techcrunch.com/wp-content/uploads/2021/08/pokemon-legends-arceus.jpeg")`;
pic_Array[4].style.backgroundImage = `url("https://assets.reedpopcdn.com/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg/BROK/thumbnail/1200x1200/quality/100/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg")`;
pic_Array[5].style.backgroundImage = `url("https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg")`;
                            

export let current :any = 0;

for(var a = 0; a<6 ;a++){
    pic_Array[a].style.width = `${pic_W[a][current]}px`
    pic_Array[a].style.height = `${pic_H[a][current]}px`
    pic_Array[a].style.left = `${pic_X[a][current]}px`
    pic_Array[a].style.top = `${pic_Y[a][current]}px`
};


export default function move_to(i : number){
    for(var b = 0; b<6 ;b++){
        dum_Array[b].style.width = `${pic_W[b][i]}px`
        dum_Array[b].style.height = `${pic_H[b][i]}px`
        dum_Array[b].style.left = `${pic_X[b][i]}px`
        dum_Array[b].style.top = `-400px`;
        dum_Array[b].style.backgroundImage = `url("https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp")`;
        {dum_Array[b].animate([
            {
                top: `${-pic_H[b][i]-100}px`
            },
            {
                top: `${pic_Y[b][i]}px`
            }],{
                duration: 700,
                fill: `forwards`,
                easing:`ease-out`
            })}
            pic_Array[b].animate([
            {
                top: `${pic_Y[b][current]}px`
            },
            {
                top: `${pic_H[b][current]+1000}px`
            }],{
                duration: 700,
                fill: `forwards`,
                easing:`ease`
            })
        console.log(`done`+ b );
    }
}