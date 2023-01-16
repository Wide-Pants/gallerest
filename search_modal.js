const search_bar = document.getElementById("search_bar");
const search_input = document.querySelectorAll("#search_bar input")[0];
const search_icon= document.getElementById("glass");
const slogans = document.getElementById("slogans");


let seaching = 'donot';

search_bar.addEventListener("click", ()=>{
    if(seaching == 'donot'){
    console.log(`clicked`)
    seaching = 'during';
    search_input.placeholder=``
    search_input.style.opacity=0;
    search_icon.style.opacity=0;
    setTimeout(() => {
        search_bar.animate([
        {
            top: `50%`,
            height: `500px`
        }
        ], {
            duration: 1000,
            fill: "forwards",
            easing: "ease-in-out"
        });
        search_input.animate([{
            opacity: 1,
        },],{
            duration: 1000,
            fill: "forwards",
        })
        search_icon.animate([{
            opacity: 1,
        }],{
            duration: 1000,
            fill: "forwards",
        })
    }, 1000);
    setTimeout(() => {
        search_input.focus();
        search_input.placeholder=`검색`
        seaching = 'do';
    }, 2000);
    search_bar.animate([
        {
            top: `50%`,
            transform: `translate(-50%, 15px)`
        },
        {
            top: `50%`,
            transform: `translate(-50%,-115px)`,
            opacity: 0.8
        },
        {
           top: `50%`,
           transform: `translate(-50%,-235px)`,
        }
    ], {
        duration: 1000,
        fill: "forwards",
        easing: "ease-in-out"
    });
    slogans.animate([
        {
            opacity: 1,
            zIndex: 1
        },
        {
            opacity: 0.6
        },
        {
            opacity: 0,            
            zIndex: 1
        }
    ], {
        duration: 700,
        fill: "forwards",
        easing: "ease-out"
    })
    }
})

document.addEventListener("click",(e)=>{
    if(seaching == `do`)
        if(e.target != search_input && e.target != search_bar && e.target !=search_icon ){
        console.log(`blur!`)
        seaching = `during`;
        search_input.style.display = `none`;
        search_icon.style.display = `none`;
        setTimeout(() => {
            search_bar.animate([
                {
                    top: `50%`,
                    transform: `translate(-50%,15px)`
                }
                ], {
                    duration: 1000,
                    fill: "forwards",
                    easing: "ease-in-out"
                })
                setTimeout(()=>{slogans.animate([
                {
                    opacity: 0
                },
                {
                    opacity: 0.4
                },
                {
                    opacity: 1
                }
                ], {
                    duration: 500,
                    fill: "forwards",
                    easing: "ease-out"
                })},500)
                search_input.placeholder=`검색`
                setTimeout(()=>{
                    search_input.style.display = `inline-block`;
                    search_icon.style.display = `inline-block`;
                    seaching = 'donot';
                },1000)
                }, 700);
        search_bar.animate([
            {
                height: `60px`,
                top: `50%`,
                transform: `translate(-50%,-235px)`
            }
            ], {
                duration: 700,
                fill: "forwards",
                easing: "ease-in-out"
            });
    }
})
/*
let holder=``;
function search(e){
  if(document.getElementById(`holder`).innerHTML!=`검색`)
  searching.value=holder;
  else
  searching.value=``;
  setTimeout(() => {
    searching.focus();
  }, 0.01);
  search_box.style.display=`block`;
}

function focusoff(e){
  let new_holder=`검색`;
  if(document.getElementById(`searching`).value!=``) 
    if(document.getElementById(`searching`).value.length>=14)
    new_holder=document.getElementById(`searching`).value.slice(0,12)+`...`;
    else new_holder=document.getElementById(`searching`).value;
  holder=document.getElementById(`searching`).value;
  document.getElementById(`holder`).innerHTML=new_holder;
  searching.style.display=`none`;
  search_box.style.display=`none`;
  not_searching.style.display=`inline-block`;
}
search_bar.addEventListener(`mousedown`,search);
searching.addEventListener(`blur`,focusoff);*/