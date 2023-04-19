let img_board = document.querySelectorAll('.img_lane')
console.log(img_board)

img_board.forEach(lane => {
    for(let i = 0; i<10; i++){
        const rand_0_500 = Math.floor(Math.random() * 201)+300;
        let new_box = document.createElement('div');
        new_box.setAttribute('class','img_box');
        new_box.style.height = `${rand_0_500}px`;
        lane.appendChild(new_box);
    }
});