//Place for variables:
let qry = (url)=>document.querySelector(url)
let qryAll = (url)=>document.querySelectorAll(url)

let pizQt = 1;
let pizzaKey = 0;
let pizzaSize = 0;
let cart = [];
let pizzaPrice = 0;

//Functions:
//Event for Closing "PizzaWindowArea"
function clsPizArea(){
    qry(".pizzaWindowArea").style.opacity = "0";
    setTimeout(()=>{
        qry(".pizzaWindowArea").style.display = "none"
    }, 500)
}

//Opening the cart with all items that we have
function updateCart(){

    qry(".menu-openner span").innerHTML = cart.length;

    // Quando Voltar objetivo é apresentar devidamente os items no meu Cart
    if(cart.length > 0){
        qry("aside").classList.add("show")

        let checkItem = qryAll(".cart--area .cart--item");
        if(checkItem == undefined){
            return
        }else{
            checkItem.forEach((item)=>{
                qry(".cart--area").removeChild(item)
            })
        }
        
        cart.forEach((pizza)=>{
            let cartItem = qry(".cart--item").cloneNode(true);
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id = pizza.id
            })


            qry(".cart--area").append(cartItem)
            
         
            cartItem.querySelector("img").src = pizza.id.img
            cartItem.querySelector(".cart--item--qt").innerHTML = pizza.qt
            
            let pizzaSiLett = "";

            switch(pizza.size){
                case pizza.id.sizes[0]:
                pizzaSiLett = "P";
                break;

                case pizza.id.sizes[1]:
                    pizzaSiLett = "M";
                    break;
                    
                case pizza.id.sizes[2]:
                pizzaSiLett = "G";
                break;
                
            }
               cartItem.querySelector(".cart--item-nome").innerHTML = `${pizza.name} (${pizzaSiLett})` 



               cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", ()=>{
                    pizza.qt--;
                    updateCart();

                    if(pizza.qt < 1){
                        cart.splice((cart.findIndex((item)=>pizza.check == item.check)), 1)
                        updateCart()
                    }
               })

               cartItem.querySelector(".cart--item-qtmais").addEventListener("click", ()=>{
                    pizza.qt++
                    updateCart();
               })



               let subTotal = 0;
               for(let i in cart){
                subTotal += cart[i].id.price * cart[i].qt;
               }
               subTotal = subTotal.toFixed(2)
            
               let subTotalShow = qryAll(".cart--totalitem span")[1]
               subTotalShow.innerHTML = `${subTotal}€`

               let descount = (subTotal * 0.10).toFixed(2)
               let descountShow = qryAll(".cart--totalitem span")[3]
               descountShow.innerHTML = `${descount}€`

               let total = subTotal - descount;
               let totalShow = qryAll(".cart--totalitem span")[5]
               totalShow.innerHTML = `${total.toFixed(2)}€`

               
        })
    }else{
        qry("aside").classList.remove("show")
        qry("aside").style.left = "100vw"
    }
}



//Show on the screen all pizzas for "pizzaJson":
pizzaJson.forEach((item, index)=>{
    let pizza = qry(".models .pizza-item").cloneNode(true);
    qry(".pizza-area").append(pizza);

    //Fill all the infos for each Pizza:
    //Img:
    pizza.querySelector(".pizza-item--img img").src = item.img
    //Price:
    pizza.querySelector(".pizza-item--price").innerHTML = `${item.price.toFixed(2)} €`
    //Name:
    pizza.querySelector(".pizza-item--name").innerHTML = item.name;
    //Description:
    pizza.querySelector(".pizza-item--desc").innerHTML = item.description;

    //Give Event of Click on the pizzas
    pizza.querySelector("a").addEventListener("click", (e)=>{
        e.preventDefault()

        //Reseting the amount of pizzas on the "pizzaWindowArea"
        pizQt = 1;
        pizzaKey = item;

        //To have the transation working that is on the Css we need to take off the 
        //opacity and then put it a 100%;
        qry(".pizzaWindowArea").style.opacity = "0";
        qry(".pizzaWindowArea").style.display = "flex";

        //Reseting the size of the pizza to Big
        pizzaSize = 2;
        qryAll(".pizzaInfo--size").forEach((size)=>{
            size.classList.remove("selected")
            let dataKey = size.getAttribute("data-key");
            if(dataKey == 2){
                size.classList.add("selected")
            }
        })

        setTimeout(()=>{
            qry(".pizzaWindowArea").style.opacity = "1"
        }, 200)

        //Put all the info of the pizza on the "pizzaWindowArea"
        //Img:
        qry(".pizzaBig img").src = item.img
        //Name:
        qry(".pizzaInfo h1").innerHTML = item.name;
        //Description:
        qry(".pizzaInfo--desc").innerHTML = item.description;
        //Sizes:
        qryAll(".pizzaInfo--size").forEach((size, sizeIndex)=>{
           size.querySelector("span").innerHTML = item.sizes[sizeIndex]

           //Event of click to chose the size of the pizza
           size.addEventListener("click", (e)=>{   
                qryAll(".pizzaInfo--size").forEach((size)=>size.classList.remove("selected"))
                e.target.classList.add("selected")
                pizzaSize = e.target.getAttribute("data-key");
           })
        })
        //Amount of Pizzas:
        qry(".pizzaInfo--qt").innerHTML = pizQt; 

        //Price:
        qry(".pizzaInfo--actualPrice").innerHTML = `${item.price.toFixed(2)} €`;
        pizzaPrice = item.price.toFixed(2);
    })

    //Button Cancel on "pizzaWidowArea"
    qry(".pizzaInfo--cancelButton").addEventListener("click", clsPizArea);
    qry(".pizzaInfo--cancelMobileButton").addEventListener("click", clsPizArea)

})

//Button plus pizzas on "pizzaWindowArea"
qry(".pizzaInfo--qtmais").addEventListener("click", ()=>{
    pizQt++;
    qry(".pizzaInfo--qt").innerHTML = pizQt;
    qry(".pizzaInfo--actualPrice").innerHTML = `${(pizzaPrice * pizQt).toFixed(2)} €`
})

//Button remove pizzas on "pizzaWindowArea"
qry(".pizzaInfo--qtmenos").addEventListener("click", ()=>{
    if(pizQt > 1){
        pizQt--;
        qry(".pizzaInfo--qt").innerHTML = pizQt;
        qry(".pizzaInfo--actualPrice").innerHTML = `${(pizzaPrice * pizQt).toFixed(2)} €`
    }
})

//Button to save the pizza on the Cart
qry(".pizzaInfo--addButton").addEventListener("click", ()=>{
   
    //To check if the name and the size of the pizza are the same to change only the
    //amount
    let check = `${pizzaKey.name}@${pizzaKey.sizes[pizzaSize]}`
    let result = cart.findIndex((item)=>{
        return item.check == check
    })

    if(result == -1){
        cart.push({
            check,
            name: pizzaKey.name,
            qt: pizQt,
            size: pizzaKey.sizes[pizzaSize],
            id: pizzaKey
        })
      
    }else{
        cart[result].qt += pizQt;
    }
    updateCart();
    clsPizArea();
})
qry(".menu-openner").addEventListener("click", ()=>{
    if(cart.length > 0){
        qry("aside").style.left = "0"
    }
})
qry(".menu-closer").addEventListener("click", ()=>{
    qry("aside").style.left = "100vw"
})

