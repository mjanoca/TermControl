const file1 = document.querySelector("#file1");
const btnMesclar = document.querySelector("#btn-mesclar");
let totalDeArquivosCarregados = null;
const objPendentes = [];

carregarArquivos();

btnMesclar.addEventListener("click", mesclar());

 function mesclar() {
   file1.addEventListener("change", (e) => {
    for (let i = 0; i <= totalDeArquivosCarregados - 1; i++) {
      let file = e.target.files[i];
      if (file) {
        let reader = new FileReader();
         reader.addEventListener("load", (e) => {
          let result = e.target.result;
          //console.log(typeof(result))
          console.log(...result.match(/.{11}BR.{13}/gi));
          let string = `${result.match(/.{11}BR.{13}/gi)}`;
          console.log(...string.split(" "))
          //objPendentes.push(...result.match(/.{11}BR.{13}/gi));
        });
        reader.readAsText(file);
      }
    }
  });
}

function carregarArquivos() {
  file1.addEventListener("change", (e) => {
    const selectFiles = e.target.files.length;
    totalDeArquivosCarregados = Number(selectFiles);
  });
}
