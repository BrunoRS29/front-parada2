    import React, { useState, useEffect } from 'react';
    import "./Home.css";
    import { getAparelhos, createAparelho, deleteAparelho, updateAparelho } from '../../Api/AparelhoService';
    import { Link } from 'react-router-dom';

    const Home = () => {
        const [aparelhos, setAparelhos] = useState([]);
        const [cliente, setCliente] = useState('');
        const [marca, setMarca] = useState('');
        const [modelo, setModelo] = useState('');
        const [tipo, setTipo] = useState('');
        const [editingAparelho, setEditingAparelho] = useState(null);

        useEffect(() => {
            const fetchAparelhos = async () => {
                try {
                    const data = await getAparelhos();
                    console.log("Dados recebidos da API:", data);
                    setAparelhos(data);
                } catch (error) {
                    console.error('Erro ao carregar aparelhos', error);
                }
            };
            fetchAparelhos();
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            const novoAparelho = {
                idAparelho: editingAparelho ? editingAparelho.idAparelho : null,  // Certifique-se de usar idAparelho (não apenas id)
                idCliente: cliente,  // Supondo que `cliente` seja o id do cliente
                marca,
                modelo,
                tipo
            };
        
            console.log("Novo aparelho a ser enviado:", novoAparelho);  // Log para verificar o objeto enviado
        
            if (editingAparelho) {
                try {
                    console.log("Enviando para atualizar o aparelho com id:", editingAparelho.idAparelho);  // Log para verificar o id
                    await updateAparelho(editingAparelho.idAparelho, novoAparelho);  // Passe o idAparelho diretamente
                    setEditingAparelho(null);  // Limpa a edição após atualizar
                } catch (error) {
                    console.error('Erro ao atualizar aparelho', error);
                }
            
            
            } else {
                try {
                    console.log("Enviando para criar um novo aparelho:", novoAparelho);  // Log para verificar a criação
                    await createAparelho(novoAparelho);  // Envia o novo aparelho
                } catch (error) {
                    console.error('Erro ao criar aparelho', error);
                }
            }
        
            // Limpeza dos campos do formulário
            setCliente('');
            setMarca('');
            setModelo('');
            setTipo('');
        
            // Recarrega a lista de aparelhos
            try {
                const updatedAparelhos = await getAparelhos();
                setAparelhos(updatedAparelhos);
            } catch (error) {
                console.error('Erro ao carregar aparelhos atualizados', error);
            }
        };
        
        

        const handleDelete = async (idAparelho) => {
            try {
                await deleteAparelho(idAparelho);; 
                const updatedAparelhos = await getAparelhos();
                setAparelhos(updatedAparelhos);
            } catch (error) {
                console.error('Erro ao excluir aparelho', error);
            }
        };
        

        const handleEdit = (aparelho) => {
            console.log("Aparelho editado:", aparelho);  // Verifique o aparelho que foi selecionado
            setEditingAparelho(aparelho);  // Configura o aparelho a ser editado
            setCliente(aparelho.idCliente);
            setMarca(aparelho.marca);
            setModelo(aparelho.modelo);
            setTipo(aparelho.tipo);
        };

        return (
            <div className='Container'>
                <div className='header'>
                    <Link to="/cliente">
                        <button>Cliente</button>
                    </Link>
                    <Link to="/ordem">
                        <button>Ordem de Serviço</button>
                    </Link>
                    
                    <h1>Aparelhos</h1>
                    <div className='formContainer'>
                        <form onSubmit={handleSubmit}>
                            <label>Id Cliente</label>
                            <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
                            <label>Marca</label>
                            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
                            <label>Modelo</label>
                            <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                            <label>Tipo</label>
                            <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                            <button type="submit">{editingAparelho ? 'Atualizar' : 'Enviar'}</button>
                        </form>
                    </div>
                    <div className='gridContainer'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='textoMaior'>Id Cliente</th>
                                    <th className='textoMenor'>Marca</th>
                                    <th className='textoMenor'>Modelo</th>
                                    <th className='textoMenor'>Tipo</th>
                                    <th className='button'></th>
                                    <th className='button'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {aparelhos.map((aparelho) => (
                                    <tr key={aparelho.idAparelho}>
                                        <td>{aparelho.idCliente}</td>
                                        <td>{aparelho.marca}</td>
                                        <td>{aparelho.modelo}</td>
                                        <td>{aparelho.tipo}</td>
                                        <td><button onClick={() => {
                                            console.log("ID enviado:", aparelho.idAparelho)
                                            handleEdit(aparelho)}}>
                                            Editar
                                            </button>
                                            </td>
                                        <td>
                                            <button onClick={() => {
                                                console.log("ID enviado para exclusão:", aparelho.idAparelho);
                                                handleDelete(aparelho.idAparelho);
                                            }}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    export default Home;
