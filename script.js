document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cart = [];

    if (!cartItemsContainer || !cartTotal || !addToCartButtons.length) {
        console.error("Elementos do carrinho não encontrados.");
        return;
    }

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>R$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">❌</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.innerText = `Total: R$${total.toFixed(2)}`;

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productCard = button.parentElement;
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });
});
