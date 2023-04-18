import { move_anime } from "./move_gallery.js";
import { current as c_page_No } from "./move_gallery.js";

const UnderHash = document.querySelectorAll(".UnderHash *");
let prev;
let dur_pick_anime = false;

UnderHash.forEach((rank) => {
    rank.style.margin = `0px ${(300-document.getElementById(rank.id).offsetWidth)/2}px`
    rank.addEventListener("click", function (e) {
        if (!dur_pick_anime && prev != e.target) {
            let clicked_No=e.target.id.charAt(4)
            dur_pick_anime = true;
            setTimeout(function () { dur_pick_anime = false; }, Math.abs(c_page_No-clicked_No)*700);
            move_anime(clicked_No);
            e.target.animate([
                {
                    color: "rgba(255,255,255,0)",
                },
                {
                    color: "white",
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
                    },
                    {
                        color: "rgba(255,255,255,0)",
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
