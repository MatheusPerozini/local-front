"use client";
import { Local } from "@/app/features/locals/types/local";
import "./stylesheet.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Map from "../map";

interface Props {
  local: Local;
}

export default function Card({ local }: Props) {
  const [displayButton, setDisplayButton] = useState(false);
  const [displayRoute, setDisplayRoute] = useState(false);

  return (
    <div className="card">
      <div
        className="card-info"
        onClick={() => setDisplayButton(!displayButton)}
      >
        {local.image ? (
          <div className="img-box">
            <img alt="image" src={local.image} />
          </div>
        ) : (
          <></>
        )}

        <div className="field">
          <label>Name</label>
          <p>{local.name}</p>
        </div>

        <div className="field">
          <label>Descricao</label>
          <p>{local.description}</p>
        </div>

        <div className="field">
          <label>Latitude</label>
          <p>{local.latitude}</p>
        </div>

        <div className="field">
          <label>Longitude</label>
          <p>{local.longitude}</p>
        </div>
      </div>

        {displayRoute ? (
          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          >
            <Map latitude={+local.latitude} longitude={+local.longitude} />
          </motion.div>
        ) : (
          <></>
        )}

<AnimatePresence>
        {displayButton ? (
          <motion.div
            className="btn-field"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={() => setDisplayRoute(!displayRoute)}>
              {displayRoute ? "Ocultar" : "Mostrar rota"}
            </button>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </div>
  );
}
