import React, { useState, useEffect } from 'react';
import "./Cliente.css";
import { getClientes, createCliente, deleteCliente, updateCliente } from '../../Api/ClienteService';
import { Link } from 'react-router-dom';


const Cliente = () => {
    const [clientes, setClientes] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [editingCliente, setEditingCliente] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await getClientes();
                setClientes(data);
            } catch (error) {
                console.error('Erro ao carregar clientes', error);
            }
        };
        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoCliente = { endereco, nome, telefone };
        if (editingCliente) {
            try {
                await updateCliente(editingCliente.id, novoCliente);
                setEditingCliente(null);
            } catch (error) {
                console.error('Erro ao atualizar cliente', error);
            }
        } else {
            try {
                await createCliente(novoCliente);
            } catch (error) {
                console.error('Erro ao criar cliente', error);
            }
        }
        setEndereco('');
        setNome('');
        setTelefone('');
        try {
            const updatedClientes = await getClientes();
            setClientes(updatedClientes);
        } catch (error) {
            console.error('Erro ao carregar clientes atualizados', error);
        }
    };

    const handleDelete = async (idCliente) => {
        try {
            await deleteCliente(idCliente);  // Aqui você passa o idCliente corretamente
            const updatedClientes = await getClientes();
            setClientes(updatedClientes);
        } catch (error) {
            console.error('Erro ao excluir cliente', error);
        }
    };
    


    const handleEdit = (cliente) => {
        setEditingCliente(cliente);
        setEndereco(cliente.endereco);
        setNome(cliente.nome);
        setTelefone(cliente.telefone);
    };

    return (
        <div className='Container'>
            <div className='header'>
                <Link to="/home">
                    <button>Home</button>
                </Link>
                <h1>Clientes</h1>
                <div className='formContainer'>
                    <form onSubmit={handleSubmit}>
                        <label>Endereço</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label>Telefone</label>
                        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        <button type="submit">{editingCliente ? 'Atualizar' : 'Enviar'}</button>
                    </form>
                </div>
                <div className='gridContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th className='textoMaior'>Endereço</th>
                                <th className='textoMaior'>Nome</th>
                                <th className='textoMenor'>Telefone</th>
                                <th className='button'></th>
                                <th className='button'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.endereco}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.telefone}</td>
                                    <td><button onClick={() => handleEdit(cliente)}>Editar</button></td>
                                    <td><button onClick={() => handleDelete(cliente.id)}>Excluir</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cliente;
