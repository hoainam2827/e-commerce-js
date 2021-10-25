let cart = [];
async function addToCart(id){
    // var productNumber = localStorage.getItem('cartNumber');
    // productNumber = parseInt(productNumber);
    // if(productNumber){
    //     localStorage.setItem('cartNumber', productNumber + 1);
    // }else{
    //     localStorage.setItem('cartNumber', 1);
    // }
    var res = await fetch(`http://localhost:3000/api/product_list_items/${id}`);
    var product = await res.json();
    setItems(product, id);
    totalCost();
    toast(title= 'Thêm thành công!!!', message = 'Thêm vào giỏ hàng thành công');
    // displayCart();
}

function toast(title, msg){
    const main = document.getElementById('toast');
    if(main){
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `<div class="toast__icon"><i class="fas fa-check-circle"></i>
                                <div class="toast__body">
                                    <h3 class="toast__title">${title}</h3>
                                    <p class="toast__msg">${msg}</p>
                                </div>
                            </div>`;
        main.appendChild(toast);
        setTimeout(function(){
            main.removeChild(toast);
        }, 2300);
    }
}

function setItems(product, id){
    let storage = localStorage.getItem('cart');
    if(storage){
        cart = JSON.parse(storage);
    }
    // let item = cart.findIndex((cart)=>cart.product.id == id);
    let item = cart.find((cart)=>cart.product.id == id);
    
    if(item != undefined){
        item.quantity += 1;
    }
    else{
        cart.push({product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function totalCost(){
    let cartCost = localStorage.getItem('totalCost');
    let storage = localStorage.getItem('cart');
    console.log(cartCost);
    
    // solution 2
    if(storage){
        cart = JSON.parse(storage);
    }
    console.log(cart.length);

    if(cartCost != null && cart.length > 0){
        cartCost = parseInt(cartCost);
        cartCost = 0;

        cart.forEach(function(element, index, array){
            console.log(cartCost);
            console.log(element.product.price*element.quantity);
            localStorage.setItem('totalCost', cartCost = cartCost + element.product.price*element.quantity);
            console.log(cartCost);
        });
    }
    else if(cart.length > 0){
        localStorage.setItem('totalCost', cart[0].product.price);
    }else{
        localStorage.setItem('totalCost', 0);
    }
    // solution 2

    // if(cartCost != null){
    //     cartCost = parseInt(cartCost);
    //     let priceItem = parseInt(product.price)
    //     localStorage.setItem('totalCost', cartCost + priceItem);
    // }else{
    //     localStorage.setItem('totalCost', product.price);
    // }
}

function displayCart(){
    let cartItem = JSON.parse(localStorage.getItem("cart"))||[];
    let cartContent = document.querySelector(".cart-content tbody");
    var renderItem = "";
    if(cartItem&&cartContent){
        cartItem.map(item => {
            return (renderItem += `
              <tr>
                <td class="cart-img"><img src="../assets/img/${item.product.img}" alt="cart img"/></td>
                <td class="cart-name">${item.product.name}</td>
                <td class="cart-price">
                  <p class="price">${item.product.price}.000<span>đ</span></p>
                </td>
                <td class="cart-quantity">
                  <input min="1" type="number" onchange="changeNumber(this.value, ${item.product.id})" value="${item.quantity}"/>
                </td>
                <td class="cart-total">
                  <p class="price">${item.quantity * item.product.price}.000<span>đ</span></p>
                </td>
                <td class="cart-cancer" onclick="remove(${item.product.id})" ><i class="far fa-trash-alt"></i></td>
              </tr>
            `);
        });
    }
    if(cartItem.length===0){
        renderItem += cartEmpty();
    }
    cartContent.innerHTML = renderItem;
}

function cartEmpty(){
    document.getElementById("cart").style.display = 'none';
    let cartEmpty = document.getElementById("cartEmpty");
    cartEmpty.innerHTML = `<div class="container">
    <div class="row">
      <div class="col-12"><div class="d-flex flex-column align-items-center justify-content-center">
  <img src="../assets/img/empty-cart.png"/>
  <a class="btn-main text-center" href="/product.html">Tiếp tục mua sắm</a>
  </div>
      </div>
    </div>
  </div>`;

}

function changeNumber(value, id){
    let storage = localStorage.getItem('cart');
    if(storage){
        cart = JSON.parse(storage);
    }
    let item = cart.find((cart)=>cart.product.id == id);
    item.quantity = JSON.parse(value);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    totalCost();
}

// function totalCostItem(product, id){
//     let item = cart.find((cart)=>cart.product.id == id);
//     console.log(parseInt(product.price)*parseInt(item.quantity))
// }
