const productsCart = document.getElementById("cart");
const productsCartStorage = document.querySelector(".cart__main");
const btnOpenCart = document.getElementById("open");
const btnCloseCart = document.getElementById("close");
const productsCont = document.querySelector(".pizzas-cards");
const recommendsCont = document.querySelector(".recomendadas-cards");
const categories = document.querySelector(".comidas-cards");
const categoriesList = document.querySelectorAll(".card--category");
const overlay = document.querySelector(".overlay");
const btnBuy = document.querySelector(".btn-buy");
const btnDelete = document.querySelector(".btn-delete");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

console.log(cart);

const renderProduct = (product) => {
  const { img, name, desc, price, id } = product;

  return `
    <div class="card card--pizza">
      <img class="card__img" src="${img}" alt="producto popular">
      <div class="card__container-info">
        <div class="card__info">
          <p class="card-name">${name}</p>
          <p class="card__description">${desc}</p>
          <p class="card__price gradient-text">$ ${price}</p>
        </div>
        <button class="btn btn-add" data-id='${id}' data-name='${name}' data-price='${price}' data-img='${img}' data-desc='${desc}'>Agregar</button>
      </div>
    </div>
  `;
};

const renderRecommendedProduct = (product) => {
  const { img, name, desc, price, id } = product;

  return `
    <div class="card-recommended box-shadow">
      <img class="card__img--recommended" src="${img}" alt="producto popular">
      <div class="card__info">
          <p class="card-name">${name}</p>
          <p class="card__description">${desc}</p>
          <p class="card__price gradient-text">$ ${price}</p>
      </div>
        <button class="btn btn-add" data-id='${id}' data-name='${name}' data-price='${price}' data-img='${img}' data-desc='${desc}'>Agregar</button>
      </div>
    </div>
  `;
};

const renderPopularProducts = () => {
  productsCont.innerHTML += mostPopularProducts()
    .map(renderProduct) // .map((e) => renderProduct(e))
    .join("");
};

const renderFilteredProducts = (category) => {
  const productsList = products.filter(
    (product) => product.category === category
  );
  productsCont.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (category = undefined) => {
  if (!category) {
    renderPopularProducts();
    return;
  }
  renderFilteredProducts(category);
};

const renderRecommendedProducts = () => {
  const recommendedProducts = products.filter(
    (product) => product.recommended === true
  );
  recommendsCont.innerHTML = recommendedProducts.map(renderRecommendedProduct).join("");
};

const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeBtnActiveState(selectedCategory);
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const applyFilter = (e) => {
  console.log(e.target.dataset);
  if (!e.target.matches(".card--category, .card__icon, .card__name")) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    productsCont.innerHTML = "";
    renderProducts();
  } else {
    renderProducts(e.target.dataset.category);
  }
  if (productsCont.innerHTML == "") {
    productsCont.innerHTML = "<p class='out-stock'>Sin Stock</p>";
  }
};

const toggleCart = () => {
  productsCart.classList.toggle("is-active");
  overlay.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
  if (!productsCart.classList.contains("is-active")) return;
  productsCart.classList.remove("is-active");
  overlay.classList.remove("show-overlay");
};
const closeOnOverlayClick = () => {
  productsCart.classList.remove("is-active");
  overlay.classList.remove("show-overlay");
};
const renderCartProduct = (cartProduct) => {
  const { id, img, name, desc, price, quantity } = cartProduct;
  return `    
      <div class="card card--cart box-shadow">
          <img
            class="card__img--cart"
            src="${img}"
            alt="pizza recomendada"/>
          <div class="card__info">
            <p class="card-name">${name}</p>
            <p class="card__description">${desc}</p>
            <p class="card__price gradient-text">$${price}</p>
          </div>
          <div class="card__buttons">
            <button class="btn btn--cart down" data-id="${id}">-</button>
            <span class="card__quantity">${quantity}</span>
            <button class="btn btn--cart up" data-id="${id}">+</button>
          </div>
        </div>
        `;
};

const renderCart = () => {
  if (!cart.length) {
    productsCartStorage.innerHTML = `<p class="empty-msg"> Su carrito esta vacio :( </p>`;
    return;
  }
  productsCartStorage.innerHTML = cart.map(renderCartProduct).join("");
};
const getCartTotal = () => {
  return cart.reduce((acc, cur) => {
    if (cur.price === "Gratis") {
      return acc + 0;
    } else {
      return acc + Number(cur.price) * Number(cur.quantity);
    }
  }, 0);
};

const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} $`;
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.remove("btn");
    btn.classList.add("disabled");
    return;
  }
  btn.classList.add("btn");
  btn.classList.remove("disabled");
};

const createProductObj = (id, price, img, name, desc) => {
  return { id, price, img, name, desc };
};

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const isExistingCartProduct = (product) => {
  return cart.find((itemCart) => itemCart.id === product.id);
};


const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  disableBtn(btnBuy);
  disableBtn(btnDelete);
};


const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};




const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const { id, price, img, name, desc } = e.target.dataset;
  const product = createProductObj(id, price, img, name, desc);
  
  
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else {
    createCartProduct(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }
  checkCartState();
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter(product => product.id !== existingProduct.id)
  checkCartState()
}


const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const substractProductUnit = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct;
  });
};
const handlePlusBtnEvent = (id) => {
 
  const existingCartProduct = cart.find((item)=> item.id === id);
  addUnitToProduct(existingCartProduct); 
};


const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id)


  if(existingCartProduct.quantity === 1) {
    if (window.confirm("Desea eliminar el producto del carrito?")){
      removeProductFromCart(existingCartProduct);
    }
    return;
  } 
  substractProductUnit(existingCartProduct);
};






const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  checkCartState();
};



const resetCartItems = () => {
  cart = [];
  checkCartState();
};


const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};


const completeBuy = () => {
  completeCartAction(
    "¿Desea confirmar su compra?",
    "Realizó la compra exitosamente"
  );
};

const deleteCart = () => {
  completeCartAction(
    "¿Está seguro de que desea vaciar el carrito?",
    "Usted a vaciado el carrito"
  );
};

const init = () => {
  renderProducts();

  categories.addEventListener("click", applyFilter);

  btnOpenCart.addEventListener("click", toggleCart);
  btnCloseCart.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  document.addEventListener("DOMContentLoaded", renderRecommendedProducts);
  document.addEventListener("click", addProduct);
  
  productsCart.addEventListener("click", handleQuantity)

  btnBuy.addEventListener("click", completeBuy)
  btnDelete.addEventListener("click", deleteCart)
  disableBtn(btnDelete);
  disableBtn(btnBuy);
  
  
  btnOpenCart.addEventListener("click", () => {
    productsCart.classList.add("is-active");
  });
  btnCloseCart.addEventListener("click", () => {
    productsCart.classList.remove("is-active");
  });
};

init();