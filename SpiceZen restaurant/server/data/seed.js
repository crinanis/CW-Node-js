const MongoClient = require("mongodb").MongoClient;
const Dish = require('../models/dishModel.js')

async function main() {
    const uri = "mongodb://127.0.0.1://27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const dishesCollection = client.db("SpiceZen").collection("dishes");
        //await dishesCollection.dropIndex("dishName_1")
        await dishesCollection.createIndex({"dishName" : 1}, {"unique" : true})


        // const dish = new Dish({
        //     dishName: "Рамэн вегетарианский с сыром Тофу",
        //     dishType: "Вег",
        //     dishCategory: "Лапша",
        //     dishPrice: 13.90,
        //     dishWeight: 420,
        //     dishDescription: "Овощной бульон, пшеничная лапша, соевый сыр Тофу, морковь, спаржа, томаты черри, такуан, салат Ромен, лук-порей.",
        //     dishImage: "https://localhost:5000/static/рамэн/вег с сыром тофу.png"
        // });

        let dishes = [
            // {
            //     dishName: "Рамэн вегетарианский с сыром Тофу",
            //     dishType: {
            //         "$ref" : "types", "$id":"646124588126a6c95fab089d"
            //     },
            //     dishCategory: {
            //         "$ref" : "categories", "$id":"646124588126a6c95fab089a"
            //     },
            //     dishPrice: 13.90,
            //     dishWeight: 420,
            //     dishDescription: "Овощной бульон, пшеничная лапша, соевый сыр Тофу, морковь, спаржа, томаты черри, такуан, салат Ромен, лук-порей.",
            //     dishImage: "http://localhost:5000/static/рамэн/вег с сыром тофу.png"
            // },

            // {
            //     dishName: "Удон вегитарианский",
            //     dishType: {
            //         name: "Вег",
            //         _id: "646124588126a6c95fab089d",
            //     },
            //     dishCategory: {
            //
            //         name:"Лапша",
            //         _id:"646124588126a6c95fab089a"
            //     },
            //     dishPrice: 13.90,
            //     dishWeight: 280,
            //     dishDescription: "Удон в кисло-сладком соусе, пекинская капуста, морковь, спаржевая фасоль, сладкий перец, ананас, такуан, лук-порей, кунжут, орехи кешью.",
            //     dishImage: "http://localhost:5000/static/лапша/УдонВег.png"
            // },
            // {
            //     dishName: "Фунчоза с говядиной",
            //     dishType: _.nth(types, 0),
            //     dishCategory: _.nth(categories, 0),
            //     dishPrice: [13.90, 17.90],
            //     dishWeight: [280, 420],
            //     dishDescription: "Стеклянная лапша в соусе Карри, ростбиф, пекинская капуста, морковь, спаржевая фасоль, сладкий перец, такуан, яйцо, лук-порей, арахис. Острое.",
            //     dishImage: "http://localhost:5000/static/лапша/фунчоза с говядиной.png"
            // },
            // {
            //     dishName: "Фунчоза с морепродуктами",
            //     dishType: _.nth(types, 0),
            //     dishCategory: _.nth(categories, 0),
            //     dishPrice: [13.90, 17.90],
            //     dishWeight: [280, 420],
            //     dishDescription: "Стеклянная лапша в соусе Жгучий Хакусан, кольца кальмара, осьминоги, пекинская капуста, морковь, спаржевая фасоль, сладкий перец, грибы шиитаке, яйцо, лайм, лук-порей, стружка тунца.",
            //     dishImage: "http://localhost:5000/static/лапша/фунчоза с морепродуктами.png"
            // },
            // {
            //     dishName: "Фунчоза с тигровыми креветками",
            //     dishType: _.nth(types, 0),
            //     dishCategory: _.nth(categories, 0),
            //     dishPrice: [13.90, 17.90],
            //     dishWeight: [280, 420],
            //     dishDescription: "Стеклянная лапша в кисло-сладком соусе, креветка, пекинская капуста, морковь, спаржевая фасоль, сладкий перец, ананас, яйцо, кунжут, лук-порей, арахис.",
            //     dishImage: "http://localhost:5000/static/лапша/фунчоза с тигровыми креветками.png"
            // },
            // {
            //     dishName: "Фунчоза с цыплёнком-гриль",
            //     dishType: _.nth(types, 0),
            //     dishCategory: _.nth(categories, 0),
            //     dishPrice: [13.90, 17.90],
            //     dishWeight: [280, 420],
            //     dishDescription: "Стеклянная лапша в пекинском соусе, цыпленок-гриль, пекинская капуста, морковь, спаржевая фасоль, сладкий перец, яйцо, лук-порей, кунжут. Острое.",
            //     dishImage: "http://localhost:5000/static/лапша/фунчоза с цыплёнком гриль остр.png"
            // },
            // {
            //     dishName: "Якисоба с тремя видами грибов",
            //     dishType: _.nth(types, 0),
            //     dishCategory: _.nth(categories, 0),
            //     dishPrice: [13.90, 17.90],
            //     dishWeight: [280, 420],
            //     dishDescription: "Пшеничная лапша в соусе Яки, пекинская капуста, морковь, спаржевая фасоль, сладкий перец, шампиньоны, древесные грибы, грибы шиитаке, ростки сои, лук-порей, орехи кешью.",
            //     dishImage: "http://localhost:5000/static/лапша/якисоба с тремя видами грибов.png"
            // }
        ]

       // await dishesCollection.insertOne(dish);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();