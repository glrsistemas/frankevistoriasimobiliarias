import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../Navbar/index";

const columns = [
  { field: "id", headerName: "Código"},
  {
    field: "descricao",
    headerName: "Descrição",
    editable: true,
  },
  {
    field: "imovel",
    headerName: "Imóvel",
    editable: true,
  },
  {
    field: "contestacao",
    headerName: "Contestação",
    filterable: false,
    editable: false,
  },
];

const rows = [
  { id: 1, descricao: "Snow", imovel: "Jon", contestacao: "Sim" },
  { id: 2, descricao: "Lannister", imovel: "Cersei", contestacao: "Não" },
  { id: 3, descricao: "Lannister", imovel: "Jaime", contestacao: "Sim" },
  { id: 4, descricao: "Stark", imovel: "Arya", contestacao: "Não" },
  { id: 5, descricao: "Targaryen", imovel: "Daenerys", contestacao: "Sim" },
  { id: 6, descricao: "Melisandre", imovel: null, contestacao: "Sim" },
  { id: 7, descricao: "Clifford", imovel: "Ferrara", contestacao: "Não" },
  { id: 8, descricao: "Frances", imovel: "Rossini", contestacao: "Não" },
  { id: 9, descricao: "Roxie", imovel: "Harvey", contestacao: "Sim" },
];

export default function DataGridDemo() {
  const [tamanhoPagina, setTamanhoPagina] = useState(5);

  return (
    <>
      <Navbar />
      <div className="ui-container">
        <Box sx={{ height: 400, width: "100%" }} mt={10}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={tamanhoPagina}
            rowsPerPageOptions={[5, 10, 20, 30, 50]}
            // disableSelectionOnClick
            onCellClick={(e) => {
              console.log(e.id);
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </>
  );
}
