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

const first_X : number[] = [255,5];
const second_X : number[] = [115,5];
const third_X : number[] = [590,5];
const fourth_X : number[] = [1265,5];
const fifth_X : number[] = [1390,5];
const sixth_X : number[] = [1270,5];

const first_Y : number[] = [-18,5];
const second_Y : number[] = [550,5];
const third_Y : number[] = [380,5];
const fourth_Y : number[] = [70,5];
const fifth_Y : number[] = [525,5];
const sixth_Y : number[] = [815,5];

const first_W : number[] = [230,5];
const second_W : number[] = [300,5];
const third_W : number[] = [440,5];
const fourth_W: number[] = [220,5];
const fifth_W : number[] = [280,5];
const sixth_W : number[] = [175,5];

const first_H : number[] = [275,5];
const second_H : number[] = [380,5];
const third_H : number[] = [300,5];
const fourth_H : number[] = [200,5];
const fifth_H : number[] = [350,5];
const sixth_H : number[] = [225,5];


let i :any = 0;

pic1.style.backgroundImage = `url("https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp")`;
pic2.style.backgroundImage = `url("https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg")`;
pic3.style.backgroundImage = `url("https://techcrunch.com/wp-content/uploads/2021/08/pokemon-legends-arceus.jpeg")`;
pic4.style.backgroundImage = `url("https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg")`;
pic5.style.backgroundImage = `url("https://assets.reedpopcdn.com/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg/BROK/thumbnail/1200x1200/quality/100/Pokemon-Scarlet-and-Violet-Header_f1zO36s.jpg")`;
pic6.style.backgroundImage = `url("https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg")`;

pic1.style.width = `${first_W[i]}px`
pic2.style.width = `${second_W[i]}px`
pic3.style.width = `${third_W[i]}px`
pic4.style.width = `${fourth_W[i]}px`
pic5.style.width = `${fifth_W[i]}px`
pic6.style.width = `${sixth_W[i]}px`

pic1.style.height = `${first_H[i]}px`
pic2.style.height = `${second_H[i]}px`
pic3.style.height = `${third_H[i]}px`
pic4.style.height = `${fourth_H[i]}px`
pic5.style.height = `${fifth_H[i]}px`
pic6.style.height = `${sixth_H[i]}px`

pic1.style.left = `${first_X[i]}px`
pic2.style.left = `${second_X[i]}px`
pic3.style.left = `${third_X[i]}px`
pic4.style.left = `${fourth_X[i]}px`
pic5.style.left = `${fifth_X[i]}px`
pic6.style.left = `${sixth_X[i]}px`

pic1.style.top = `${first_Y[i]}px`
pic2.style.top = `${second_Y[i]}px`
pic3.style.top = `${third_Y[i]}px`
pic4.style.top = `${fourth_Y[i]}px`
pic5.style.top = `${fifth_Y[i]}px`
pic6.style.top = `${sixth_Y[i]}px`