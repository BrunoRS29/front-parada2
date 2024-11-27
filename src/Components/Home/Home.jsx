import React from 'react'
import "./Home.css";


const Home = () => {
  return (
    <div className='Container'>
       <h1>Aparelhos</h1>
       <div className='formContainer'>
            <form>
                <label>Aparelho</label>
                <input type="text"/>
                <label>Marca</label>
                <input type="text"/>
                <label>Tipo</label>
                <input type="text"/>
                <button>Enviar</button>
            </form>
       </div>
       <div className='gridContainer'>
            <table>
                <thead>
                    <tr>
                        <th>Aparelho</th>
                        <th>Marca</th>
                        <th>Tipo</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                    </tr>
                </tbody>
            </table>
       </div>

    </div>

    
  )
}

export default Home