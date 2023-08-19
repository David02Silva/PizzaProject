let pizzaItem = document.querySelector(".models .pizza-item");
let pizzaArea = document.querySelector(".pizza-area");


pizzaJson.forEach((item, index) =>{
    let pizza = pizzaItem.cloneNode(true);
    pizzaArea.appendChild(pizza)

    pizza.querySelector(".pizza-item--name").innerHTML = item.name
    pizza.querySelector(".pizza-item--img img").src = item.img
    pizza.querySelector(".pizza-item--price").innerHTML= `${item.price}€`
    pizza.querySelector(".pizza-item--desc").innerHTML = item.description
})
