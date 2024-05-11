import psycopg2
from Model.Classes import Doador
from pydantic import BaseModel


class Conexao:
    _db = None
    _rs = []
    # abre conexão com o banco
    def __init__(self, hst, db, usr, pwd) -> None:
        try:
            self._db = psycopg2.connect(host= hst, database= db, user= usr, password= pwd)
            print("Conexão bem sucedida![Doador]")
        except Exception as e:
            print("Falha na conexão...[Doador]",e)       
    # fecha conexão com o banco
    def fechar_conexao(self) -> None:
        try:
            self._db.close()
            print("Conexão encerrada com sucesso![Doador]")
        except Exception as e:
            print("Falha ao executar comando..[Doador]",e)
    # busca usuario por codigo
    def buscar_por_codigo(self, codigo) -> list[Doador]:
            rs = None
            self._rs = []
            sql = "SELECT * FROM Doador WHERE codigo = "+str(codigo)
            try:
                cur = self._db.cursor()
                cur.execute(sql)
                rs = cur.fetchall()
                cur.close()
            except Exception as e:
                print(e)
                return None
            if rs:
                for row in rs:
                    novo = toEntity(*row)
                    self._rs.append(novo)
                return self._rs
            else:
                return None
    # faz uma busca do maior codigo
    def buscar_maior_codigo(self)->int:
        rs = None
        self._rs = []
        sql = "SELECT MAX(codigo) FROM Doador"
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
    # insere novo doador no banco
    def novo_doador(self, novo :Doador) -> str:
        codigo = self.buscar_maior_codigo() + 1

        insert_query = "INSERT INTO Doador(codigo, nome, cpf, contato, tipo_sanguineo, rh, tipo_rh_corretos, situacao) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (codigo , novo.nome, novo.cpf, novo.contato, novo.tipoSanguineo, novo.tipoRh, novo.tipoRhCorreto, "ATIVO")
        try:
            cur = self._db.cursor()
            cur.execute(insert_query, values)
            self._db.commit()
            cur.close()
            return "Novo doador adicionado!"         
        except Exception as e:
            return "Problema na inserção..."
    # exclusao de doador atravesa da INATIVAÇÃO 
    def tornar_doador_inativo(self, codigo) -> bool:
        update_query = "UPDATE Doador SET situacao = %s WHERE codigo = %s"
        values = ("INATIVO", codigo)
        try:
            cur = self._db.cursor()
            cur.execute(update_query, values)
            self._db.commit()
            cur.close()
            print("Doador tornou-se INATIVO com sucesso!")
            return True
        except Exception as e:
            print("Problema ao tornar o doador INATIVO...", e)
            return False
    # reinserção de doador atravesa da ATIVAÇÃO 
    def tornar_doador_ativo(self, codigo) -> None:
        update_query = "UPDATE Doador SET situacao = %s WHERE codigo = %s"
        values = ("ATIVO", codigo)
        try:
            cur = self._db.cursor()
            cur.execute(update_query, values)
            self._db.commit()
            cur.close()
            print("Doador tornou-se ATIVO com sucesso!")
        except Exception as e:
            print("Problema ao tornar o doador ATIVO...", e)
    # pesquisa doador
    def pesquisar_doador(self, filtro:Doador) -> list[Doador]:
        self._rs = []
        rs = None
        query = "SELECT * FROM Doador WHERE situacao = 'ATIVO' "
        # verificaçao do objeto para adaptar a query de pesquisa
        if filtro.codigo is not None and filtro.codigo != 0:
            query += "AND CAST(codigo AS TEXT) LIKE '%"+str(filtro.codigo)+"%' "
        if filtro.nome != "":
            query += "AND LOWER(nome) LIKE  LOWER('%"+str(filtro.nome)+"%')"+" "
        if filtro.cpf != "":
            query += "AND cpf LIKE '%"+str(filtro.cpf)+"%' "
        if filtro.contato != "":
            query += "AND contato LIKE '%"+str(filtro.contato)+"%' "
        if filtro.tipoSanguineo != "":
             if filtro.tipoSanguineo == "TODOS":
                 query += "AND tipo_sanguineo IN ('A', 'B', 'AB', 'O') "+" "  # Buscar todos os tipos de Rh
             else:
                query += "AND tipo_sanguineo LIKE'%"+str(filtro.tipoSanguineo)+"%' "
        if filtro.tipoRh != "":
            if filtro.tipoRh == "TODOS":
                query += "AND rh IN ('POSITIVO', 'NEGATIVO') "+" "  # Buscar todos os tipos de Rh
            else:
                query += "AND rh LIKE '%"+str(filtro.tipoRh)+"%' "
        # execução da query no banco
        try:
            print(query)
            cur = self._db.cursor()
            cur.execute(query)
            rs = cur.fetchall()
            cur.close()
            # tratando dados coletados
            for row in rs:
                self._rs.append(toEntity(*row))
            return self._rs
        # exceção
        except Exception as e:
            print("Problema na pesquisa de doadores...", e)
            return None
        
# classe para facilitar a leitura retornada do banco
class toEntity():
    def __init__(self,codigo,nome,cpf,contato,tipo_sanguineo,rh,tipo_rh_corretos,situacao) -> None:
        self.codigo = codigo
        self.nome = nome
        self.cpf = cpf
        self.contato = contato
        self.tipo_sanguineo = tipo_sanguineo
        self.rh = rh
        self.tipo_rh_corretos = tipo_rh_corretos
        self.situacao = situacao
    def __str__(self) -> str:
        return f"Código: {self.codigo}, Nome: {self.nome}, CPF: {self.cpf}, Contato: {self.contato}, Tipo Sanguíneo: {self.tipo_sanguineo}, RH: {self.rh}, Tipo RH Corretos: {self.tipo_rh_corretos}, Situação: {self.situacao}"