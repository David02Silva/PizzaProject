let pizzaItem = document.querySelector(".models .pizza-item");
let pizzaArea = document.querySelector(".pizza-area");

var pizzaList = [];
var pizzaWindow = document.querySelector(".pizzaWindowArea")

document.querySelector(".pizzaInfo--cancelButton").addEventListener("click", ()=>{
    pizzaWindow.style.opacity = 1;
    pizzaWindow.style.opacity = 0
    setTimeout(()=>{pizzaWindow.style.display = "none"}, 200)
})

pizzaJson.forEach((item, index) =>{
    let pizza = pizzaItem.cloneNode(true);
    pizzaArea.appendChild(pizza)

    pizza.querySelector(".pizza-item--name").innerHTML = item.name
    pizza.querySelector(".pizza-item--img img").src = item.img
    pizza.querySelector(".pizza-item--price").innerHTML= `${item.price}€`
    pizza.querySelector(".pizza-item--desc").innerHTML = item.description

    pizza.firstElementChild.addEventListener("click", (e)=>{
        e.preventDefault();

        pizzaWindow.style.opacity = 0;
        pizzaWindow.style.display = "flex"
        setTimeout(()=>{pizzaWindow.style.opacity = 1}, 200)

        document.querySelector(".pizzaInfo h1").innerHTML = item.name;
        document.querySelector(".pizzaInfo--desc").innerHTML = item.description
        document.querySelector(".pizzaBig img").src = item.img
        document.querySelector(".pizzaInfo--actualPrice").innerHTML = `${item.price}€`

   

        document.querySelectorAll(".pizzaInfo--sizes div").forEach((div, index) =>{
            if(index == 2){
                document.querySelectorAll(".pizzaInfo--sizes div").forEach((div) =>{
                    div.classList.remove("selected");
                })

                div.classList.add("selected")
            }
            let size = parseInt(div.getAttribute("data-key"));
            div.querySelector("span").innerHTML = item.sizes[size]

            div.addEventListener("click", ()=>{
                document.querySelectorAll(".pizzaInfo--sizes div").forEach((div) =>{
                    div.classList.remove("selected");
                })
                div.classList.add("selected");
            })

        })
    } )

    document.querySelector(".pizzaInfo--addButton").addEventListener("click", ()=>{
        //Qual a pizza?
        console.log(target.item.name)
        //Qual o tamanho?
        //Quantas pizzas?
        
    
    
    })
})



