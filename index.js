import { menuArray } from "./data.js"

const orderSection = document.querySelector("#order")
const orderConfirm = document.getElementById("order-confirmation")

// Modal & Form 
const modal = document.querySelector(".modal")
const paymentForm = document.getElementById("payment-form")
const paymentName = document.getElementById("form-name")
const paymentCreditCard = document.getElementById("card-number")
const paymenCvc = document.getElementById("cvv-number")



let orderArr = []
let totalPrice = 0
let customerName 

paymentForm.addEventListener("submit", confirmOrder)

function confirmOrder(e) {
    e.preventDefault()
    getOrderConfirmation(paymentName.value, paymentCreditCard.value, paymenCvc.value)
    paymentName.value = ""
}

function getOrderConfirmation(name, ccNumber, cvc) {
    if (name) {
        closeModal()
        orderSection.classList.add("hidden")
        orderArr = []
        totalPrice = 0
        customerName = name
        console.log(ccNumber, cvc)
        orderConfirm.innerHTML = orderConfirmHtml()
    }
}

function orderConfirmHtml() {
    orderConfirm.classList.remove("hidden")
    let orderMsgHtml = ""
    orderMsgHtml = `<div class="confirm-message"><p>Thanks, ${customerName}! Your order is on its way</p></div>
    `
    return orderMsgHtml
}


document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddMeal(e.target.dataset.add)
    orderSection.classList.remove("hidden")
    orderConfirm.classList.add("hidden")
  } else if (e.target.dataset.remove) {
    handleRemoveMeal(e.target.dataset.remove)
    if (!orderArr.length) {
        orderSection.classList.add("hidden")
    }
  } else if (e.target.dataset.complete) {
      modal.classList.remove("hidden")
  } else if (!modal.classList.contains("hidden") && !e.target.closest(".modal")) {
      closeModal ()
  }
})


function handleAddMeal(mealId) {
  const targetMealArr = menuArray.filter(function (meal) {
    return meal.id === mealId
  })[0];
  orderArr.push(targetMealArr)
  const mealPrice = targetMealArr.price
  totalPrice += mealPrice
  render()
}

function handleRemoveMeal(mealId) {
  const indexOfId = orderArr.findIndex((object) => {
    return object.id === mealId
  });
  const targetObject = menuArray.filter((object) => {
    return object.id === mealId
  });

  const newOrderArr = orderArr.splice(indexOfId, 1)[0]
  const mealPrice = newOrderArr.price
  if (mealPrice) {
      totalPrice -= mealPrice
      render()
  }
}

function getMenuHtml() {
  let menuHtml = ""
  menuArray.forEach(function (meal) {
    menuHtml += `
    <div class="dish-wrapper">
      <span><i>${meal.emoji}</i></span>
      <div class="dish-container">
        <p class='meal'>${meal.name}</p>
        <p class='ingredients'>${meal.ingredients}</p>
        <p class='price'>$${meal.price}</p>
      </div>
      <button data-add="${meal.id}">+</button>
    </div>
  `;
  });
  return menuHtml
}

function orderList() {
  let orderHtml = ""
  const getOrderlist = getOrderListHtml()
  orderHtml = `
  <div class="order-container">
    <h2 class>Your Order</h2>
    ${getOrderlist}
    <hr />
    <div class="single-order-container">
      <p class="meal">Total price:</p>
      <p class='price'>$${totalPrice}</p>
    </div>
    <button class="order-btn" data-complete="complete-order">Complete Order</button>
  </div>
  `
  return orderHtml
}

function getOrderListHtml() {
  let orderSelectHtml = ""
  orderArr.forEach(function (order) {
    orderSelectHtml += `
    <div class="single-order-container">
      <p class="meal">${order.name}</p>
      <button data-remove="${order.id}">remove</button>
      <p class='price'>$${order.price}</p>
    </div>`
  })
  return orderSelectHtml;
}

function closeModal() {
    modal.classList.add("hidden")
}


function render() {
  document.getElementById("menu").innerHTML = getMenuHtml()
  document.getElementById("order").innerHTML = orderList() 
}

render();

// when order submit -> delete array content
