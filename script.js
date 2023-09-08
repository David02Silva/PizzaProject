//Place for variables:
let qry = (url)=>document.querySelector(url)
let qryAll = (url)=>document.querySelectorAll(url)

let pizQt = 1;
let pizzaKey = 0;
let pizzaSize = 0;
let cart = [];

//Functions:
//Event for Closing "PizzaWindowArea"
function clsPizArea(){
    qry(".pizzaWindowArea").style.opacity = "0";
    setTimeout(()=>{
        qry(".pizzaWindowArea").style.display = "none"
    }, 500)
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
        //Price:
        qry(".pizzaInfo--actualPrice").innerHTML = `${item.price.toFixed(2)} €`;
        //Amount of Pizzas:
        qry(".pizzaInfo--qt").innerHTML = pizQt; 
    })

    //Button Cancel on "pizzaWidowArea"
    qry(".pizzaInfo--cancelButton").addEventListener("click", clsPizArea);

})

//Button plus pizzas on "pizzaWindowArea"
qry(".pizzaInfo--qtmais").addEventListener("click", ()=>{
    pizQt++;
    qry(".pizzaInfo--qt").innerHTML = pizQt;
})

//Button remove pizzas on "pizzaWindowArea"
qry(".pizzaInfo--qtmenos").addEventListener("click", ()=>{
    if(pizQt > 1){
        pizQt--;
        qry(".pizzaInfo--qt").innerHTML = pizQt;
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
            size: pizzaKey.sizes[pizzaSize]
        })
      
    }else{
        cart[result].qt += pizQt;
    }
    clsPizArea();

})