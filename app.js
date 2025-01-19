// define the class for the customer
class Customer {
    static totalCustomersCount = 0;
    static totalCustomers = [];

    constructor(customerId, name, email, password) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.password = password;
        Customer.totalCustomersCount++;
    }

    register(){
       
        console.log(`Costumer ${this.name} has been registered.`)
    }

}

// Define the class for ShoppingCart
class ShoppingCart {
    static inventory = [
        {id: 1, name: "Laptop", price: 15000, quantity: 10},
        {id: 2, name: "Phone", price: 10000, quantity: 5},
        {id: 3, name: "Jug", price: 1500, quantity: 15},
        {id: 4, name: "Table", price: 8000, quantity: 13},
    ];
    static cart = [];

    static displayInventory() {
        console.log("Available Inventory:");
        ShoppingCart.inventory.forEach(item => {
            console.log(`${item.name} - ${item.price} - Quantity: ${item.quantity}`)
        });
    }
    
    constructor(customerId, name, email, password) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // method to add an item to cart
    static addToCart(itemId, quantity) {
        // check if the item is in the inventory
        const item = ShoppingCart.inventory.find(i => i.id === itemId);
        if (!item){
            console.log("Item not found in the inventory");
            return;
        }

        // check if the quantity is enough
        if (item.quantity < quantity){
            console.log("There is not enough items in the inventory.");
            return;
        }

        // Add the item to cart
        const cartItem = ShoppingCart.cart.find(i => i.id === itemId);
        
        // If the item already exists in the cart, update it with the required quantity
        if (cartItem){
            cartItem.quantity += quantity;
        } else {
            ShoppingCart.cart.push({id: itemId, name: item.name, price: item.price, quantity: item.quantity});
        }

        // update the inventory
        item.quantity -= quantity;

        console.log(`${quantity} x ${item.name} added to the cart.`)
        ShoppingCart.displayCart();
    }

    // method to remove item from the cart
    static removeItemFromCart(itemId, quantity) {
        const cartItem = ShoppingCart.cart.find(i => i.id === itemId)
        if (!cartItem){
            console.log("The item is not found in the cart");
            return;
        }

        if(cartItem.quantity < quantity) {
            console.log(`You do not have up to such quantity, you have only ${cartItem.quantity} of ${cartItem.name} left`)
        }

        cartItem.quantity -= quantity;
        if (cartItem.quantity === 0){
            const index = ShoppingCart.cart.indexOf(cartItem);
            this.cart.splice(index, 1);
        }

        const item = ShoppingCart.inventory.find(i => i.id === itemId);
        item.quantity += quantity;

        console.log(`${quantity} x ${cartItem.name} was removed from the cart.`);
        ShoppingCart.displayCart();
    }

    static displayCart() {
        if (ShoppingCart.cart.length === 0){
            console.log("Your cart is empty")
        } else {
            console.log("Items in your cart:");
            ShoppingCart.cart.forEach(item => {
                console.log(`id: ${item.id} - ${item.name} - Quantity: ${item.quantity}`)
            })
        }
    }
}


class Order{
    constructor(orderId, customerName){
        this.orderId = orderId;
        this.customerName = customerName;
        this.items = [];

    }
    addItem(product, quantity){
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({product, quantity});
        }

        console.log(`${quantity} x ${product.name} was added to the this.orderId.`)
    }

    // Method to remove an item from the order
    removeItem(productId, quantity) {
        const existingItem = this.items.find(item => item.product.id === productId);

        if (existingItem) {
            if (existingItem.quantity <= quantity) {
                // If quantity to remove is greater than or equal to the current quantity, remove the item entirely
                this.items = this.items.filter(item => item.product.id !== productId);
                console.log(`${existingItem.product.name} removed from the order.`);
            } else {
                // If the quantity to remove is less than the quantity in the order, update the quantity
                existingItem.quantity -= quantity;
                console.log(`${quantity} x ${existingItem.product.name} removed from the order.`);
            }
        } else {
            console.log("Item not found in the order.");
        }
    }

    // Method to calculate the total price of the order
    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    // Method to display the order details
    displayOrder() {
        console.log(`Order ID: ${this.orderId}`);
        console.log(`Customer: ${this.customerName}`);
        console.log("Items in the order:");

        this.items.forEach(item => {
            console.log(`${item.product.name} - Quantity: ${item.quantity} - Price: $${item.product.price} - Total: $${item.product.price * item.quantity}`);
        });

        console.log(`Total Price: $${this.calculateTotal()}`);
    }
}

class Admin {
    constructor(adminId, name) {
        this.adminId = adminId;
        this.name = name;
    }

    // Method to add a new product to the inventory
    static addProduct(id, name, price, quantity) {
        const existingProduct = ShoppingCart.inventory.find(item => item.id === id);
        if (existingProduct) {
            console.log(`${name} already exists in the inventory.`);
            return;
        }

        ShoppingCart.inventory.push({ id, name, price, quantity });
        console.log(`${name} has been added to the inventory.`);
    }

    // Method to update product details in the inventory
    static updateProduct(id, newName, newPrice, newQuantity) {
        const product = ShoppingCart.inventory.find(item => item.id === id);
        if (!product) {
            console.log(`Product with ID ${id} not found.`);
            return;
        }

        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.quantity = newQuantity || product.quantity;

        console.log(`${product.name} has been updated.`);
    }

    // Method to remove a product from the inventory
    static removeProduct(id) {
        const productIndex = ShoppingCart.inventory.findIndex(item => item.id === id);
        if (productIndex === -1) {
            console.log(`Product with ID ${id} not found.`);
            return;
        }

        const removedProduct = ShoppingCart.inventory.splice(productIndex, 1);
        console.log(`${removedProduct[0].name} has been removed from the inventory.`);
    }

    // Method to view all orders
    static viewAllOrders(orders) {
        if (orders.length === 0) {
            console.log("No orders available.");
            return;
        }

        console.log("All Orders:");
        orders.forEach(order => {
            order.displayOrder();
        });
    }

    // Method to view a specific order
    static viewOrder(orderId, orders) {
        const order = orders.find(o => o.orderId === orderId);
        if (!order) {
            console.log(`Order with ID ${orderId} not found.`);
            return;
        }

        order.displayOrder();
    }

    // Method to cancel an order
    static cancelOrder(orderId, orders) {
        const orderIndex = orders.findIndex(o => o.orderId === orderId);
        if (orderIndex === -1) {
            console.log(`Order with ID ${orderId} not found.`);
            return;
        }

        const cancelledOrder = orders.splice(orderIndex, 1);
        console.log(`Order with ID ${cancelledOrder[0].orderId} has been cancelled.`);
    }
}


const product11 = { id: 1, name: "Laptop", price: 1500 };
const product12 = { id: 2, name: "Phone", price: 800 };
const product13 = { id: 3, name: "Headphones", price: 100 };

// Create a new order
let order = new Order(101, "Joseph Uche");  // Initialize 'order' first

// Add items to the order
order.addItem(product11, 2); 
order.addItem(product12, 1); 
order.addItem(product13, 3); 

// Now you can call Admin.viewAllOrders with the 'order' variable
Admin.viewAllOrders([order]);

// Create an Admin instance
const admin = new Admin(1, "Admin1");

// Adding products
Admin.addProduct(5, "Smartwatch", 3000, 20);
Admin.addProduct(6, "Keyboard", 1200, 25);

// Updating product
Admin.updateProduct(1, "Gaming Laptop", 16000, 15);

// Removing a product
Admin.removeProduct(3);

// Viewing all orders
Admin.viewAllOrders([order]);

// Viewing a specific order
Admin.viewOrder(101, [order]);

// Cancelling an order
Admin.cancelOrder(101, [order]);

ShoppingCart.addToCart(2, 4)

const Joseph = new Customer(1, "Joseph", "uche.ejike.123", 12345678)
const Uche = new Customer(1, "Uche", "uche.ejike.123", 12345678)
console.log(Joseph)
console.log(Uche)
Joseph.register()

ShoppingCart.removeItemFromCart(2,1)
const product1 = { id: 1, name: "Laptop", price: 1500 };
const product2 = { id: 2, name: "Phone", price: 800 };
const product3 = { id: 3, name: "Headphones", price: 100 };

// Create a new order
let newOrder = new Order(102, "Uche Ejike");

// Add items to the new order
newOrder.addItem(product1, 2); 
newOrder.addItem(product2, 1); 
newOrder.addItem(product3, 3); 

// Display the new order details
newOrder.displayOrder();