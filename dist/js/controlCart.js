function remove(id, event){
    let cart = localStorage.getItem("cart");
    if(cart){
        cart = JSON.parse(cart);
    }
    cart = cart.filter(item => {
        return item.product.id != id;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    totalCost();
    toast(title= 'Xóa thành công!!!', message = 'Xóa khỏi giỏ hàng thành công');
}