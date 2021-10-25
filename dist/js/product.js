var limitGrid = 9;
var limitList = 4;
var postApiGrid = `http://localhost:3000/api/product_list_items?_page=1&_limit=${limitGrid}`;
var postApiList = `http://localhost:3000/api/product_list_items?_page=1&_limit=${limitList}`;

;(() => {
    getProduct(postApiGrid);
    getProductList(postApiList);
})();

function getProduct(postApiGrid){
    //fetch: goị api lấy dl 
    fetch(postApiGrid)
        .then(function(response){
            return response.json();
        })
        .then(function(posts){
            viewProducts(posts.data);
        })
}

function getProductList(postApiList){
    fetch(postApiList)
        .then(function(response){
            return response.json();
        })
        .then(function(posts){
            viewProductsList(posts.data);
        })
}

function viewProducts(posts){
    var htmls = posts.map(productRenderGrid);
    var html = htmls.join('');
    var product_grid = document.querySelector('.product-grid .row');
    product_grid.innerHTML = html;
}

function viewProductsList(posts){
    var product_list = document.querySelector('.product-list');
    product_list.innerHTML = posts.map(productRenderList).join('');
}

function productRenderList(post){
    return `<div class="list-item">
                <div class="col-md-4"><img src="../assets/img/${post.img}" alt="image item" /></div>
                <div class="col-md-8 list-item-content">
                    <h3 class="name">${post.name}</h3>
                    <p class="price"> ${post.price}.000<span>đ</span></p>
                    <p class="desc">${post.desc}</p>
                    <div class="reaction d-flex">
                        <div class="action"><button class="btn-main add-carts" data-id="${post.id}" onclick="addToCart(${post.id})">ADD TO CART</button></div>
                        <div class="action"><a href="#"> <i class="fas fa-heart"> </i><span>Yêu Thích</span></a></div>
                        <div class="action"><a href="#"> <i class="fas fa-signal"></i><span>So Sánh</span></a></div>
                    </div>
                </div>
            </div>`;
}

function productRenderGrid(post){
    return `
            <div class="col-md-4 col-sm-6 text-center">
                <div class="product_grid-img">
                    <img src="../assets/img/${post.img}" alt="image item" />
                    <div class="product-action">
                        <div class="product-action-item"><span class="fas fa-heart"></span>Yêu thích</div>
                        <div class="product-action-item"><span class="fas fa-signal"></span>So sánh</div>
                        <div class="product-action-item"><span class="fas fa-compress-alt"></span></div>
                    </div>
                </div>
                <a href="/product-detail.html">
                    <h3 class="name">${post.name}</h3>
                </a>
                <p class="price">
                    ${post.price}.000
                    <span>đ</span>
                </p>
                <button class="btn-main add-carts" data-id="${post.id}" onclick="addToCart(${post.id})">Add to cart </button>
            </div>
        `;
}