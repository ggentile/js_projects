class CPF{

    index = 0;
    cpf = [];
    arrayDoCpf = [];
    arrayCalculo = [];
    
    constructor(cpf){
        this.cpf = cpf;
    }

    ajustaCpf() {
        this.cpf = this.cpf.replaceAll('.', '');
        if(this.cpf.includes('-')){
        this.cpf = this.cpf.replaceAll('-', '');
        }
        this.preenche_array(this.cpf);
        return this.arrayDoCpf;
    }

    preenche_array(cpf){
        for(const values of cpf){
            this.arrayDoCpf.push(parseInt(values));
        }
    }

    validaPrimeiroDig(array){
        const cpfDig =  [10, 9, 8, 7, 6, 5, 4, 3, 2];

        do {
            let num = cpfDig[this.index];
        
            let CalculoCpf = array[this.index];
        
            let res = num * CalculoCpf;
            this.arrayCalculo.push(res);
        
            this.index += 1;
        
        
        } while (this.index <= (array.length -1));

        const resultado = this.fazCalculoDig(this.arrayCalculo);
        this.validaSegundoDig(this.arrayDoCpf);
    }

    validaSegundoDig(array){
        const cpfDig = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

        this.index = 0;
        this.arrayCalculo = [];

        do {
            let num = cpfDig[this.index];
        
            let CalculoCpf = array[this.index];
        
            let res = num * CalculoCpf;
            this.arrayCalculo.push(res);
        
            this.index += 1;
        
        
        } while (this.index <= (array.length -1));

        const resultado = this.fazCalculoDig(this.arrayCalculo);
        this.arrayDoCpf.push(resultado);

    }


    fazCalculoDig(array) {
        if(array.length <= 10) {
            const valorTotal = array.reduce((acumulador, valor) =>  acumulador + valor);
            let primeiroDigito = 11 - (valorTotal % 11);
            if(primeiroDigito > 9){
                primeiroDigito = 0;
            }

            this.arrayDoCpf.push(primeiroDigito);
        }
    }

    juntaCpf(array){
        const string;
        return string.join(array, '');
    }
}


const cpfDeEntrada = new CPF("705.484.450-52");
const cpfTratado = cpfDeEntrada.ajustaCpf();
const JuntaTudo1 = cpfDeEntrada.juntaCpf(cpfTratado);

const validador = new CPF("705.484.450");
const test = validador.ajustaCpf();
validador.validaPrimeiroDig(test);
const JuntaTudo2 = validador.ajustaCpf(test);


