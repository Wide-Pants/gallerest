import { move_anime } from "./move_gallery.js";

const UnderHash = document.querySelectorAll(".UnderHash *");
let prev;
let dur_pick_anime = false;

UnderHash.forEach((rank) => {
    rank.style.margin = `0px ${(300-document.getElementById(rank.id).offsetWidth)/2}px`
    rank.addEventListener("click", function (e) {
        if (!dur_pick_anime && prev != e.target) {
            dur_pick_anime = true;
            setTimeout(function () { dur_pick_anime = false; }, 1000);
            move_anime(e.target.id.charAt(4));
            e.target.animate([
                {
                    color: "black",
                    textShadow: "-1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF"
                },
                {
                    color: "white",
                    textShadow: "none"
                }
            ], {
                duration: 1000,
                fill: "forwards",
                easing: "ease-out"
            });
            if (prev) {
                prev.animate([
                    {
                        color: "white",
                        textShadow: "none"
                    },
                    {
                        color: "black",
                        textShadow: "-1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF"
                    }
                ], {
                    duration: 1000,
                    fill: "forwards",
                    easing: "ease-out"
                });
            }
            prev = e.target;
        }
    });
});
