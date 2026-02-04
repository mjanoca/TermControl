/*
Ferramenta auxiliar para a procura de objetos com o prazo de entrega para o dia atual
@mayconjanoca
*/
const btn_input = document.querySelector('#btn-cadastrar');
const texto_texto = document.querySelector(".task");
const ultimo_objeto_lido = document.querySelector(".ultimo-objeto-lido h1")
const obj_lidos = new Set();
const objetosNasMesas = [];
let objetos = [];

carregar();

btn_input.addEventListener('click', (e)=>{
    e.preventDefault();
    const objeto = texto_texto.value;
    if (objeto ==="recuperar"){
        recuperarNoLocalStorage();
        limparInput();
    }else{
        verificarObjeto(objeto)
    }
    }
)
/*
Função: Verificar se o objeto lido pelo usuário se encontra no array de objetos vencidos
Alvo: array objetos
*/
function verificarObjeto(objeto){
    ultimo_objeto_lido.innerText = objeto
    if(!objeto) return

    if(objetos.includes(objeto)){
        document.body.style.backgroundColor = 'red' ;
        console.log("Vencendo hoje");     
    }else{
        document.body.style.backgroundColor = 'darkolivegreen';
        console.log('Fora do vencimento'); 
    }
    objetosLidos(objeto);
    limparInput()
}

/*
Função: Limpar campos de entrada de dados após a leitura
Alvo: texto_texto.value
*/
function limparInput(){
    texto_texto.value=""
}

/*
Função: Popular o alvo com os objetos lidos pelo usuário
Alvo: objetos_lidos
*/
function objetosLidos(objeto){
    obj_lidos.add(objeto)
    salvarNoLocalStorage(obj_lidos)
}

/*
Função: Armazenar os objetos lidos em localStorage para posterior busca de dados
Alvo: objt_lidos
*/
function salvarNoLocalStorage(objetos){
    const objetosNasMesas = Array.from(objetos);
    localStorage.setItem("objetosNasMesas", JSON.stringify(objetosNasMesas))
}

/*
Função: Recuperar obejtos do localStorage
Alvo: objt_lidos
*/
async function recuperarNoLocalStorage(){
    const objetos = await JSON.parse(localStorage.getItem('objetosNasMesas'));
    for(let item of objetos){
        objetosNasMesas.push(item)
    }
}


/*
Função: Inserir as informações dos objetos com vencimento no dia através do carregamento do arquivo .csv
        fornecido pelo SROWeb.
Alvo: Upload arquivo.
*/
function carregar(){
    const inputReader = document.querySelector("#file");
    inputReader.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log("arquivo selecionado.")
    
        if(file){
            const reader = new FileReader();
            reader.addEventListener('load', (e)=>{
                console.log('arquivo carregado.')
                const result = e.target.result;
                objetos = result.match(/.{11}BR/g);
                console.log(result);
            }) 
            reader.readAsText(file);
        }
    });
}