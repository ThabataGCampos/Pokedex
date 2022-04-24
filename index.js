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
    {   numero: '001',
        tipo:  'Grama/Venenoso',
        nome:  'Bulbasaur',
        imagem: '/css/001.png',
        descrição: 'Em suas costas há um bulbo que é cultivado a partir de uma semente plantada no seu nascimento. O bulbo também esconde duas videiras delgadas e semelhantes a tentáculos e fornece energia através da fotossíntese.',
        altura: '0,7 m',
        peso: '6,9 kg',
        categoria: 'Semente',
        habilidade: 'Supercrescimento'
    },
    {
        numero: '025',
        tipo:  'Elétrico',
        nome:  'Pikachu',
        imagem: '/css/025.png',
        descrição: 'Tem a capacidade de gerar eletricidade através de suas bolsas elétricas localizadas em suas bochechas.',
        altura: '0,4 m',
        peso: '6 kg',
        categoria: 'Rato',
        habilidade: 'Estática'
    },
    {
        numero: '175',
        tipo:  'Fada',
        nome:  'Togepi',
        imagem: '/css/175.png',
        descrição: 'É repleto de energia positiva, se for tratado com bondade, trará boa sorte ao seu treinador. É considerado como símbolo de boa sorte',
        altura: '0,3 m',
        peso: '1,5 kg',
        categoria: 'Bola de Espinho',
        habilidade: 'Empurrão e Graça Serena'
    }
]


app.get('/', (req, res) => {
res.render('index.ejs', {pokedex})
})

app.get('/detalhes/:numero', (req, res) => {
    let pokemon=[];
    pokedex.filter((element)=>{
        if(element.numero==req.params.numero){
            pokemon[0]=element
        }
    });
    res.render('detalhes.ejs',{
        pokemon
    });
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs');
});
    
app.post('/cadastro/add', (req, res) => {
    const data = req.body;
    pokedex.push(data);
    res.redirect('/');
});