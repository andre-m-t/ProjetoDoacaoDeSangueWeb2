from Model.Classes import Doador
from DAO import doadorCRUD

if __name__ == "__main__":
    # testes do banco
    hst = "localhost"
    dB = "doacaoSangue"
    usr = "postgres"
    pwd = "senhadobanco"

    con = doadorCRUD.Conexao(hst,dB,usr,pwd)
    # Exemplos de doadores
    doador1 = Doador(
        codigo=1,
        nome="Maria Silva",
        cpf="123.456.789-10",
        contato="(31) 98765-4321",
        tipoSanguineo="A",
        tipoRh="+",
        tipoRhCorreto=True
    )

    doador2 = Doador(
        codigo=None,
        nome="a",
        cpf="",
        contato="",
        tipoSanguineo="",
        tipoRh="",
        tipoRhCorreto=False
    )

    doador3 = Doador(
        codigo=4,
        nome="Pedro Santos",
        cpf="456.789.123-20",
        contato="(21) 98765-4321",
        tipoSanguineo="O",
        tipoRh="+",
        tipoRhCorreto=False
    )

    values = [1, 3, 5, 2, 7]
    print(values[0])