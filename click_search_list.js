const search_list = document.querySelectorAll("#search_li li");
const search_icon= document.getElementById("glass");
const search_input = document.querySelectorAll("#search_bar input")[0];

search_list.forEach((list,i)=>{
        list.addEventListener("click",(e)=>{
                history.pushState({},`${e.target.textContent}`,`/${e.target.textContent}`)

        })
    }
)

search_icon.addEventListener("click",(e)=>{
    history.pushState({},`${search_input.placeholder}`,`/${search_input.placeholder}`)
})