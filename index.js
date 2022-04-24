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
    console.log(`Rodando na porta ${port}`)
})

let pokedex = [
    {   id: 1,
        numero: '001',
        tipo:  'Grama/Venenoso',
        nome:  'Bulbasaur',
        imagem: '/css/001.png',
        descricao: 'Em suas costas há um bulbo que é cultivado a partir de uma semente plantada no seu nascimento. O bulbo também esconde duas videiras delgadas e semelhantes a tentáculos e fornece energia através da fotossíntese.',
        altura: '0,7 m',
        peso: '6,9 kg',
        categoria: 'Semente',
        habilidade: 'Supercrescimento'
    },
    {
        id: 2,
        numero: '025',
        tipo:  'Elétrico',
        nome:  'Pikachu',
        imagem: '/css/025.png',
        descricao: 'Tem a capacidade de gerar eletricidade através de suas bolsas elétricas localizadas em suas bochechas.',
        altura: '0,4 m',
        peso: '6 kg',
        categoria: 'Rato',
        habilidade: 'Estática'
    },
    {   id: 3,
        numero: '175',
        tipo:  'Fada',
        nome:  'Togepi',
        imagem: '/css/175.png',
        descricao: 'É repleto de energia positiva, se for tratado com bondade, trará boa sorte ao seu treinador. É considerado como símbolo de boa sorte',
        altura: '0,3 m',
        peso: '1,5 kg',
        categoria: 'Bola de Espinho',
        habilidade: 'Empurrão e Graça Serena'
    }
]


app.get('/', (req, res) => {
res.render('index.ejs', {pokedex})
})

app.get('/detalhes/:id', (req, res) => {
const id = +req.params.id;
const pokemon = pokedex.find(pokemon => pokemon.id === id);

res.render("detalhes", {pokemon});
console.log(pokemon)
    })

app.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs')
})
app.post('/cadastro', (req, res) => {
    let i = pokedex[pokedex.length-1].id + 1
    const { numero, tipo, nome, imagem, descrição, altura, peso, categoria, habilidade } = req.body
    pokedex.push({id: i, numero, tipo, nome, imagem, descrição, altura, peso, categoria, habilidade})
    console.log(pokedex)
    res.redirect('/')
})
