let img_board = document.querySelectorAll('.img_lane')
let top_message = document.getElementById('search_thing')
let loadingbar = document.getElementById(`loading_bar`)

top_message.innerText =`${decodeURIComponent(location.pathname).slice(1)}의 검색 결과입니다`

let now_loading = false

function make_imgBox(){
    now_loading=true;
    img_board.forEach(lane => {
        for(let i = 0; i<10; i++){
            const rand_0_500 = Math.floor(Math.random() * 201)+300;
            let new_box = document.createElement('div');
            new_box.setAttribute('class','img_box');
            new_box.style.height = `${rand_0_500}px`;
            lane.appendChild(new_box);
        }
        now_loading=false
    });   
}
function reload_img(){
    console.log('처리중')
    now_loading=true;
    loadingbar.style.display = 'block';
    setTimeout(()=>{
        make_imgBox();
        loadingbar.style.display = 'none';
        now_loading=false;
        console.log('처리 완료')
    },700)
}

window.addEventListener('scroll',()=>{
    if(window.pageYOffset/(document.body.clientHeight - window.outerHeight)>0.96&&!now_loading)
        reload_img();
})


make_imgBox();