// 1. Define the Product class
class Product {
  constructor(title, imageUrl, desc, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = desc;
    this.price = price;
  }
}

// 2. Define the ElementAttribute class
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// 3. Define the Component base class
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    const hookEl = document.getElementById(this.hookId);
    if (hookEl) {
      hookEl.append(rootElement);
    } else {
      throw new Error(`Could not find element with id '${this.hookId}'`);
    }
    return rootElement;
  }
}

// 4. Define the ShoppingCart class
class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: $${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts() {
    console.log("Ordering Products...");
    console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: $${0}</h2>
      <button>Order Now</button>
    `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", () => this.orderProducts());
    this.totalOutput = cartEl.querySelector("h2");
  }
}

// 5. Define the ProductItem class
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
      <div>
        <img src='${this.product.imageUrl}' alt='${this.product.title}'>
        <div class='product-item__content'>
          <h2>${this.product.title}</h2>
          <h3>$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to cart</button>
        </div>
      </div>
    `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

// 6. Define the ProductList class
class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        "A Pillow",
        "https://media.istockphoto.com/id/1018424252/photo/white-pillow-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=isDoOy8kYXAshwL9MRjWrWA7OJ8U0L9ub_dFAkjxYLg=",
        "A Soft pillow for your comfort sleep",
        20.0
      ),
      new Product(
        "A Carpet",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG3Ry-gB3-5ozw-M3fNh00rOFeV4iwrEF8nw&s",
        "A luxury carpet of fur",
        60.0
      ),
      new Product(
        "A flower vase",
        "https://media.istockphoto.com/id/498508957/photo/ceramic-vase.jpg?s=612x612&w=0&k=20&c=Tg71sSInH864g3AVv3_cds1Cn-U-mkye7nDGrn-jKVI=",
        "An antique flower vase",
        100.0
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    this.products.forEach((product) => {
      const productItem = new ProductItem(product, "prod-list");
    });
  }
}

// 7. Define the Shop class
class Shop extends Component {
  constructor() {
    super("app");
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

// 8. Define the App class
class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

// Initialize the application
App.init();
