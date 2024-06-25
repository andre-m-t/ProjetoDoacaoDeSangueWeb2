import psycopg2
from Model.Classes import Doacao, Doador

class Conexao:
    _db = None
    _rs = []
    # abre conexão com o banco
    def __init__(self, hst, db, usr, pwd) -> None:
        try:
            self._db = psycopg2.connect(host= hst, database= db, user= usr, password= pwd)
            print("Conexão bem sucedida![Doacao]")
        except Exception as e:
            print("Falha na conexão...[Doacao]",e)       
    # fecha conexão com o banco
    def fechar_conexao(self) -> None:
        try:
            self._db.close()
            print("Conexão encerrada com sucesso![Doacao]")
        except Exception as e:
            print("Falha ao executar comando..[Doacao]",e)
    # insere nova doacao no banco
    def nova_doacao(self, novo :Doacao) -> str:
        # LEMBRAR QUE TINHA UMA CAGADA NA TABELA DOACAO -> CODIGO_DOADOR TA DEFINIDO COMO PK
        insert_query = "INSERT INTO Doacao(data, hora, volume, situacao, codigo_doador) VALUES(%s, %s, %s, %s, %s)"
        values = (novo.data, novo.hora, novo.volume, "ATIVO", novo.codigo_doador)
        try:
            cur = self._db.cursor()
            cur.execute(insert_query, values)
            self._db.commit()
            cur.close()
            return "Nova doacao realizada!"         
        except Exception as e:
            print("Erro na inserção[Doacao]",e)
            return "Problema na inserção..."
        
    # Busca por doador
    def pesquisar_doacao_por_doador(self, doador:Doador)->list[Doacao]:
        self._rs = []
        rs = None
        query = "SELECT * FROM Doacao WHERE codigo_doador = %s "
        # ordenando por codigo para facilitar
        query += "ORDER BY codigo"
        # execução da query no banco
        try:
            cur = self._db.cursor()
            cur.execute(query, str(doador.codigo))
            rs = cur.fetchall()
            cur.close()
            # tratando dados coletados
            for row in rs:
                self._rs.append(toEntity(*row).get_doacao())
            return self._rs
        # exceção
        except Exception as e:
            print("Problema na pesquisa de doacoes...", e)
            return None
        
    # Busca geral
    def pesquisar_doacoes(self)->list[Doacao]:
        self._rs = []
        rs = None
        query = "SELECT * FROM Doacao WHERE situacao = 'ATIVO' "
        # ordenando por codigo para facilitar
        query += "ORDER BY codigo_doador"
        # execução da query no banco
        try:
            cur = self._db.cursor()
            cur.execute(query)
            rs = cur.fetchall()
            cur.close()
            # tratando dados coletados
            for row in rs:
                self._rs.append(toEntity(*row).get_doacao())
            return self._rs
        # exceção
        except Exception as e:
            print("Problema na pesquisa de doacoes...", e)
            return None

    # faz uma busca do maior codigo
    def buscar_maior_codigo(self)->int:
        rs = None
        self._rs = []
        sql = "SELECT MAX(codigo) FROM Doacao"
        try:
            cur = self._db.cursor()
            cur.execute(sql)
            rs = cur.fetchall()
            cur.close()
        except Exception as e:
            print(e)
            return None
        # tratando os dados
        if rs:
            return rs[0][0]
        else:
            return None
        

# classe para facilitar a leitura retornada do banco
class toEntity():
    def __init__(self,codigo,data,hora,volume,situacao,codigo_doador) -> None:
        self.codigo = codigo
        self.data = data
        self.hora = hora
        self.volume = volume
        self.situacao = situacao
        self.codigo_doador = codigo_doador

    def get_doacao(self):
        return Doacao(
            codigo=self.codigo,
            data=str(self.codigo_doador),
            hora=str(self.hora),
            volume=self.volume,
            codigo_doador=self.codigo_doador
        )