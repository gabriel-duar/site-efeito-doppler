
const formulario = document.getElementById("dopplerForm");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Recebe os dados informados
    const vo = Number(
        document.getElementById("velObservador").value
    );

    const vs = Number(
        document.getElementById("velFonte").value
    );

    const v = Number(
        document.getElementById("velSom").value
    );

    const f = Number(
        document.getElementById("freqFonte").value
    );

    // Verifica se os valores são válidos
    if (
        !Number.isFinite(vo) ||
        !Number.isFinite(vs) ||
        !Number.isFinite(v) ||
        !Number.isFinite(f) ||
        v <= 0 ||
        f <= 0
    ) {
        mostrarErro(
            "Informe valores válidos. A velocidade do som " +
            "e a frequência devem ser maiores que zero."
        );
        return;
    }

    // Para este modelo clássico, a fonte deve estar
    // em velocidade inferior à velocidade do som.
    if (Math.abs(vs) >= v) {
        mostrarErro(
            "A velocidade da fonte deve ter módulo menor " +
            "que a velocidade do som neste modelo."
        );
        return;
    }

    // Fórmula do efeito Doppler:
    // f' = f * (v + vo) / (v - vs)
    const frequenciaPercebida =
        f * (v + vo) / (v - vs);

    if (
        !Number.isFinite(frequenciaPercebida) ||
        frequenciaPercebida <= 0
    ) {
        mostrarErro(
            "Os valores informados não produziram " +
            "uma frequência percebida física válida."
        );
        return;
    }

    const variacao = frequenciaPercebida - f;

    let interpretacao;

    if (variacao > 0.000001) {
        interpretacao =
            "A frequência percebida é maior que a frequência " +
            "emitida: ocorre aumento da frequência.";
    } else if (variacao < -0.000001) {
        interpretacao =
            "A frequência percebida é menor que a frequência " +
            "emitida: ocorre redução da frequência.";
    } else {
        interpretacao =
            "A frequência percebida é igual à frequência emitida.";
    }

    // Exibe o resultado na página
    resultado.innerHTML = `
        <h2>Resultado do cálculo</h2>

        <p>Velocidade do observador: ${vo} m/s</p>
        <p>Velocidade da fonte: ${vs} m/s</p>
        <p>Velocidade do som: ${v} m/s</p>
        <p>Frequência emitida: ${f} Hz</p>

        <p>Frequência percebida:</p>
        <p class="valor">
            ${frequenciaPercebida.toFixed(2)} Hz
        </p>

        <p>Variação de frequência: ${variacao.toFixed(2)} Hz</p>
        <p>${interpretacao}</p>
    `;
});

function mostrarErro(mensagem) {
    resultado.innerHTML = `
        <h2>Não foi possível calcular</h2>
        <p class="erro">${mensagem}</p>
    `;
}

