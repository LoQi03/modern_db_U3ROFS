'use client'
import { useEffect, useState } from 'react';
import { DrivingSchool } from '../../models/driving_school';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Button } from '@mui/material';
import { useModal } from '../../components/providers/modal-provider';
import axios from 'axios';
import { EditDrivingSchool } from '../../components/edit-driving-school/edit-driving-school';
import { useRouter } from 'next/navigation';

const DrivingSchools = () => {
  const [schools, setSchools] = useState<DrivingSchool[]>([]);
  const router = useRouter()
  const modalContext = useModal();

  const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 2 },
  { field: 'phone', headerName: 'Phones', flex: 3 },
  { field: 'address', headerName: 'Address', flex: 4 },
  {
    field: 'update',
    headerName: 'Update',
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleUpdate(params.row)}
      >
        Update
      </Button>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDelete(params.row._id)}
      >
        Delete
      </Button>
    ),
  },
   {
    field: 'open',
    headerName: 'Open',
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.push('driving-schools/' + params.row._id)}
      >
        Open
      </Button>
    ),
  },
];

  const paginationModel = { page: 0, pageSize: 10 };

  const load = async ()=>{
    const res = await axios.get<DrivingSchool[]>('/api/driving-schools');
    setSchools(res.data);
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await load();
      } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    };

    fetchItems();
  }, []);

  const handleUpdate = (row: DrivingSchool) => {

    if(!row._id)
      return

    modalContext.openModal(
      <EditDrivingSchool id={row._id} load={load}/>,
      `Update ${row.name}`
    );
  };

  const handleCreate = () =>{
     modalContext.openModal(
      <EditDrivingSchool  load={load}/>,
      `Create`
    );
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/driving-schools/${id}`);
        setSchools(schools.filter((school) => school._id && school._id.toString() !== id));
      } catch (error) {
        console.error('Error deleting school:', error);
      }
    }
  };

  return (
    <Paper sx={{ height: '95dvh', width: '100%' }}>
      <div className='w-full flex justify-end p-3' style={{height:'5dvh'}}>
        <Button onClick={()=> handleCreate()} variant="contained">Create</Button>
      </div>
      <DataGrid
        rows={schools}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DrivingSchools;
