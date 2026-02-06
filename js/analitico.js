const file1 = document.querySelector("#file1");
const btnMesclar = document.querySelector("#btn-mesclar");
let totalDeArquivosCarregados = null;
const objPendentes = [];

carregarArquivos();

btnMesclar.addEventListener("click", mesclar1()); 

/*
Faz a leitura dos arquivos selecionados em um input e varre as informações a procura dos objetos e seus vencimentos populando o array objPendentes com os resultados
encontrados.
*/
function mesclar() {
   file1.addEventListener("change", (e) => {
    for (let i = 0; i <= totalDeArquivosCarregados - 1; i++) {
      let file = e.target.files[i];
      if (file) {
        let reader = new FileReader();
         reader.addEventListener("load", (e) => {
          let result = e.target.result
          objPendentes.push(criarObjeto(result));
          console.log(objPendentes)
        });
        reader.readAsText(file);
      }
    }
  });
}

async function mesclar1(){
  const result = await fetch("arq.csv")
  const dados = await result.text()
  for (let item of dados){
    console.log(item)
    criarObjeto(item)
  }
}


function criarObjeto(result){
  return {
    "codigo": result.match(/.{11}BR/gi),
    "vcto":result.match(/.{6}2026/gi)
  }
}

function carregarArquivos() {
  file1.addEventListener("change", (e) => {
    const selectFiles = e.target.files.length;
    totalDeArquivosCarregados = Number(selectFiles);
  });
}
