import psycopg2
from Model.Classes import Doador

class Conexao:
    _db = None
    _rs = []
    def __init__(self, hst, db, usr, pwd) -> None:
        try:
            self._db = psycopg2.connect(host= hst, database= db, user= usr, password= pwd)
            print("Conexão bem sucedida![Doador]")
        except Exception as e:
            print("Falha na conexão...[Doador]",e)       
    
    def fechar_conexao(self) -> None:
        try:
            self._db.close()
            print("Conexão encerrada com sucesso![Doador]")
        except Exception as e:
            print("Falha ao executar comando..[Doador]",e)

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
            for lst in rs:
                novo = Doador(lst[0],lst[1],lst[2],lst[3],lst[4],lst[5],lst[6],lst[7])
                self._rs.append(novo)
            return self._rs


    def novo_doador(self, novo :Doador) -> None:
        insert_query = "INSERT INTO Doador(nome, cpf, contato, tipo_sanguineo, rh, tipo_rh_corretos, situacao) VALUES(%s, %s, %s, %s, %s, %s, %s)"
        values = (novo.nome, novo.cpf, novo.contato, novo.tipoSanguineo, novo.tipoRh, novo.tipoRhCorreto, "ATIVO")
        try:
            cur = self._db.cursor()
            cur.execute(insert_query, values)
            self._db.commit()
            cur.close()
            print("Novo doador adicionado!")           
        except Exception as e:
            print("Problema na inserção...",e)

    def tornar_doador_inativo(self, codigo) -> None:
        update_query = "UPDATE Doador SET situacao = %s WHERE codigo = %s"
        values = ("INATIVO", codigo)
        try:
            cur = self._db.cursor()
            cur.execute(update_query, values)
            self._db.commit()
            cur.close()
            print("Doador tornou-se INATIVO com sucesso!")
        except Exception as e:
            print("Problema ao tornar o doador INATIVO...", e)

    def pesquisar_doador(self, filtro:Doador) -> list[Doador]:
        query = "SELECT * FROM Doador WHERE situacao = 'ATIVO' "

        if filtro.codigo is not None:
            query += "AND codigo ="+str(filtro.codigo)
        if filtro.nome is not None:
            query += "AND LOWER(nome) LIKE  LOWER("+str(filtro.nome)+")"
        if filtro.cpf is not None:
            query += "AND cpf = "+str(filtro.cpf)
        if filtro.contato is not None:
            query += "AND contato = "+str(filtro.contato)
        if filtro.tipo_sanguineo is not None:
             if filtro.tipo_sanguineo == "TODOS":
                 query += "AND tipo_sanguineo IN ('A', 'B', 'AB', 'O') "  # Buscar todos os tipos de Rh
             else:
                query += "AND tipo_sanguineo ="+str(filtro.tipoSanguineo)
        if filtro.rh is not None:
            if filtro.rh == "TODOS":
                query += "AND rh IN ('positivo', 'negativo') "  # Buscar todos os tipos de Rh
            else:
                query += "AND rh = "+str(filtro.tipoRh)

        try:
            cur = self._db.cursor()
            cur.execute(query)
            rs = cur.fetchall()
            cur.close()

            doadores = []
            for lst in rs:
                doador = Doador(lst[0], lst[1], lst[2], lst[3], lst[4], lst[5], lst[6], lst[7])
                doadores.append(doador)

            return doadores
        except Exception as e:
            print("Problema na pesquisa de doadores...", e)
            return []
        