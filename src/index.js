import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ItemPoke from './ItemPoke';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div className="App">
  <h1>Lista dos 151 Pokémon</h1>
  <ItemPoke />
</div>
);