const file1 = document.querySelector("#file1");
const btnMesclar = document.querySelector("#btn-mesclar");
let totalDeArquivosCarregados = null;

carregarArquivos();

btnMesclar.addEventListener("click", mesclar());

async function mesclar() {
  await file1.addEventListener("change", (e) => {
    for (let i = 0; i <= totalDeArquivosCarregados - 1; i++) {
      let file = e.target.files[i];
      if (file) {
        let reader = new FileReader();
        reader.addEventListener("load", (e) => {
          let result = e.target.result;
          console.log(...result.match(/.{11}BR/g));
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
