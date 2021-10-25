var listButton = document.querySelector('.itemPerPage-list');
var gridButton = document.querySelector('.itemPerPage-grid');
var buttonPrev = document.querySelector('.page-prev');
var buttonNext = document.querySelector('.page-next');
var pageNumber;
var pageAll;
var totalPage;
var currentPage = 1;

function addActive(){ 
    if(currentPage==1){
        buttonPrev.classList.add("not-active");
        buttonNext.classList.remove("not-active");
    }
    if(currentPage>1){
        buttonPrev.classList.remove("not-active");
        buttonNext.classList.add("not-active");
    }
}

const getPagination = ( postApiGrid ) => {
    fetch(postApiGrid)
        .then(function(response){
            return response.json();
        })
        .then(function(posts){
            viewPagination(posts.data, posts.pagination);
        })
}

// function getPagination(postApiGrid){
//     fetch(postApiGrid)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(posts){
//             viewPagination(posts.data, posts.pagination);
//         })
// }

listButton.onclick = function(){
    buttonPrev.classList.add("not-active");
    buttonNext.classList.remove("not-active");
    currentPage=1;
    getProductList(postApiList);
    getPagination(postApiList);
}

gridButton.onclick = function(){
    buttonPrev.classList.add("not-active");
    buttonNext.classList.remove("not-active");
    currentPage=1;
    getProduct(postApiGrid);
    getPagination(postApiGrid);
}

function viewPagination(posts,pagination){
    totalPage = Math.ceil(pagination._totalRows/pagination._limit);
    let html = '';
    html+= `<li class="page-item"><a class='active' id="1" onclick='reply_click(this.id)'>${1}</a></li>`;
    for(let i=2; i<totalPage+1;i++){
        html+= `<li class="page-item"><a id="${i}" onclick='reply_click(this.id)'>${i}</a></li>`
    }
    document.querySelector('.pagination .list-page-item').innerHTML=html;
    pageAll = document.querySelectorAll('.page-item a');
}

buttonPrev.addEventListener('click', ()=>{
    if(currentPage>1){
        currentPage--;
        buttonNext.classList.remove("not-active");
        $(".page-item a").removeClass();
        pageAll[currentPage-1].classList.add('active');
    }
    if(currentPage===1){
        buttonNext.classList.remove("not-active");
        buttonPrev.classList.add("not-active");
    }

    var paginationGrid = `http://localhost:3000/api/product_list_items?_page=${currentPage}&_limit=${limitGrid}`;
    var paginationList = `http://localhost:3000/api/product_list_items?_page=${currentPage}&_limit=${limitList}`;
    getProduct(paginationGrid)
    getProductList(paginationList);
})

buttonNext.addEventListener('click', ()=>{
    if(currentPage<totalPage){
        currentPage++;
        pageItem = currentPage
        buttonPrev.classList.remove("not-active");
        $(".page-item a").removeClass();
        pageAll[currentPage-1].classList.add('active');
    }
    if(currentPage===totalPage){
        buttonNext.classList.add("not-active");
        buttonPrev.classList.remove("not-active");
    }

    var paginationGrid = `http://localhost:3000/api/product_list_items?_page=${currentPage}&_limit=${limitGrid}`;
    var paginationList = `http://localhost:3000/api/product_list_items?_page=${currentPage}&_limit=${limitList}`;
    getProduct(paginationGrid)
    getProductList(paginationList);
})

function reply_click(clicked_id)
{
    currentPage = clicked_id;
    pageNumber = clicked_id;
    paginationGrid = `http://localhost:3000/api/product_list_items?_page=${pageNumber}&_limit=${limitGrid}`;
    paginationList = `http://localhost:3000/api/product_list_items?_page=${pageNumber}&_limit=${limitList}`;

    $(".page-item a").removeClass();
    if (this.event.target.classList.contains('active')==false) {
        this.event.target.classList.add('active');
    }

    if(currentPage<totalPage){
        buttonNext.classList.remove("not-active");
    }

    if(currentPage==totalPage){
        buttonNext.classList.add("not-active");
    }

    if(currentPage==1){
        buttonPrev.classList.add("not-active");
    }
    
    if(currentPage>1){
        buttonPrev.classList.remove("not-active");
    }

    getProductList(paginationList);
    getProduct(paginationGrid);
}

;(() => {
    addActive();
    getPagination(postApiGrid);
})();