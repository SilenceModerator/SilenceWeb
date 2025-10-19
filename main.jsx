import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css"; // CSS externo (mas pode ser inline também)

export default function App() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div className="container">
      <h1 className="titulo">Transições Suaves em Tudo</h1>

      <button className="botao" onClick={() => setMostrar(!mostrar)}>
        {mostrar ? "Esconder Card" : "Mostrar Card"}
      </button>

      <AnimatePresence mode="wait">
        {mostrar && (
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h2>Eu sou um card</h2>
            <p>Com entrada e saída suave ✨</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
