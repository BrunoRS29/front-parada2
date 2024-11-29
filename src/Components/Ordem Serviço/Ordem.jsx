import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrdens, createOrdem, updateOrdem, deleteOrdem } from '../../Api/OrdemService'; 
import './Ordem.css';

const Ordem = () => {
    const [ordens, setOrdens] = useState([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataTermino, setDataTermino] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cliente, setCliente] = useState('');
    const [editingOrdem, setEditingOrdem] = useState(null);

    useEffect(() => {
        const fetchOrdens = async () => {
            try {
                const data = await getOrdens();
                setOrdens(data);
            } catch (error) {
                console.error('Erro ao carregar ordens de serviço', error);
            }
        };
        fetchOrdens();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novaOrdem = { dataInicio, dataTermino, descricao, cliente };
        if (editingOrdem) {
            try {
                await updateOrdem(editingOrdem.id, novaOrdem);
                setEditingOrdem(null);
            } catch (error) {
                console.error('Erro ao atualizar ordem de serviço', error);
            }
        } else {
            try {
                await createOrdem(novaOrdem);
            } catch (error) {
                console.error('Erro ao criar ordem de serviço', error);
            }
        }
        setDataInicio('');
        setDataTermino('');
        setDescricao('');
        setCliente('');
        try {
            const updatedOrdens = await getOrdens();
            setOrdens(updatedOrdens);
        } catch (error) {
            console.error('Erro ao carregar ordens de serviço atualizadas', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrdem(id);
            const updatedOrdens = await getOrdens();
            setOrdens(updatedOrdens);
        } catch (error) {
            console.error('Erro ao excluir ordem de serviço', error);
        }
    };

    const handleEdit = (ordem) => {
        setEditingOrdem(ordem);
        setDataInicio(ordem.dataInicio);
        setDataTermino(ordem.dataTermino);
        setDescricao(ordem.descricao);
        setCliente(ordem.cliente);
    };

    return (
        <div className='Container'>
            <h1>Ordem de Serviço</h1>
            <div className='formContainer'>
                <form onSubmit={handleSubmit}>
                    <label>Data início</label>
                    <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                    />
                    <label>Data término</label>
                    <input
                        type="date"
                        value={dataTermino}
                        onChange={(e) => setDataTermino(e.target.value)}
                    />
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <label>Cliente</label>
                    <input
                        type="text"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                    />
                    <button type="submit">{editingOrdem ? 'Atualizar' : 'Enviar'}</button>
                </form>
            </div>
            <div className='gridContainer'>
                <table>
                    <thead>
                        <tr>
                            <th className='textoMenor'>Data Início</th>
                            <th className='textoMenor'>Data Término</th>
                            <th className='textoMaior'>Descrição</th>
                            <th className='textoMaior'>Cliente</th>
                            <th className='button'></th>
                            <th className='button'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordens.map((ordem) => (
                            <tr key={ordem.id}>
                                <td>{ordem.dataInicio}</td>
                                <td>{ordem.dataTermino}</td>
                                <td>{ordem.descricao}</td>
                                <td>{ordem.cliente}</td>
                                <td>
                                    <button onClick={() => handleEdit(ordem)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(ordem.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/">
                <button className='buttonExit'>Sair</button>
            </Link>
        </div>
    );
};

export default Ordem;
