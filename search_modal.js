const search_bar = document.getElementById("search_bar");
const search_input = document.querySelectorAll("#search_bar input")[0];
const search_icon= document.getElementById("glass");
const slogans = document.getElementById("slogans");
const search_list = document.getElementById("search_li");
const search_under_bar = document.getElementById(`under_line`);
const under_select = document.getElementsByClassName("UnderHash")[0];

let seaching = 'donot';
let slognas_timing = 500;

function search_bar_open_anime(move_search_bar_time, size_up_search_bar_time){
    search_bar.animate([
        {
            top: `50%`,
            transform: `translate(-50%, -50%)`
        },
        {
            top: `50%`,
            transform: `translate(-50%,-145px)`,
            opacity: 0.8
        },
        {
           top: `50%`,
           transform: `translate(-50%,-280px)`,
        }
    ], {
        duration: move_search_bar_time,
        fill: "forwards",
        easing: "ease-in-out"
    });
    setTimeout(()=>{
        search_bar.animate([
            {
                top: `50%`,
                height: `560px`
            }
            ], {
                duration: size_up_search_bar_time,
                fill: "forwards",
                easing: "ease-in-out"
            });
    },move_search_bar_time)
}
function slogans_fadeout_anime(slogan_fadeout_timing){
    slogans.animate([
        {
            opacity: 1,
        },
        {
            opacity: 0.6
        },
        {
            opacity: 0,
        }
    ], {
        duration: slogan_fadeout_timing,
        fill: "forwards",
        easing: "ease-out"
    })
}
function search_in_icon_open_anime(move_search_bar_time, size_up_search_bar_time){
    search_input.animate([{
        opacity: 0,
    },],{
        duration: 0,
        fill: "forwards",
        easing: "ease-out"
    })
    search_icon.animate([{
        opacity: 0,
    }],{
        duration: 0,
        fill: "forwards",
        easing: "ease-out"
    })
    setTimeout(() => {
        search_input.animate([{
            opacity: 1,
        },],{
            duration: size_up_search_bar_time,
            fill: "forwards",
            easing: "ease-out"
        })
        search_icon.animate([{
            opacity: 1,
        }],{
            duration: size_up_search_bar_time,
            fill: "forwards",
            easing: "ease-out"
        })
    }, move_search_bar_time);
    setTimeout(() => {
        search_input.focus();
        search_input.placeholder=`검색`
        seaching = 'do';
        search_list.animate([{
            opacity: 1,
        }],{
            duration: size_up_search_bar_time,
            fill: "forwards",
            easing: "ease-out"
        })
        search_under_bar.animate([{
            opacity: 1,
        }],{
            duration: size_up_search_bar_time,
            fill: "forwards",
            easing: "ease-out"
        })
    }, size_up_search_bar_time);
    
}
function under_select_hide(closing_time){
    under_select.animate([{
        opacity : 0
    }],{
        duration:closing_time,
        fill: `forwards`
    })
    setTimeout(()=>{
        under_select.animate([{
            transform : `translate(-50%,105vh)`
        }],{
            duration:0,
            fill: `forwards`
        },closing_time)
    })
}
search_bar.addEventListener("click", (e)=>{
    if(seaching == 'donot' && e.target != search_icon){
    seaching = 'during';
    search_input.placeholder=``
    let move_search_bar_time = 1000
    let size_up_search_bar_time = 1000
    under_select_hide(move_search_bar_time)
    search_bar_open_anime(move_search_bar_time,size_up_search_bar_time)
    slogans_fadeout_anime(slognas_timing)
    search_in_icon_open_anime(move_search_bar_time,size_up_search_bar_time)
    }
})

function search_bar_close_anime(size_down_search_bar_time, move_search_bar_time){
    search_bar.animate([
        {
            height: `60px`,
            top: `50%`,
            transform: `translate(-50%,-280px)`
        }
        ], {
            duration: size_down_search_bar_time,//700
            fill: "forwards",
            easing: "ease-in-out"
    });
    setTimeout(() => {
        search_bar.animate([
            {
                top: `50%`,
                transform: `translate(-50%,-50%)`
            }
            ], {
                duration: move_search_bar_time,//700
                fill: "forwards",
                easing: "ease-in-out"
            })
    },700);
}
function slogan_fadein_anime(slogan_fadein_timing){
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
            duration: slognas_timing-100,
            fill: "forwards",
            easing: "ease-out"
        })
    }, slogan_fadein_timing+100)
}
function search_in_icon_close_anime(size_down_search_bar_time, move_search_bar_time){
    search_input.animate([{
        opacity: 0,
    },],{
        duration: size_down_search_bar_time,
        fill: "forwards",
        easing: "ease-out"
    });
    search_icon.animate([{
        opacity: 0,
    }],{
        duration: size_down_search_bar_time,
        fill: "forwards",
        easing: "ease-out"
    });
    search_list.animate([{
        opacity: 0,
    }],{
        duration: 0,
        fill: "forwards",
        easing: "ease-out"
    });
    search_under_bar.animate([{
        opacity: 0,
    }],{
        duration: 0,
        fill: "forwards",
        easing: "ease-out"
    })
    setTimeout(() => {
        search_input.animate([{
            opacity: 1,
        },],{
            duration: 0,
            fill: "forwards",
            easing: "ease-out"
        })
        search_icon.animate([{
            opacity: 1,
        }],{
            duration: 0,
            fill: "forwards",
            easing: "ease-out"
        })
        if(search_input.value!=``)
            search_input.placeholder= search_input.value;
        else 
            search_input.placeholder=`찾고 있는 고화질 이미지를 검색하세요.`
        search_input.value =``;
        seaching = 'donot';
    }, move_search_bar_time+size_down_search_bar_time);
}
function under_select_appear(appear_time){
    setTimeout(()=>{
        under_select.animate([{
            transform : `translate(-50%,85vh)`
        }],{
            duration:0,
            fill: `forwards`
        },appear_time)
        under_select.animate([{
            opacity : 1
        }],{
            duration:appear_time,
            fill: `forwards`
        })
    }, appear_time)
}
document.addEventListener("click",(e)=>{
    if(seaching == `do`)
        if(e.target != search_input && e.target != search_bar && e.target !=search_icon && e.target.parentNode != search_list && e.target.parentNode.parentNode != search_list && e.target != search_list){
        seaching = `during`;
        let size_down_search_bar_time=700;
        let move_search_bar_time=700;
        under_select_appear(move_search_bar_time)
        search_bar_close_anime(size_down_search_bar_time,move_search_bar_time)
        slogan_fadein_anime(size_down_search_bar_time+move_search_bar_time-slognas_timing)
        search_in_icon_close_anime(size_down_search_bar_time, move_search_bar_time)
    }
})