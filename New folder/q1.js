

let cart = [], totalPrice = 0;
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let price = parseFloat(this.dataset.price);
        let name = this.previousElementSibling.previousElementSibling.innerText;
        cart.push({ name, price });
        totalPrice += price;
        document.getElementById('cart-count').innerText = cart.length;
        updateCart();
    });
});
function scrollToBottom() {
window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function updateCart() {
    let cartList = document.getElementById('cart-items');
    cartList.innerHTML = cart.map((item, i) =>
        `<li class="list-group-item">${item.name} - $${item.price} <button class="btn btn-danger btn-sm" onclick="removeItem(${i})">Remove</button></li>`
    ).join('');
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function removeItem(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    document.getElementById('cart-count').innerText = cart.length;
    updateCart();
}

function printBill() {
    let customerName = document.getElementById('customer-name').value.trim();
    let customerAddress = document.getElementById('customer-address').value.trim();
    
    if (!customerName) return alert("Please enter your name before printing the bill.");
    if (!customerAddress) return alert("Please enter your address before printing the bill.");
    
    let billWindow = window.open('', '', 'width=600,height=600');
    billWindow.document.write(`
        <h2>LiquorExpress Bill</h2>
        <h3>Customer: ${customerName}</h3>
        <h3>Address: ${customerAddress}</h3>
        <ul>${cart.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}</ul>
        <h4>Total: $${totalPrice.toFixed(2)}</h4>
    `);
    billWindow.document.close();
    billWindow.print();
}

