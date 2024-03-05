const search_list = document.querySelectorAll("#search_li li");
const search_icon= document.getElementById("glass");
const search_input = document.querySelectorAll("#search_bar input")[0];

search_list.forEach((list,i)=>{
        list.addEventListener("click",(e)=>{
            location.href = `/search_keyword/${e.target.textContent}`;
        })
    }
)

search_icon.addEventListener("click",(e)=>{
    location.href = `/search_keyword/${search_input.placeholder}`;
})
