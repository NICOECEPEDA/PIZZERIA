const products = [
    {
      id: 1,
      name: "La Mr. Pit",
      desc: "Solo para expertos",
      price: 350,
      category: "pizzas",
      img: "assets/La Mr. Pit.png",
    },
    {
      id: 2,
      name: "¡Q'Jamone!",
      desc: "c/jamon crudo",
      price: 350,
      category: "pizzas",
      img: "assets/¡Q’ Jamone!.png",
    },
    {
      id: 3,
      name: "La Charly Garcia",
      desc: "BASTA",
      price: 380,
      category: "pizzas",
      img: "assets/La Charly García.png",
    },
    {
      id: 4, 
      name: "La Maradona",
      desc: "¡Eterna!",
      price: 450,
      category: "pizzas",
      img: "assets/La Maradona.png",
      
    },
    {
      id: 5,
      name: "Picantovich",
      desc: "Pica 2 veces",
      price: 750,
      category: "pizzas",
      img: "assets/Picantovich.png",
    },
    {
      id: 6,
      name: "La Hasbulla",
      desc: "En honor al 1",
      price: 990,
      category: "pizzas",
      img: "assets/La Hasbulla.png",
    },
    {
      id: 7,
      name: "Leo Messi",
      desc: "¡De pie señores!",
      price: 10,
      category: "pizzas",
      img: "assets/Leo Messi.png",
    },
    {
      id: 8,
      name: "Nick Gi",
      desc: "La que desaparece",
      price: "Gratis",
      category: "pizzas",
      recommended: true,
      img: "assets/Nick Gi.png",
    },
    {
      id: 9,
      name: "Americana",
      desc: "Sentite Yankiee",
      price: 400,
      category: "burgers",
      img: "assets/americana.jpeg",
    },
    {
      id: 10,
      name: "BOOM",
      desc: "¡Explota los sabores!",
      price: 500,
      category: "burgers",
      recommended: true,
      img: "assets/boom.jpeg",
    },
    {
      id: 11,
      name: "De la casa",
      desc: "Un halago",
      price: 400,
      category: "burgers",
      img: "assets/delacasa.jpeg",
    },
    {
      id: 12,
      name: "TapaArterias",
      desc: "Para tres",
      price: 600,
      category: "burgers",
      img: "assets/tapaarterias.jpeg",
    },
    {
      id: 13,
      name: "Cara de papa",
      desc: "Terrible",
      price: 600,
      category: "papas",
      img: "assets/caradepapa.jpeg",
    },
    {
      id: 14,
      name: "Metele Huevos",
      desc: "Como en la vida",
      price: 700,
      category: "papas",
      recommended: true,
      img: "assets/metelehuevos.jpg",
    },
    {
      id: 15,
      name: "Que Peregil",
      desc: "¡Probala, no seas gil!",
      price: 700,
      category: "papas",
      img: "assets/queperegil.jpeg",
    },
    {
      id: 16,
      name: "Que sabores",
      desc: "Al mejor estilo",
      price: 690,
      category: "papas",
      img: "assets/quesabor.jpg",
    },
  
  
  
    {
      id: 18,
      name: "NARANJA",
      desc: "Natural con especies",
      price: 500,
      category: "batidos",
      img: "assets/naranja.jpeg",
    },
    {
      id: 19,
      name: "CHOCOLATE",
      desc: "Nada que aclarar",
      price: 500,
      category: "batidos",
      img: "assets/chocolate.jpeg",
    },
    {
      id: 20,
      name: "Banana",
      desc: "Inspirados en Minions",
      price: 500,
      category: "batidos",
      img: "assets/banana.jpeg",
    },
    {
      id: 21,
      name: "Griego",
      desc: "Fresa y Yogurt",
      price: 500,
      category: "batidos",
      img: "assets/batido-de-frambuesa-y-yogur.jpg",
    },
  ];
  
  const mostPopularProducts = () => {
    const popularProducts = [];
    for (let i = 0; i < 16; i++) {
      if (i % 2 == 0) {
        popularProducts.push(products[i]);
      }
    }
    return popularProducts;
  };