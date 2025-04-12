let loading = true;
let count = 0;
let index = 0;
window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const keyword = decodeURIComponent(params.get('keyword'));
    const searchKeywordElement = document.getElementById(`search_keyword`);
    console.log(keyword);
    searchKeywordElement.innerText = keyword;
    await loadImages(keyword);

})

window.addEventListener('scroll', async () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollTop + windowHeight) / documentHeight * 100;


    if (scrollPercentage > 90 && loading == false) { // 75% 아래로 스크롤하면
        console.log("수행")
        loading = true;
        const params = new URLSearchParams(window.location.search);
        const keyword = decodeURIComponent(params.get('keyword'));
        await loadImages(keyword);
    }
});

async function loadImages(keyword) {
    const ImgBoard = document.getElementById(`img_board`);
    try {
        console.log(keyword + "입력됨")
        const response = await fetch(`http://localhost:3000/getImages/${encodeURIComponent(keyword)}/${count}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const imageJSON = await response.json();

        const images = imageJSON.items
        console.log(images)
        Array.from(images).forEach(async (image) => {
            const img = new Image();
            img.src = image.link;
            img.onload = () => {
                const newImage = document.createElement(`div`);
                newImage.style.backgroundImage = `url('${image.link}')`;
                newImage.style.paddingBottom = `${100 * Number(image.sizeheight) / (Number(image.sizewidth))}%`
                newImage.classList.add('imageContainers');
                ImgBoard.children[index % 4].appendChild(newImage);
                index++;
                
                newImage.addEventListener(`click`,()=>{
                    window.open(image.link)
                })
            }
        })
        count++;
    } catch (e) {

    } finally {
        loading = false;
    }
}