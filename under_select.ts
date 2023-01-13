const UnderHash :any  = document.querySelectorAll(`.UnderHash`);

var prev:any;
var dur_pick_anime : boolean = false;


UnderHash.forEach( (rank) => {
                rank.addEventListener(`click`,(e)=>{
                    console.log(dur_pick_anime)
                    if(!dur_pick_anime && prev != e.target){
                        dur_pick_anime = true;
                        setTimeout(()=>{dur_pick_anime = false;},700)
                        e.target.animate([
                            {
                                color: `black`,
                                textShadow: `-1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF`
                            },
                            {
                                color: `white`,
                                textShadow: `none`
                            }
                        ],500);
                        e.target.style.color = `white`;
                        e.target.style.textShadow = `none`;
                
                        if(prev){
                            prev.animate([
                                {
                                    color: `white`,
                                    textShadow: `none`
                                },
                                {
                                    color: `black`,
                                    textShadow: `-1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF`
                                }
                            ],500);
                            prev.style.color = `black`;
                            prev.style.textShadow = `-1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF`;
                        }
                        prev=e.target;
                    }
                });   
})