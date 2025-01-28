const organicFarmingProducts = [
    {
        "productId": 1,
        "productName": "Tomatoes",
        "category": "Vegetables",
        "price": 80,
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
        "description": "Crisp and sweet apples, perfect for snacking.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S007"],
        "imageUrl": "https://www.pexels.com/photo/assorted-apples-on-white-ceramic-plate-104147/"
    },
    {
        "productId": 7,
        "productName": "Bananas",
        "category": "Fruits",
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
        "description": "Juicy and sweet pineapples, perfect for tropical flavor.",
        "availableUnit": "kg",
        "sellerId": ["S005", "S010"],
        "imageUrl": "https://www.pexels.com/photo/sliced-pineapples-1466742/"
    },
    {
        "productId": 10,
        "productName": "Strawberries",
        "category": "Fruits",
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
        "description": "Fresh and creamy butter for baking and cooking.",
        "availableUnit": "kg",
        "sellerId": ["S007", "S008"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-cream-butter-1634107/"
    },
    {
        "productId": 15,
        "productName": "Cottage Cheese",
        "category": "Dairy Products",
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
        "description": "Organic chickpeas, great for making hummus.",
        "availableUnit": "kg",
        "sellerId": ["S003", "S005"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-chickpeas-3852222/"
    },
    {
        "productId": 19,
        "productName": "Lentils",
        "category": "Cereals and Pulses",
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
        "price": 350,
        "description": "Roasted almonds, a healthy snack full of protein.",
        "availableUnit": "kg",
        "sellerId": ["S001", "S002"],
        "imageUrl": "https://www.pexels.com/photo/photo-of-almonds-1412041/"
    },
    {
        "productId": 22,
        "productName": "Cashews",
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
        "description": "Fresh and sweet dates, great for energy.",
        "availableUnit": "kg",
        "sellerId": ["S009", "S010"],
        "imageUrl": "https://www.pexels.com/photo/dates-in-wooden-bowl-1750934/"
    },
    {
        "productId": 25,
        "productName": "Basil",
        "category": "Herbs",
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
        "description": "Fresh mint leaves, great for teas and recipes.",
        "availableUnit": "bunch",
        "sellerId": ["S003", "S005"],
        "imageUrl": "https://www.pexels.com/photo/fresh-mint-leaves-1062400/"
    },
    {
        "productId": 27,
        "productName": "Green Tea",
        "category": "Beverages",
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
        "price": 300,
        "description": "Premium roasted coffee beans for the perfect brew.",
        "availableUnit": "kg",
        "sellerId": ["S007", "S008"],
        "imageUrl": "https://www.pexels.com/photo/coffee-beans-3046244/"
    }
]
export default organicFarmingProducts;