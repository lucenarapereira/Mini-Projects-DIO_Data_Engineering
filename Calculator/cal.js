const valEl = document.getElementById("val");
const resEl = document.getElementById("res");

function clearer() {
    valEl.innerText = "";
    resEl.innerText = "";
}

function adder(k) {
    valEl.innerText += k;
    if (['*', '+', '-', '/'].includes(k)) {
        compute(0);
    }
}

function compute(is) {
    const temp = valEl.innerText;
    const lastChar = temp[temp.length - 1];

    // Encontra o primeiro operador
    const operatorIndex = [...temp].findIndex((char, index) => 
        ['*', '+', '-', '/'].includes(char) && index !== 0
    );

    if (operatorIndex !== -1) {
        const part1 = parseFloat(temp.substring(0, operatorIndex));
        const part2 = parseFloat(temp.substring(operatorIndex + 1));
        const operator = temp[operatorIndex];

        let result;
        switch (operator) {
            case '+':
                result = part1 + part2;
                break;
            case '-':
                result = part1 - part2;
                break;
            case '*':
                result = part1 * part2;
                break;
            case '/':
                // Verifica divisão por zero
                if (part2 === 0) {
                    resEl.innerText = "Erro: Divisão por zero";
                    return;
                }
                result = part1 / part2;
                break;
            default:
                return;
        }

        resEl.innerText = '= ' + result;

        if (!is) {
            valEl.innerText = resEl.innerText + lastChar;
            if (valEl.innerText[0] === '=') {
                valEl.innerText = valEl.innerText.substring(1);
            }
        }
    }
}
