let datos = [];
const tabla = document.getElementById("tabla");
const init = document.getElementById("init");

function calculadora() {
    const sexo = document.querySelector("input[name='sexo']:checked").value;
    const edad = document.querySelector("#edad").value;
    const peso = document.querySelector("#peso").value;
    const altura = document.querySelector("#altura").value;
    let resultadoMsg = "";

    const resultadoIMC = ((peso / Math.pow(altura, 2)) * 10000).toFixed(2);
    document.getElementById("resultad").innerHTML = resultadoIMC;
    

    if (resultadoIMC < 18.50) {
        resultadoMsg = "Por debajo del peso";
    } else {
        if (resultadoIMC >= 18.50 && resultadoIMC <= 24.9) {
            resultadoMsg = "Peso saludable.";
            
        } else {
            if (resultadoIMC > 24.9 && resultadoIMC <= 29.9) {
                resultadoMsg = "Sobrepeso";
            } else {
                if (resultadoIMC > 29.9 && resultadoIMC <= 39.9) {
                    resultadoMsg = "Obesidad";
                } else {
                    resultadoMsg = "Obesidad extrema o de alto riesgo.";
                }
            }

        }
    }
    document.getElementById("nota").innerHTML = resultadoMsg;

    console.log(sexo, edad, peso, altura, resultadoIMC, resultadoMsg);
    agregarDatas(sexo, edad, peso, altura, resultadoIMC, resultadoMsg);
    guardarDatos();
}

const agregarDatas = (sexo, edad, peso, altura, resultadoIMC, resultadoMsg) => {
    let registro = {
        sexo: sexo,
        edad: edad,
        peso: peso,
        altura: altura,
        resultadoIMC: resultadoIMC,
        resultadoMsg: resultadoMsg
    }
    datos.push(registro)
    console.log(datos)
}
const guardarDatos = () => {
    localStorage.setItem('usuari', JSON.stringify(datos))
    listarDatos();
}
const listarDatos = () => {
    tabla.innerHTML = " ";
    datos = JSON.parse(localStorage.getItem("usuari"))
    datos.forEach(element => {
        const { sexo, edad, peso, altura, resultadoIMC, resultadoMsg } = element
        tabla.innerHTML += `
        <tr>
            <td>${sexo}</td>
            <td>${edad}</td>
            <td>${peso}</td>
            <td>${altura}</td>
            <td>${resultadoIMC}</td>
            <td>${resultadoMsg}</td>
        </tr>
        `
    })
}

const url='http://localhost:3004/corporal';
document.addEventListener('DOMContentLoaded', () => {
    mostrar(url)
})

const mostrar = async (url) => {
    const rest = await fetch (url);
    const data = await rest.json();
    console.log(data);
    init.innerHTML = " ";
    
    data.forEach(element =>{
        const {sex, eda, pes, altur, resultadoIM, resultadoMG} = element
        init.innerHTML += `
        <tr>
            <td>${sex}</td>
            <td>${eda}</td>
            <td>${pes}</td>
            <td>${altur}</td>
            <td>${resultadoIM}</td>
            <td>${resultadoMG}</td>
        </tr>
        `
    });
}
