const pic1 :any = document.getElementById(`pic1`);
const pic2 :any = document.getElementById(`pic2`);
const pic3 :any = document.getElementById(`pic3`);
const pic4 :any = document.getElementById(`pic4`);
const pic5 :any = document.getElementById(`pic5`);
const pic6 :any = document.getElementById(`pic6`);
const dum1 :any = document.getElementById(`dum1`);
const dum2 :any = document.getElementById(`dum2`);
const dum3 :any = document.getElementById(`dum3`);
const dum4 :any = document.getElementById(`dum4`);
const dum5 :any = document.getElementById(`dum5`);
const dum6 :any = document.getElementById(`dum6`);

const pic1_X : number[] = [255,5];
const pic2_X : number[] = [115,5];
const pic3_X : number[] = [590,5];
const pic4_X : number[] = [1265,5];
const pic5_X : number[] = [1390,5];
const pic6_X : number[] = [1270,5];

const pic1_Y : number[] = [-18,5];
const pic2_Y : number[] = [550,5];
const pic3_Y : number[] = [380,5];
const pic4_Y : number[] = [70,5];
const pic5_Y : number[] = [525,5];
const pic6_Y : number[] = [815,5];

const pic1_W : number[] = [230,5];
const pic2_W : number[] = [300,5];
const pic3_W : number[] = [440,5];
const pic4_W : number[] = [220,5];
const pic5_W : number[] = [280,5];
const pic6_W : number[] = [175,5];

const pic1_H : number[] = [275,5]; 
const pic2_H : number[] = [380,5];
const pic3_H : number[] = [300,5];
const pic4_H : number[] = [200,5];
const pic5_H : number[] = [350,5];
const pic6_H : number[] = [225,5];


let i :any = 0;

pic1.style.backgroundImage = `url("https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp")`;
pic2.style.backgroundImage = `url("https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg")`;
pic3.style.backgroundImage = `url("https://techcrunch.com/wp-content/uploads/2021/08/pokemon-legends-arceus.jpeg")`;
pic4.style.backgroundImage = `url("https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg")`;
pic5.style.backgroundImage = `url("https://assets.reedpopcdn.com/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg/BROK/thumbnail/1200x1200/quality/100/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg")`;
pic6.style.backgroundImage = `url("https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg")`;

pic1.style.width = `${pic1_W}px`
pic2.style.width = `${pic2_W}px`
pic3.style.width = `${pic3_W}px`
pic4.style.width = `${pic4_W}px`
pic5.style.width = `${pic5_W}px`
pic6.style.width = `${pic6_W}px`

pic1.style.height = `${pic1_H}px`
pic2.style.height = `${pic2_H}px`
pic3.style.height = `${pic3_H}px`
pic4.style.height = `${pic4_H}px`
pic5.style.height = `${pic5_H}px`
pic6.style.height = `${pic6_H}px`

pic1.style.left = `${pic1_X}px`
pic2.style.left = `${pic2_X}px`
pic3.style.left = `${pic3_X}px`
pic4.style.left = `${pic4_X}px`
pic5.style.left = `${pic5_X}px`
pic6.style.left = `${pic6_X}px`

pic1.style.top = `${pic1_Y}px`
pic2.style.top = `${pic2_Y}px`
pic3.style.top = `${pic3_Y}px`
pic4.style.top = `${pic4_Y}px`
pic5.style.top = `${pic5_Y}px`
pic6.style.top = `${pic6_Y}px`