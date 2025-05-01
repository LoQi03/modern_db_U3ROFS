'use client'
import { useEffect, useState } from 'react';
import { DrivingSchool } from '../models/driving_school';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { useModal } from '../components/providers/modal-provider';

const Home = () => {
  const [schools, setSchools] = useState<DrivingSchool[]>([]);
  const modalContext = useModal();
  const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 40 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'phones', headerName: 'Phones', width: 300 },
];

const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/driving-schools');
      const data = await res.json();
      setSchools(data);
    };

    fetchItems();
  }, []);

  return ( 
  <Paper sx={{ height: '100dvh', width: '100%' }}>
    <button onClick={()=> modalContext.openModal(<div> asd</div>, "asd")}>asdf ads</button>
      <DataGrid
        rows={schools}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    
  );
};

export default Home;
