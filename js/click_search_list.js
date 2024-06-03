const search_list = document.querySelectorAll("#search_li li");
const search_icon = document.getElementById("search_icon");
const search_input = document.querySelectorAll("#search_bar input")[0];

search_list.forEach((list, i) => {
    list.addEventListener("click", (e) => {

        if (e.target.textContent != null || e.target.textContent != '')
            location.href = `/search_keyword?keyword=${encodeURIComponent(e.target.textContent)}`;
    })
}
)

search_icon.addEventListener("click", (e) => {
    const search_value = search_icon.parentElement.children[0].value;
    console.log(search_value)
    if (search_value != '')
        location.href = `/search_keyword?keyword=${encodeURIComponent(search_value)}`;
})
