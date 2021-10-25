function displayCheckOut(){
    let cartItem = JSON.parse(localStorage.getItem("cart"))||[];
    let billContent = document.querySelector(".cart-list-item");
    var renderItem = "";

    if(cartItem&&billContent){
        cartItem.map(item => {
            return (renderItem += `
            <li class="cart-item">
            <img class="cart-item-img" src="./assets/img/${item.product.img}" alt="" />
<div class="bill-cart-info cart-info">
    <div class="cart-info-text">
        <h5 class="cart-info-name">${item.product.name}</h5><span class="cart-info-quantily">${item.quantity}</span><span class="cart-info-x">x</span><span class="cart-info-price">${item.product.price}</span>
    </div><span class="cart-info-price">${item.product.price*item.quantity}</span>
</div>
</li>
            `);
        });
    }

    billContent.innerHTML = renderItem;
}

function displayBill(){
    let total = JSON.parse(localStorage.getItem("totalCost"));
    let billSumary = document.querySelector(".bill__sumary");
    var renderSumary = "";

    if(total>0 && billSumary){
        renderSumary += `
        <div class="row mg-bottom justify-content-end flex-nowrap">
            <div class="col-lg-7 bill-text">Order total:</div>
            <div class="col-lg-5"><span class="bill__sumary-product">${total}000</span></div>
        </div>
        <div class="row justify-content-end flex-nowrap">
            <div class="col-lg-7 bill-text">Devliery:</div>
            <div class="col-lg-5"><span class="bill__sumary-product">30000</span></div>
        </div>
        <hr />
        <div class="row justify-content-end flex-nowrap">
            <div class="col-lg-7 bill-text">Total:</div>
            <div class="col-lg-5"><span class="bill__sumary-product">${total+30}.000</span></div>
        </div>
        `;
    }
    billSumary.innerHTML = renderSumary;
}


function saveBill(data){
    let storageBill = JSON.parse(sessionStorage.getItem('Bill'))||[];
    let storage = localStorage.getItem('cart');
    let total = localStorage.getItem('totalCost');
    if(storage){
        cart = JSON.parse(storage);
    }
    if(total){
        totalCost = JSON.parse(total);
    }
    totalCost = totalCost + 30;
    storageBill.push({data, cart, totalCost});
    sessionStorage.setItem("Bill", JSON.stringify(storageBill));
    localStorage.clear("cart");
    localStorage.clear("totalCost");
}

function successPurchare(){
    document.getElementById("checkout").style.display = 'none';
    let successPurchare = document.getElementById("successPurchare");
    successPurchare.innerHTML = `<div class="container">
    <div class="row">
      <div class="col-12"><div class="d-flex flex-column align-items-center justify-content-center">
  <img src="../assets/img/successCart.png"/>
  <a class="btn-main text-center" href="/product.html">Tiếp tục mua sắm</a>
  </div>
      </div>
    </div>
  </div>`;

}

displayCheckOut();
displayBill();