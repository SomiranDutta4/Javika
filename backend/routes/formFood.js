import foodModel from "../models/foodModel.js"

const organicFarmingProducts = [
    {
        "productId": 1,
        "productName": "Tomatoes",
        "category": "Vegetables",
        "price": 80,
        "marketPrice": 100,
        "description": "Fresh and juicy organic tomatoes grown without pesticides.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S003"],
        "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veggycation.com.au%2Fvegetables%2Fcarrots%2F&psig=AOvVaw1cuGutaQuAFK6zERGiH4Gy&ust=1738071333560000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjxoLWClosDFQAAAAAdAAAAABAE"
    },
    {
        "productId": 2,
        "productName": "Carrots",
        "category": "Vegetables",
        "price": 60,
        "marketPrice": 120,
        "description": "Crisp and fresh carrots, packed with vitamins.",
        "availableUnit": "kg",
        "sellerId": ["S002", "S004"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-carrots-459658/"
    },
    {
        "productId": 3,
        "productName": "Broccoli",
        "category": "Vegetables",
        "price": 120,
        "marketPrice": 130,

        "description": "Fresh green broccoli, rich in fiber and nutrients.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S005"],
        "imageUrl": "https://www.pexels.com/photo/close-up-photography-of-broccoli-509083/"
    },
    {
        "productId": 4,
        "productName": "Spinach",
        "category": "Vegetables",
        "price": 50,
        "marketPrice": 90,

        "description": "Fresh and organic spinach, packed with iron and vitamins.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S006"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-spinach-leaves-545017/"
    },
    {
        "productId": 5,
        "productName": "Onions",
        "category": "Vegetables",
        "price": 40,
        "marketPrice": 110,

        "description": "Fresh onions with a pungent flavor, perfect for cooking.",
        "availableUnit": "kg",
        "sellerId": ["S002", "S004"],
        "imageUrl": "https://www.pexels.com/photo/onions-93384/"
    },
    {
        "productId": 6,
        "productName": "Apples",
        "category": "Fruits",
        "price": 150,
        "marketPrice": 130,

        "description": "Crisp and sweet apples, perfect for snacking.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S007"],
        "imageUrl": "https://www.pexels.com/photo/assorted-apples-on-white-ceramic-plate-104147/"
    },
    {
        "productId": 7,
        "productName": "Bananas",
        "category": "Fruits",
        "marketPrice": 120,

        "price": 120,
        "description": "Ripe and sweet bananas, full of energy.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S008"],
        "imageUrl": "https://www.pexels.com/photo/close-up-photo-of-banana-1059292/"
    },
    {
        "productId": 8,
        "productName": "Oranges",
        "category": "Fruits",
        "marketPrice": 120,

        "price": 140,
        "description": "Fresh and tangy oranges, packed with vitamin C.",
        "availableUnit": "kg",
        "sellerId": ["S004", "S009"],
        "imageUrl": "https://www.pexels.com/photo/oranges-in-basket-6217601/"
    },
    {
        "productId": 9,
        "productName": "Pineapples",
        "category": "Fruits",
        "price": 180,
        "marketPrice": 80,

        "description": "Juicy and sweet pineapples, perfect for tropical flavor.",
        "availableUnit": "kg",
        "sellerId": ["S005", "S010"],
        "imageUrl": "https://www.pexels.com/photo/sliced-pineapples-1466742/"
    },
    {
        "productId": 10,
        "productName": "Strawberries",
        "category": "Fruits",
        "marketPrice": 430,

        "price": 200,
        "description": "Fresh and sweet strawberries, perfect for desserts.",
        "availableUnit": "kg",
        "sellerId": ["S006", "S011"],
        "imageUrl": "https://www.pexels.com/photo/strawberries-in-white-plate-34155/"
    },
    {
        "productId": 11,
        "productName": "Milk",
        "category": "Dairy Products",
        "price": 60,
        "marketPrice": 110,

        "description": "Fresh, organic milk rich in calcium.",
        "availableUnit": "ltr",
        "sellerId": ["S001", "S002"],
        "imageUrl": "https://www.pexels.com/photo/close-up-photography-of-milk-in-glass-bottle-2298361/"
    },
    {
        "productId": 12,
        "productName": "Cheese",
        "category": "Dairy Products",
        "price": 250,
        "marketPrice": 220,

        "description": "Creamy and delicious cheese for all your recipes.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S004"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-cheese-slices-1573485/"
    },
    {
        "productId": 13,
        "productName": "Yogurt",
        "category": "Dairy Products",
        "price": 90,
        "marketPrice": 122,

        "description": "Smooth and creamy yogurt, great for breakfast.",
        "availableUnit": "ltr",
        "sellerId": ["S005", "S006"],
        "imageUrl": "https://www.pexels.com/photo/yogurt-in-glass-bowl-with-spoon-on-white-background-434091/"
    },
    {
        "productId": 14,
        "productName": "Butter",
        "category": "Dairy Products",
        "price": 160,
        "marketPrice": 190,

        "description": "Fresh and creamy butter for baking and cooking.",
        "availableUnit": "kg",
        "sellerId": ["S007", "S008"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-cream-butter-1634107/"
    },
    {
        "productId": 15,
        "productName": "Cottage Cheese",
        "category": "Dairy Products",
        "marketPrice": 160,

        "price": 130,
        "description": "Soft and fresh cottage cheese, perfect for snacking.",
        "availableUnit": "kg",
        "sellerId": ["S009", "S010"],
        "imageUrl": "https://www.pexels.com/photo/white-cottage-cheese-235097/"
    },
    {
        "productId": 16,
        "productName": "Rice",
        "category": "Cereals and Pulses",
        "price": 70,
        "marketPrice": 150,

        "description": "Long grain rice, perfect for daily meals.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S003"],
        "imageUrl": "https://www.pexels.com/photo/white-rice-on-wooden-spoon-613049/"
    },
    {
        "productId": 17,
        "productName": "Wheat Flour",
        "category": "Cereals and Pulses",
        "price": 45,
        "marketPrice": 150,

        "description": "Freshly milled wheat flour, ideal for making rotis.",
        "availableUnit": "kg",
        "sellerId": ["S002", "S004"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-flour-3861962/"
    },
    {
        "productId": 18,
        "productName": "Chickpeas",
        "category": "Cereals and Pulses",
        "price": 90,
        "marketPrice": 130,

        "description": "Organic chickpeas, great for making hummus.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S005"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-chickpeas-3852222/"
    },
    {
        "productId": 19,
        "productName": "Lentils",
        "category": "Cereals and Pulses",
        "marketPrice": 110,

        "price": 50,
        "description": "High-quality lentils, a great source of protein.",
        "availableUnit": "kg",
        "sellerId": ["S006", "S007"],
        "imageUrl": "https://www.pexels.com/photo/lentils-977007/"
    },
    {
        "productId": 20,
        "productName": "Quinoa",
        "category": "Cereals and Pulses",
        "marketPrice": 180,

        "price": 250,
        "description": "Healthy and gluten-free quinoa, a perfect addition to meals.",
        "availableUnit": "kg",
        "sellerId": ["S008", "S009"],
        "imageUrl": "https://www.pexels.com/photo/uncooked-quinoa-1092220/"
    },
    {
        "productId": 21,
        "productName": "Almonds",
        "category": "Dry Fruits",
        "marketPrice": 130,

        "price": 350,
        "description": "Roasted almonds, a healthy snack full of protein.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S002"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-almonds-1412041/"
    },
    {
        "productId": 22,
        "productName": "Cashews",
        "marketPrice": 130,

        "category": "Dry Fruits",
        "price": 450,
        "description": "Crunchy and buttery cashews, perfect for snacking.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S004"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-cashews-1364607/"
    },
    {
        "productId": 23,
        "productName": "Walnuts",
        "marketPrice": 120,

        "category": "Dry Fruits",
        "price": 400,
        "description": "Fresh and crunchy walnuts, perfect for your recipes.",
        "availableUnit": "kg",
        "sellerId": ["S005", "S006"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-walnuts-1359710/"
    },
    {
        "productId": 24,
        "productName": "Pistachios",
        "category": "Dry Fruits",
        "marketPrice": 120,

        "price": 500,
        "description": "Salted pistachios, a tasty and nutritious snack.",
        "availableUnit": "kg",
        "sellerId": ["S007", "S008"],
        "imageUrl": "https://www.pexels.com/photo/pistachio-nuts-1241355/"
    },
    {
        "productId": 25,
        "productName": "Dates",
        "category": "Dry Fruits",
        "price": 300,
        "marketPrice": 100,

        "description": "Fresh and sweet dates, great for energy.",
        "availableUnit": "kg",
        "sellerId": ["S009", "S010"],
        "imageUrl": "https://www.pexels.com/photo/dates-in-wooden-bowl-1750934/"
    },
    {
        "productId": 25,
        "productName": "Basil",
        "category": "Herbs",
        "marketPrice": 100,

        "price": 80,
        "description": "Fresh organic basil, perfect for cooking and garnishing.",
        "availableUnit": "bunch",
        "sellerId": ["S001", "S004"],
        "imageUrl": "https://www.pexels.com/photo/basil-plant-256457/"
    },
    {
        "productId": 26,
        "productName": "Mint",
        "category": "Herbs",
        "price": 50,
        "marketPrice": 20,

        "description": "Fresh mint leaves, great for teas and recipes.",
        "availableUnit": "bunch",
        "sellerId": ["S003", "S005"],
        "imageUrl": "https://www.pexels.com/photo/fresh-mint-leaves-1062400/"
    },
    {
        "productId": 27,
        "productName": "Green Tea",
        "category": "Beverages",
        "marketPrice": 220,

        "price": 200,
        "description": "High-quality organic green tea leaves.",
        "availableUnit": "box",
        "sellerId": ["S002", "S006"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-green-tea-3026806/"
    },
    {
        "productId": 28,
        "productName": "Coffee Beans",
        "category": "Beverages",
        "marketPrice": 220,

        "price": 300,
        "description": "Premium roasted coffee beans for the perfect brew.",
        "availableUnit": "kg",
        "sellerId": ["S007", "S008"],
        "imageUrl": "https://www.pexels.com/photo/coffee-beans-3046244/"
    }
]

// const foodSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String, required: true },
//     category: { type: String, required: true },
//     prices: [
//         {
//             price: { type: Number, required: true },
//             soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true }
//         }
//     ]
// });
const newMush=
[
    {
        "productId": 26,
        "productName": "Button Mushroom",
        "category": "Mushrooms",
        "marketPrice": 120,
        "price": 100,
        "description": "Fresh white button mushrooms, great for salads, soups, and cooking.",
        "availableUnit": "kg",
        "sellerId": ["S002", "S005"],
        "imageUrl": "https://www.pexels.com/photo/white-button-mushrooms-708489/"
    },
    {
        "productId": 27,
        "productName": "Portobello Mushroom",
        "category": "Mushrooms",
        "marketPrice": 150,
        "price": 130,
        "description": "Large, meaty portobello mushrooms, perfect for grilling and stuffing.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S006"],
        "imageUrl": "https://www.pexels.com/photo/fresh-portobello-mushrooms-3575731/"
    },
    {
        "productId": 28,
        "productName": "Shiitake Mushroom",
        "category": "Mushrooms",
        "marketPrice": 200,
        "price": 180,
        "description": "Rich and flavorful shiitake mushrooms, commonly used in Asian cuisine.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S007"],
        "imageUrl": "https://www.pexels.com/photo/dried-shiitake-mushrooms-59564/"
    },
    {
        "productId": 29,
        "productName": "Oyster Mushroom",
        "category": "Mushrooms",
        "marketPrice": 180,
        "price": 160,
        "description": "Delicate and mild oyster mushrooms, great for stir-fries and soups.",
        "availableUnit": "kg",
        "sellerId": ["S002", "S008"],
        "imageUrl": "https://www.pexels.com/photo/oyster-mushrooms-in-basket-3272481/"
    },
    {
        "productId": 30,
        "productName": "Enoki Mushroom",
        "category": "Mushrooms",
        "marketPrice": 220,
        "price": 200,
        "description": "Thin and crunchy enoki mushrooms, commonly used in Japanese and Korean dishes.",
        "availableUnit": "bunch",
        "sellerId": ["S003", "S009"],
        "imageUrl": "https://www.pexels.com/photo/enoki-mushrooms-5184084/"
    },
    {
        "productId": 31,
        "productName": "Chanterelle Mushroom",
        "category": "Mushrooms",
        "marketPrice": 350,
        "price": 320,
        "description": "Golden and aromatic chanterelle mushrooms, highly sought after for gourmet dishes.",
        "availableUnit": "kg",
        "sellerId": ["S004", "S010"],
        "imageUrl": "https://www.pexels.com/photo/chanterelle-mushrooms-3223876/"
    },
    {
        "productId": 32,
        "productName": "Morel Mushroom",
        "category": "Mushrooms",
        "marketPrice": 600,
        "price": 550,
        "description": "Rare and earthy morel mushrooms, prized for their unique texture and flavor.",
        "availableUnit": "kg",
        "sellerId": ["S005", "S011"],
        "imageUrl": "https://www.pexels.com/photo/morel-mushrooms-1234567/"
    },
    {
        "productId": 33,
        "productName": "Maitake Mushroom",
        "category": "Mushrooms",
        "marketPrice": 280,
        "price": 250,
        "description": "Fragrant and clustered maitake mushrooms, excellent for health benefits.",
        "availableUnit": "kg",
        "sellerId": ["S006", "S012"],
        "imageUrl": "https://www.pexels.com/photo/maitake-mushrooms-3567891/"
    },
    {
        "productId": 34,
        "productName": "King Oyster Mushroom",
        "category": "Mushrooms",
        "marketPrice": 250,
        "price": 220,
        "description": "Thick and meaty king oyster mushrooms, great for grilling or roasting.",
        "availableUnit": "kg",
        "sellerId": ["S007", "S013"],
        "imageUrl": "https://www.pexels.com/photo/king-oyster-mushrooms-2514884/"
    },
    {
        "productId": 35,
        "productName": "Black Truffle",
        "category": "Mushrooms",
        "marketPrice": 2500,
        "price": 2300,
        "description": "Luxurious black truffles, known for their intense aroma and deep flavor.",
        "availableUnit": "100g",
        "sellerId": ["S008", "S014"],
        "imageUrl": "https://www.pexels.com/photo/black-truffle-mushrooms-7294836/"
    }
]

const createFood = async (req, res) => {
    newMush.forEach(food => {
        const newFood = foodModel.create({
            name: food.productName,
            description: food.description,
            category: food.category,
            image: food.imageUrl,
            marketPrice: food.marketPrice,
            price: [],
        })
    })
}

export default createFood