
/*const products = [
  { name: "Garri", category: "Cassava Flakes", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Elubo Isu", category: "Yam Flour", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Elubo Ogede", category: "Plantain Flour", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Egunsi", category: "Soup Ingredients", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Crayfish", category: "Soup Ingredients", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Bonga Fish", category: "Fish & Seafood", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Ogbolo", category: "Soup Ingredients", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Prawn", category: "Fish & Seafood", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Catfish", category: "Fish & Seafood", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Panla Fish", category: "Fish & Seafood", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Groundnuts", category: "Snacks", unit: "kg", stock: 0, buying: 0, selling: 0 },
  { name: "Kulikuli", category: "Snacks", unit: "pack", stock: 0, buying: 0, selling: 0 },
  { name: "Donkwa", category: "Snacks", unit: "pack", stock: 0, buying: 0, selling: 0 },
  { name: "Kilishi", category: "Snacks", unit: "pack", stock: 0, buying: 0, selling: 0 }
];

const inventoryTableBody = document.getElementById("inventoryTableBody");
const productSearch = document.getElementById("productSearch");

function formatMoney(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function getStockStatus(stock) {
  if (stock <= 0) {
    return '<span class="stock-badge out">Out of stock</span>';
  }

  if (stock <= 5) {
    return '<span class="stock-badge low">Low stock</span>';
  }

  return '<span class="stock-badge">In stock</span>';
}

function renderInventory(searchTerm = "") {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  inventoryTableBody.innerHTML = filteredProducts.map(product => `
    <tr>
      <td><strong>${product.name}</strong></td>
      <td>${product.category}</td>
      <td>${product.unit}</td>
      <td>${product.stock}</td>
      <td>${formatMoney(product.buying)}</td>
      <td>${formatMoney(product.selling)}</td>
      <td>${getStockStatus(product.stock)}</td>
    </tr>
  `).join("");

  document.getElementById("totalProducts").textContent = products.length;

  document.getElementById("lowStockCount").textContent =
    products.filter(product => product.stock > 0 && product.stock <= 5).length;

  document.getElementById("categoryCount").textContent =
    new Set(products.map(product => product.category)).size;
}

productSearch.addEventListener("input", function () {
  renderInventory(this.value);
});

document.getElementById("showInventoryButton").addEventListener("click", function () {
  document.getElementById("inventorySection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  document.getElementById("inventoryMessage").textContent =
    "Your 14 Praim Foods products are listed below.";
});

renderInventory();
*/





const defaultProducts = [
  { name: "Garri", category: "Cassava & Flour", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Elubo Isu", category: "Cassava & Flour", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Elubo Ogede", category: "Cassava & Flour", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Egunsi", category: "Soup Ingredients", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Crayfish", category: "Soup Ingredients", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Bonga Fish", category: "Fish & Seafood", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Ogbolo", category: "Soup Ingredients", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Prawn", category: "Fish & Seafood", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Catfish", category: "Fish & Seafood", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Panla Fish", category: "Fish & Seafood", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Groundnuts", category: "Snacks", unit: "Gram/kg", stock: 0, buying: 0, selling: 0 },
  { name: "Kulikuli", category: "Snacks", unit: "pack", stock: 0, buying: 0, selling: 0 },
  { name: "Donkwa", category: "Snacks", unit: "pack", stock: 0, buying: 0, selling: 0 },
  { name: "Kilishi", category: "Snacks", unit: "pack", stock: 0, buying: 0, selling: 0 }
];

const STORAGE_KEY = "praimFoodsInventory";

const MOVEMENT_KEY = "praimFoodsStockMovements";

function loadMovements() {
  try {
    const saved = JSON.parse(localStorage.getItem(MOVEMENT_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not load stock movements:", error);
    return [];
  }
}

let stockMovements = loadMovements();

function saveMovements() {
  try {
    localStorage.setItem(MOVEMENT_KEY, JSON.stringify(stockMovements));
    return true;
  } catch (error) {
    console.error("Could not save stock movements:", error);
    return false;
  }
}








function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultProducts.map(product => ({ ...product }));
    }

    const savedProducts = JSON.parse(saved);

    if (!Array.isArray(savedProducts)) {
      return defaultProducts.map(product => ({ ...product }));
    }

    return defaultProducts.map(original => {
      const existing = savedProducts.find(
        item => item.name === original.name
      );

      if (!existing) {
        return { ...original };
      }

      return {
        ...original,
        unit: typeof existing.unit === "string" ? existing.unit : original.unit,
        stock: Number.isFinite(Number(existing.stock)) && Number(existing.stock) >= 0
          ? Number(existing.stock) : 0,
        buying: Number.isFinite(Number(existing.buying)) && Number(existing.buying) >= 0
          ? Number(existing.buying) : 0,
        selling: Number.isFinite(Number(existing.selling)) && Number(existing.selling) >= 0
          ? Number(existing.selling) : 0
      };
    });
  } catch (error) {
    console.error("Could not load inventory:", error);
    return defaultProducts.map(product => ({ ...product }));
  }
}

let products = loadProducts();

const inventoryTableBody = document.getElementById("inventoryTableBody");
const productSearch = document.getElementById("productSearch");
const inventoryMessage = document.getElementById("inventoryMessage");

function formatMoney(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG", {
    maximumFractionDigits: 2
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getStockStatus(stock) {
  if (stock <= 0) {
    return '<span class="stock-badge out">Out of stock</span>';
  }

  if (stock <= 5) {
    return '<span class="stock-badge low">Low stock</span>';
  }

  return '<span class="stock-badge">In stock</span>';
}

function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error("Could not save inventory:", error);
    inventoryMessage.textContent =
      "Unable to save. Your browser storage may be unavailable or full.";
    return false;
  }
}

function renderInventory(searchTerm = "") {
  const term = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );

  inventoryTableBody.innerHTML = filteredProducts.map(product => `
    <tr>
      <td><strong>${escapeHTML(product.name)}</strong></td>
      <td>${escapeHTML(product.category)}</td>
      <td>
        <input
          class="product-unit"
          data-name="${escapeHTML(product.name)}"
          value="${escapeHTML(product.unit)}"
          aria-label="Unit for ${escapeHTML(product.name)}"
          maxlength="20"
          style="width:75px;padding:7px;border:1px solid #ded5e0;border-radius:5px"
        >
      </td>
      <td>
        <input
          class="product-stock"
          data-name="${escapeHTML(product.name)}"
          type="number" min="0" step="any"
          value="${product.stock}"
          aria-label="Stock for ${escapeHTML(product.name)}"
          style="width:85px;padding:7px;border:1px solid #ded5e0;border-radius:5px"
        >
      </td>
      <td>
        <input
          class="product-buying"
          data-name="${escapeHTML(product.name)}"
          type="number" min="0" step="any"
          value="${product.buying}"
          aria-label="Buying price for ${escapeHTML(product.name)}"
          style="width:110px;padding:7px;border:1px solid #ded5e0;border-radius:5px"
        >
      </td>
      <td>
        <input
          class="product-selling"
          data-name="${escapeHTML(product.name)}"
          type="number" min="0" step="any"
          value="${product.selling}"
          aria-label="Selling price for ${escapeHTML(product.name)}"
          style="width:110px;padding:7px;border:1px solid #ded5e0;border-radius:5px"
        >
      </td>
      <td>${getStockStatus(product.stock)}</td>
      <td>
        <button
          class="save-product"
          data-name="${escapeHTML(product.name)}"
          style="margin:0;padding:9px 12px;font-size:12px"
        >Save</button>
      </td>
    </tr>
  `).join("");

  document.getElementById("totalProducts").textContent = products.length;

  document.getElementById("lowStockCount").textContent =
    products.filter(product => product.stock > 0 && product.stock <= 5).length;

  document.getElementById("categoryCount").textContent =
    new Set(products.map(product => product.category)).size;
}

inventoryTableBody.addEventListener("click", function (event) {
  const button = event.target.closest(".save-product");

  if (!button) return;

  const name = button.dataset.name;
  const product = products.find(item => item.name === name);

  if (!product) return;

  const unitInput = inventoryTableBody.querySelector(
    `.product-unit[data-name="${CSS.escape(name)}"]`
  );
  const stockInput = inventoryTableBody.querySelector(
    `.product-stock[data-name="${CSS.escape(name)}"]`
  );
  const buyingInput = inventoryTableBody.querySelector(
    `.product-buying[data-name="${CSS.escape(name)}"]`
  );
  const sellingInput = inventoryTableBody.querySelector(
    `.product-selling[data-name="${CSS.escape(name)}"]`
  );

  const unit = unitInput.value.trim();
  const stock = Number(stockInput.value);
  const buying = Number(buyingInput.value);
  const selling = Number(sellingInput.value);

  if (!unit) {
    inventoryMessage.textContent = "Please enter a unit, such as kg, gram, pack or bag.";
    unitInput.focus();
    return;
  }

  if (
    stockInput.value.trim() === "" ||
    buyingInput.value.trim() === "" ||
    sellingInput.value.trim() === "" ||
    !Number.isFinite(stock) ||
    !Number.isFinite(buying) ||
    !Number.isFinite(selling) ||
    stock < 0 ||
    buying < 0 ||
    selling < 0
  ) {
    inventoryMessage.textContent =
      "Please enter valid, non-negative stock and price values.";
    return;
  }

  const previousProduct = { ...product };

  product.unit = unit;
  product.stock = stock;
  product.buying = buying;
  product.selling = selling;

  if (!saveProducts()) {
    Object.assign(product, previousProduct);
    return;
  }

  renderInventory(productSearch.value);
  inventoryMessage.textContent = `${product.name} saved successfully.`;
});

productSearch.addEventListener("input", function () {
  renderInventory(this.value);
});

document.getElementById("showInventoryButton").addEventListener("click", function () {
  document.getElementById("inventorySection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  inventoryMessage.textContent = "Edit a product and press Save to keep your changes.";
});

renderInventory();



const receiveProduct = document.getElementById("receiveProduct");
const receivingForm = document.getElementById("receivingForm");
const movementTableBody = document.getElementById("movementTableBody");

function renderReceivingProducts() {
  receiveProduct.innerHTML = products.map(product => `
    <option value="${escapeHTML(product.name)}">
      ${escapeHTML(product.name)} (${escapeHTML(product.unit)})
    </option>
  `).join("");
}

function renderMovements() {
  movementTableBody.innerHTML = stockMovements
    .slice()
    .reverse()
    .map(movement => `
      <tr>
        <td>${escapeHTML(movement.date)}</td>
        <td>${escapeHTML(movement.product)}</td>
        <td>Stock received</td>
        <td>${movement.quantity}</td>
        <td>${escapeHTML(movement.supplier)}</td>
        <td>${formatMoney(movement.unitCost)}</td>
        <td>${escapeHTML(movement.reference || "—")}</td>
      </tr>
    `).join("");
}

function setTodayAsDefault() {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  document.getElementById("receiveDate").value = localToday;
}

receiveProduct.addEventListener("change", function () {
  const product = products.find(item => item.name === this.value);
  if (product) {
    document.getElementById("receiveCost").value = product.buying || "";
  }
});

receivingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const product = products.find(
    item => item.name === receiveProduct.value
  );

  const supplier = document.getElementById("receiveSupplier").value.trim();
  const quantityInput = document.getElementById("receiveQuantity");
  const costInput = document.getElementById("receiveCost");
  const reference = document.getElementById("receiveReference").value.trim();
  const date = document.getElementById("receiveDate").value;

  const quantity = Number(quantityInput.value);
  const unitCost = Number(costInput.value);

  if (!product || !supplier || !date) {
    document.getElementById("receivingMessage").textContent =
      "Please select a product, enter a supplier and choose a date.";
    return;
  }

  if (
    quantityInput.value.trim() === "" ||
    costInput.value.trim() === "" ||
    !Number.isFinite(quantity) ||
    !Number.isFinite(unitCost) ||
    quantity <= 0 ||
    unitCost < 0
  ) {
    document.getElementById("receivingMessage").textContent =
      "Enter a valid positive quantity and a non-negative unit cost.";
    return;
  }

  const previousProduct = { ...product };
  const previousMovements = stockMovements.slice();

  const oldStock = product.stock;
  const newStock = oldStock + quantity;

  // Calculate weighted-average unit cost for the inventory value.
  const newAverageCost = newStock > 0
    ? ((oldStock * product.buying) + (quantity * unitCost)) / newStock
    : unitCost;

  product.stock = newStock;
  product.buying = newAverageCost;

  const movement = {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()),
    date,
    product: product.name,
    quantity,
    supplier,
    unitCost,
    reference,
    recordedAt: new Date().toISOString()
  };

  stockMovements.push(movement);

  // If either local save fails, attempt to restore the prior state.
  if (!saveProducts() || !saveMovements()) {
    Object.assign(product, previousProduct);
    stockMovements = previousMovements;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      localStorage.setItem(MOVEMENT_KEY, JSON.stringify(stockMovements));
    } catch (error) {
      console.error("Could not restore prior inventory state:", error);
    }

    document.getElementById("receivingMessage").textContent =
      "Saving failed. Please check your inventory and movement history before trying again.";
    renderInventory(productSearch.value);
    renderMovements();
    return;
  }

  renderInventory(productSearch.value);
  renderMovements();

  document.getElementById("receivingMessage").textContent =
    `Delivery recorded: ${quantity} ${product.unit} of ${product.name}. New stock: ${newStock} ${product.unit}.`;

  receivingForm.reset();
  setTodayAsDefault();
  renderReceivingProducts();
});

renderReceivingProducts();
renderMovements();
setTodayAsDefault();





const SALES_KEY = "praimFoodsSales";

function loadSales() {
  try {
    const saved = JSON.parse(localStorage.getItem(SALES_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not load sales:", error);
    return [];
  }
}

let sales = loadSales();

function saveSales() {
  try {
    localStorage.setItem(SALES_KEY, JSON.stringify(sales));
    return true;
  } catch (error) {
    console.error("Could not save sales:", error);
    return false;
  }
}

const salesForm = document.getElementById("salesForm");
const saleProduct = document.getElementById("saleProduct");
const salesTableBody = document.getElementById("salesTableBody");

function createReceiptNumber() {
  return "PF-" + Date.now().toString(36).toUpperCase();
}

function renderSaleProducts() {
  saleProduct.innerHTML = products.map(product => `
    <option value="${escapeHTML(product.name)}">
      ${escapeHTML(product.name)} — Stock: ${product.stock} ${escapeHTML(product.unit)}
    </option>
  `).join("");

  updateSalePrice();
}

function updateSalePrice() {
  const product = products.find(item => item.name === saleProduct.value);
  document.getElementById("salePrice").value =
    product ? product.selling : "";
}

function renderSalesHistory() {
  salesTableBody.innerHTML = sales.slice().reverse().map(sale => `
    <tr>
      <td>${escapeHTML(sale.receipt)}</td>
      <td>${escapeHTML(sale.date)}</td>
      <td>${escapeHTML(sale.customer)}</td>
      <td>${escapeHTML(sale.type)}</td>
      <td>${escapeHTML(sale.product)}</td>
      <td>${sale.quantity} ${escapeHTML(sale.unit)}</td>
      <td>${formatMoney(sale.total)}</td>
      <td>${escapeHTML(sale.payment)}</td>
    </tr>
  `).join("");

  document.getElementById("salesCount").textContent = sales.length;

  const revenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const grossProfit = sales.reduce((sum, sale) => sum + sale.grossProfit, 0);

  document.getElementById("salesRevenue").textContent = formatMoney(revenue);
  document.getElementById("salesGrossProfit").textContent =
    formatMoney(grossProfit);
}

saleProduct.addEventListener("change", updateSalePrice);

salesForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const message = document.getElementById("salesMessage");

  const product = products.find(item => item.name === saleProduct.value);
  const customer = document.getElementById("saleCustomer").value.trim();
  const type = document.getElementById("saleType").value;
  const quantityInput = document.getElementById("saleQuantity");
  const priceInput = document.getElementById("salePrice");
  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);
  const date = document.getElementById("saleDate").value;
  const payment = document.getElementById("salePayment").value;

  if (!product || !customer || !date) {
    message.textContent = "Please complete all required fields.";
    return;
  }

  if (
    quantityInput.value.trim() === "" ||
    priceInput.value.trim() === "" ||
    !Number.isFinite(quantity) ||
    !Number.isFinite(price) ||
    quantity <= 0 ||
    price < 0
  ) {
    message.textContent = "Enter a valid quantity and a non-negative selling price.";
    return;
  }

  if (quantity > product.stock) {
    message.textContent =
      `Insufficient stock. Only ${product.stock} ${product.unit} of ${product.name} are available.`;
    return;
  }

  const total = quantity * price;
  const costOfGoods = quantity * product.buying;
  const grossProfit = total - costOfGoods;

  const receipt = createReceiptNumber();
  const previousProduct = { ...product };
  const previousSales = sales.slice();
  const previousMovements = stockMovements.slice();

  product.stock -= quantity;

  const sale = {
    receipt,
    date,
    customer,
    type,
    product: product.name,
    quantity,
    unit: product.unit,
    unitPrice: price,
    unitCost: product.buying,
    total,
    costOfGoods,
    grossProfit,
    payment,
    recordedAt: new Date().toISOString()
  };

  const movement = {
    id: receipt,
    date,
    product: product.name,
    quantity: -quantity,
    supplier: customer,
    unitCost: product.buying,
    reference: receipt,
    type: "Sale",
    recordedAt: new Date().toISOString()
  };

  sales.push(sale);
  stockMovements.push(movement);

  // Save each related record and attempt restoration if a save fails.
  const inventorySaved = saveProducts();

  if (!inventorySaved) {
    Object.assign(product, previousProduct);
    sales = previousSales;
    stockMovements = previousMovements;
    message.textContent = "Could not save the inventory. Sale was not completed.";
    return;
  }

  const salesSaved = saveSales();
  const movementsSaved = salesSaved && saveMovements();

  if (!salesSaved || !movementsSaved) {
    Object.assign(product, previousProduct);
    sales = previousSales;
    stockMovements = previousMovements;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      localStorage.setItem(SALES_KEY, JSON.stringify(sales));
      localStorage.setItem(MOVEMENT_KEY, JSON.stringify(stockMovements));
    } catch (error) {
      console.error("Could not restore records after failed sale:", error);
    }

    renderInventory(productSearch.value);
    renderMovements();
    renderSaleProducts();

    message.textContent =
      "Saving failed. Please verify stock, sales and movement history before retrying.";
    return;
  }

  renderInventory(productSearch.value);
  renderMovements();
  renderSaleProducts();
  renderSalesHistory();

  message.textContent =
    `Sale recorded! Receipt: ${receipt}. Total: ${formatMoney(total)}.`;

  salesForm.reset();
  setTodayAsDefault();
  updateSalePrice();
});

function setSaleDateToday() {
  const today = new Date();
  const dateString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  document.getElementById("saleDate").value = dateString;
}

function refreshMovementTableForSales() {
  movementTableBody.innerHTML = stockMovements.slice().reverse().map(movement => {
    const isSale = movement.type === "Sale";

    return `
      <tr>
        <td>${escapeHTML(movement.date)}</td>
        <td>${escapeHTML(movement.product)}</td>
        <td>${isSale ? "Sale" : "Stock received"}</td>
        <td>${isSale ? movement.quantity : movement.quantity}</td>
        <td>${escapeHTML(movement.supplier || "—")}</td>
        <td>${formatMoney(movement.unitCost)}</td>
        <td>${escapeHTML(movement.reference || "—")}</td>
      </tr>
    `;
  }).join("");
}

// Replace the earlier movement renderer so sales appear correctly.
renderMovements = refreshMovementTableForSales;

renderSaleProducts();
renderSalesHistory();
setSaleDateToday();
renderMovements();



const SALES_KEY = "praimFoodsSales";

function loadSales() {
  try {
    const saved = JSON.parse(localStorage.getItem(SALES_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not load sales:", error);
    return [];
  }
}

let sales = loadSales();

function saveSales() {
  try {
    localStorage.setItem(SALES_KEY, JSON.stringify(sales));
    return true;
  } catch (error) {
    console.error("Could not save sales:", error);
    return false;
  }
}

const salesForm = document.getElementById("salesForm");
const saleProduct = document.getElementById("saleProduct");
const salesTableBody = document.getElementById("salesTableBody");

function createReceiptNumber() {
  return "PF-" + Date.now().toString(36).toUpperCase();
}

function renderSaleProducts() {
  saleProduct.innerHTML = products.map(product => `
    <option value="${escapeHTML(product.name)}">
      ${escapeHTML(product.name)} — Stock: ${product.stock} ${escapeHTML(product.unit)}
    </option>
  `).join("");

  updateSalePrice();
}

function updateSalePrice() {
  const product = products.find(item => item.name === saleProduct.value);
  document.getElementById("salePrice").value =
    product ? product.selling : "";
}

function renderSalesHistory() {
  salesTableBody.innerHTML = sales.slice().reverse().map(sale => `
    <tr>
      <td>${escapeHTML(sale.receipt)}</td>
      <td>${escapeHTML(sale.date)}</td>
      <td>${escapeHTML(sale.customer)}</td>
      <td>${escapeHTML(sale.type)}</td>
      <td>${escapeHTML(sale.product)}</td>
      <td>${sale.quantity} ${escapeHTML(sale.unit)}</td>
      <td>${formatMoney(sale.total)}</td>
      <td>${escapeHTML(sale.payment)}</td>
    </tr>
  `).join("");

  document.getElementById("salesCount").textContent = sales.length;

  const revenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const grossProfit = sales.reduce((sum, sale) => sum + sale.grossProfit, 0);

  document.getElementById("salesRevenue").textContent = formatMoney(revenue);
  document.getElementById("salesGrossProfit").textContent =
    formatMoney(grossProfit);
}

saleProduct.addEventListener("change", updateSalePrice);

salesForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const message = document.getElementById("salesMessage");

  const product = products.find(item => item.name === saleProduct.value);
  const customer = document.getElementById("saleCustomer").value.trim();
  const type = document.getElementById("saleType").value;
  const quantityInput = document.getElementById("saleQuantity");
  const priceInput = document.getElementById("salePrice");
  const quantity = Number(quantityInput.value);
  const price = Number(priceInput.value);
  const date = document.getElementById("saleDate").value;
  const payment = document.getElementById("salePayment").value;

  if (!product || !customer || !date) {
    message.textContent = "Please complete all required fields.";
    return;
  }

  if (
    quantityInput.value.trim() === "" ||
    priceInput.value.trim() === "" ||
    !Number.isFinite(quantity) ||
    !Number.isFinite(price) ||
    quantity <= 0 ||
    price < 0
  ) {
    message.textContent = "Enter a valid quantity and a non-negative selling price.";
    return;
  }

  if (quantity > product.stock) {
    message.textContent =
      `Insufficient stock. Only ${product.stock} ${product.unit} of ${product.name} are available.`;
    return;
  }

  const total = quantity * price;
  const costOfGoods = quantity * product.buying;
  const grossProfit = total - costOfGoods;

  const receipt = createReceiptNumber();
  const previousProduct = { ...product };
  const previousSales = sales.slice();
  const previousMovements = stockMovements.slice();

  product.stock -= quantity;

  const sale = {
    receipt,
    date,
    customer,
    type,
    product: product.name,
    quantity,
    unit: product.unit,
    unitPrice: price,
    unitCost: product.buying,
    total,
    costOfGoods,
    grossProfit,
    payment,
    recordedAt: new Date().toISOString()
  };

  const movement = {
    id: receipt,
    date,
    product: product.name,
    quantity: -quantity,
    supplier: customer,
    unitCost: product.buying,
    reference: receipt,
    type: "Sale",
    recordedAt: new Date().toISOString()
  };

  sales.push(sale);
  stockMovements.push(movement);

  // Save each related record and attempt restoration if a save fails.
  const inventorySaved = saveProducts();

  if (!inventorySaved) {
    Object.assign(product, previousProduct);
    sales = previousSales;
    stockMovements = previousMovements;
    message.textContent = "Could not save the inventory. Sale was not completed.";
    return;
  }

  const salesSaved = saveSales();
  const movementsSaved = salesSaved && saveMovements();

  if (!salesSaved || !movementsSaved) {
    Object.assign(product, previousProduct);
    sales = previousSales;
    stockMovements = previousMovements;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      localStorage.setItem(SALES_KEY, JSON.stringify(sales));
      localStorage.setItem(MOVEMENT_KEY, JSON.stringify(stockMovements));
    } catch (error) {
      console.error("Could not restore records after failed sale:", error);
    }

    renderInventory(productSearch.value);
    renderMovements();
    renderSaleProducts();

    message.textContent =
      "Saving failed. Please verify stock, sales and movement history before retrying.";
    return;
  }

  renderInventory(productSearch.value);
  renderMovements();
  renderSaleProducts();
  renderSalesHistory();

  message.textContent =
    `Sale recorded! Receipt: ${receipt}. Total: ${formatMoney(total)}.`;

  salesForm.reset();
  setTodayAsDefault();
  updateSalePrice();
});

function setSaleDateToday() {
  const today = new Date();
  const dateString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  document.getElementById("saleDate").value = dateString;
}

function refreshMovementTableForSales() {
  movementTableBody.innerHTML = stockMovements.slice().reverse().map(movement => {
    const isSale = movement.type === "Sale";

    return `
      <tr>
        <td>${escapeHTML(movement.date)}</td>
        <td>${escapeHTML(movement.product)}</td>
        <td>${isSale ? "Sale" : "Stock received"}</td>
        <td>${isSale ? movement.quantity : movement.quantity}</td>
        <td>${escapeHTML(movement.supplier || "—")}</td>
        <td>${formatMoney(movement.unitCost)}</td>
        <td>${escapeHTML(movement.reference || "—")}</td>
      </tr>
    `;
  }).join("");
}

// Replace the earlier movement renderer so sales appear correctly.
renderMovements = refreshMovementTableForSales;

renderSaleProducts();
renderSalesHistory();
setSaleDateToday();
renderMovements();











