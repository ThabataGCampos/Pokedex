import express from "express";
const app = express();
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true})) 
app.use(express.json()) 

const port = 3003

app.listen(port, () => {
    console.clear();
    console.log(`Rodando na porta http://localhost:${port}`);
})

let pokedex = [
    {   id: 1,
        number: '001',
        type:  'Grass/Poison',
        name:  'Bulbasaur',
        image: '/css/001.png',
        description: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
        heighy: '0,7 m',
        weighy: '6,9 kg',
        category: 'Seed',
        abilities: 'Overgrow'
    },
    {   id: 2,
        number: '025',
        type:  'Eletric',
        name:  'Pikachu',
        image: '/css/025.png',
        description: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
        heighy: '0,4 m',
        weighy: '6 kg',
        category: 'Mouse',
        abilities: 'Static'
    },
    {   id: 3,
        number: '175',
        type:  'Fairy',
        name:  'Togepi',
        image: '/css/175.png',
        description: 'The shell seems to be filled with joy. It is said that it will share good luck when treated kindly.',
        heighy: '0,3 m',
        weighy: '1,5 kg',
        category: 'Spike Ball',
        abilities: 'Serene Grace/Hustle'
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
    const {number, type, name, image, description, heighy, weighy, category, abilities} = req.body
    let pokemon={id: i, number, type, name, image, description, heighy, weighy, category, abilities}
    pokedex.push(pokemon)
    res.redirect('/')

})