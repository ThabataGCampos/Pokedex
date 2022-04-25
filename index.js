import express from "express";
const app = express();
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true})) 
app.use(express.json()) 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server in http://localhost:${PORT}`));

let pokedex = [
    {   id: 1,
        number: '001',
        type:  'Grass/Poison',
        name:  'Bulbasaur',
        image: '/css/001.png',
        description: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
        height: '0,7 m',
        weight: '6,9 kg',
        category: 'Seed',
        abilities: 'Overgrow'
    },
    {   id: 2,
        number: '025',
        type:  'Eletric',
        name:  'Pikachu',
        image: '/css/025.png',
        description: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
        height: '0,4 m',
        weight: '6 kg',
        category: 'Mouse',
        abilities: 'Static'
    },
    {   id: 3,
        number: '175',
        type:  'Fairy',
        name:  'Togepi',
        image: '/css/175.png',
        description: 'The shell seems to be filled with joy. It is said that it will share good luck when treated kindly.',
        height: '0,3 m',
        weight: '1,5 kg',
        category: 'Spike Ball',
        abilities: 'Serene Grace/Hustle'
    },
    {   id: 4,
        number: '133',
        type:  'Normal',
        name:  'Eevee',
        image: '/css/133.png',
        description: 'It has the ability to alter the composition of its body to suit its surrounding environment.',
        height: '0.3 m',
        weight: '6,5 kg',
        category: 'Evolution',
        abilities: 'Run Away/Adaptability'
    },
    {   id: 5,
        number: '152',
        type:  'Grass',
        name:  'Chikorita',
        image: '/css/152.png',
        description: 'In battle, Chikorita waves its leaf around to keep the foe at bay. However, a sweet fragrance also wafts from the leaf, becalming the battling Pokémon and creating a cozy, friendly atmosphere all around.',
        height: '0,9 m',
        weight: '6,4 kg',
        category: 'Leaf',
        abilities: 'Overgrow'
    },
    {   id: 6,
        number: '700',
        type:  'Fairy',
        name:  'Sylveon',
        image: '/css/700.png',
        description: 'By releasing enmity-erasing waves from its ribbonlike feelers, Sylveon stops any conflict.',
        height: '1,0 m',
        weight: '23,5 kg',
        category: 'Intertwining',
        abilities: 'Cute Charm'
    },
]

app.get('/', (req, res) => { 
    res.render('index.ejs', {
        pokedex
    })
})

app.get('/detalhes/:id', (req, res) => {
    const id = +req.params.id;
    const pokemon = pokedex.find(pokemon => pokemon.id === id);

res.render("detalhes", {pokemon});
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs')
})
app.post('/cadastro', (req, res) => {
    let i = pokedex.length+1
    const {number, type, name, image, description, height, weight, category, abilities} = req.body
    let pokemon={id: i, number, type, name, image, description, height, weight, category, abilities}
    pokedex.push(pokemon)
    res.redirect('/')

})