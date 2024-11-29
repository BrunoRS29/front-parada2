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
                setAparelhos(data);
            } catch (error) {
                console.error('Erro ao carregar aparelhos', error);
            }
        };
        fetchAparelhos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoAparelho = { cliente, marca, modelo, tipo };
        if (editingAparelho) {
            try {
                await updateAparelho(editingAparelho.id, novoAparelho);
                setEditingAparelho(null);
            } catch (error) {
                console.error('Erro ao atualizar aparelho', error);
            }
        } else {
            try {
                await createAparelho(novoAparelho);
            } catch (error) {
                console.error('Erro ao criar aparelho', error);
            }
        }
        setCliente('');
        setMarca('');
        setModelo('');
        setTipo('');
        try {
            const updatedAparelhos = await getAparelhos();
            setAparelhos(updatedAparelhos);
        } catch (error) {
            console.error('Erro ao carregar aparelhos atualizados', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAparelho(id);
            const updatedAparelhos = await getAparelhos();
            setAparelhos(updatedAparelhos);
        } catch (error) {
            console.error('Erro ao excluir aparelho', error);
        }
    };

    const handleEdit = (aparelho) => {
        setEditingAparelho(aparelho);
        setCliente(aparelho.cliente);
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
                        <label>Cliente</label>
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
                                <th className='textoMaior'>Cliente</th>
                                <th className='textoMenor'>Marca</th>
                                <th className='textoMenor'>Modelo</th>
                                <th className='textoMenor'>Tipo</th>
                                <th className='button'></th>
                                <th className='button'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {aparelhos.map((aparelho) => (
                                <tr key={aparelho.id}>
                                    <td>{aparelho.cliente}</td>
                                    <td>{aparelho.marca}</td>
                                    <td>{aparelho.modelo}</td>
                                    <td>{aparelho.tipo}</td>
                                    <td><button onClick={() => handleEdit(aparelho)}>Editar</button></td>
                                    <td><button onClick={() => handleDelete(aparelho.id)}>Excluir</button></td>
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
