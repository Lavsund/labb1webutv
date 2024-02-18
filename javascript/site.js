const categories = [
  {
    name: "Mat",
    items: [
      { img: "../bilder/bread.png", name: "Bröd", price: 20 },
      { img: "../bilder/hallon.png", name: "Hallon", price: 10 },
      { img: "../bilder/rawmeat.png", name: "Rått kött", price: 70 },
      { img: "../bilder/svamp.png", name: "Svamp", price: 15 },
    ],
  },
  {
    name: "Hälsodrycker",
    items: [
      { img: "../bilder/frostresist.png", name: "Köld mjöd", price: 120 },
      {
        img: "../bilder/minorhealing.png",
        name: "Liten hälso mjöd",
        price: 130,
      },
      {
        img: "../bilder/mediumhealing.png",
        name: "Mellan hälso mjöd",
        price: 140,
      },
      { img: "../bilder/tastymead.png", name: "Goe mjöd", price: 80 },
    ],
  },
  {
    name: "Vapen",
    items: [
      { img: "../bilder/stoneaxe.png", name: "Sten-Yxa", price: 200 },
      { img: "../bilder/bronzesword.png", name: "Brons-Svärd", price: 400 },
      { img: "../bilder/Club.png", name: "Klubba", price: 300 },
      { img: "../bilder/ironhammer.png", name: "Järn-Hammare", price: 700 },
    ],
  },
];

// const prod = [
//   {
//     img: "../bilder/stoneaxe.png",
//     name: "Sten-Yxa",
//     Price: 200,
//     category: "Vapen",
//   },
//   {
//     img: "../bilder/bronzesword.png",
//     name: "Brons-Svärd",
//     Price: 400,
//     category: "Vapen",
//   },
//   { img: "../bilder/Club.png", name: "Klubba", Price: 300, category: "Vapen" },
//   {
//     img: "../bilder/ironhammer.png",
//     name: "Järn-Hammare",
//     Price: 700,
//     category: "Vapen",
//   },
//   {
//     img: "../bilder/frostresist.png",
//     name: "Köld mjöd",
//     price: 120,
//     category: "Hälsodrycker",
//   },
//   {
//     img: "../bilder/minorhealing.png",
//     name: "Liten hälso mjöd",
//     price: 130,
//     category: "Hälsodrycker",
//   },
//   {
//     img: "../bilder/mediumhealing.png",
//     name: "Mellan hälso mjöd",
//     price: 140,
//     category: "Hälsodrycker",
//   },
//   {
//     img: "../bilder/tastymead.png",
//     name: "Goe mjöd",
//     price: 80,
//     category: "Hälsodrycker",
//   },
//   { img: "../bilder/bread.png", name: "Bröd", price: 20, category: "Mat" },
//   { img: "../bilder/hallon.png", name: "Hallon", price: 10, category: "Mat" },
//   {
//     img: "../bilder/rawmeat.png",
//     name: "Rått kött",
//     price: 70,
//     category: "Mat",
//   },
//   { img: "../bilder/svamp.png", name: "Svamp", price: 15, category: "Mat" },
// ];

let cart = [];

const mainContainer = document.getElementById("productList");

const cartList = document.getElementById("cartItems");

function displayItems(categoryIndex) {
  const category = categories[categoryIndex];

  mainContainer.innerHTML = "";
  cartList.innerHTML = "";

  const categoryHeader = document.createElement("h2");
  categoryHeader.textContent = category.name;
  mainContainer.appendChild(categoryHeader);

  category.items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    // const imgCol = document.createElement("div");
    // imgCol.classList.add("col-md-3", "text-center");

    const img = document.createElement("img");
    img.src = item.img;
    img.classList.add("card-img-top", "rounded");
    // imgCol.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // const contentCol = document.createElement("div");
    // contentCol.classList.add("col-md-9");

    const itemName = document.createElement("h5");
    itemName.textContent = item.name;
    itemName.classList.add("card-title");

    const price = document.createElement("p");
    price.textContent = `${item.price}kr`;
    price.classList.add("card-text");

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Lägg till i varukorg";
    addToCartBtn.classList.add("btn", "btn-success");
    addToCartBtn.addEventListener("click", () => {
      addToCart(item);
    });

    cardBody.appendChild(itemName);
    cardBody.appendChild(price);
    cardBody.appendChild(addToCartBtn);

    card.appendChild(img);
    card.appendChild(cardBody);

    mainContainer.appendChild(card);

    // const li = document.createElement("li");

    // li.classList.add("text-success");
    // btn.classList.add("bg-success");

    // btn.innerText = "Lägg till i Varukorg";
    // li.innerText = `${weapon.wep} ${weapon.Price}kr`;

    // if (weapon.img) {
    //   img.src = weapon.img;
    //   img.classList.add("weapon-image");
    //   li.appendChild(img);
    // }
    // ul.append(li);
    // ul.append(btn);

    // btn.addEventListener("click", () => {
    //   // add to chart
    //   console.log("clivk", weapon);
    //   cart.push(weapon);
    // });
  });
  displayCart();
}

function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = sessionStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    displayCart();
    updateTotalOnPage();
  }
}

function addToCart(item) {
  cart.push(item);

  saveCart();
  displayCart();
  updateTotalOnPage();
  console.log("Vara tillagd i varukorgen:", item);
}

function displayCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - ${item.price}kr`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Ta bort";
    removeBtn.classList.add("btn", "btn-danger", "ms-2");
    removeBtn.addEventListener("click", () => {
      removeFromCart(index);
    });
    cartItem.appendChild(removeBtn);
    cartList.appendChild(cartItem);
  });
  updateTotalOnPage();
}

function removeFromCart(index) {
  cart.splice(index, 1);

  saveCart;
  displayCart();
  updateTotalOnPage();
}

function calculateSum() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  return total;
}

function updateTotalOnPage() {
  const totalAmountElement = document.getElementById("totalAmount");
  const totalAmount = calculateSum();
  totalAmountElement.textContent = `Total summa i varukorgen: ${totalAmount} kr`;
}
updateTotalOnPage();
// const totalSum = calculateSum();
// console.log("Total summa i varukorgen:", totalSum);
window.addEventListener("DOMContentLoaded", loadCart);

// for (const Added of cart) {
//   console.log(Added.Price);
// }
