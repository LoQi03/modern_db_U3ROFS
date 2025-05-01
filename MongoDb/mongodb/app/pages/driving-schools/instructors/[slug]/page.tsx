'use client'
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Button } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/app/components/providers/modal-provider';
import { Instructor } from '@/app/models/instructor';
import { EditInstructor } from '@/app/components/edit-instructors/edit-instructor';

const Instructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const router = useRouter();
  const params = useParams();
  const modalContext = useModal();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 2 },
    { field: 'salary', headerName: 'Salary', flex: 1 },
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
          onClick={() => handleDelete(params.row._id.toString())}
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
          onClick={() => router.push('instructors/' + params.row._id)}
        >
          Open
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const load = async () => {
    const res = await axios.get<Instructor[]>(`/api/driving-schools/${params.slug}/instructors`);
    setInstructors(res.data);
  };

  useEffect(() => {
    if(!params.slug)
      return

    load();
  }, [!params.slug]);

  const handleUpdate = (instructor: Instructor) => {
    if (!instructor._id) return;

    if(!slug) return;

    modalContext.openModal(
      <EditInstructor d_id={slug} id={instructor._id} load={load} />,
      `Update ${instructor.name}`
    );
  };

  const handleCreate = () => {

    if(!slug) return;

    modalContext.openModal(
      <EditInstructor d_id={slug} load={load} />,
      `Create Instructor`
    );
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this instructor?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/instructors/${id}`);
        setInstructors(instructors.filter(inst => inst._id.toString() !== id));
      } catch (error) {
        console.error('Error deleting instructor:', error);
      }
    }
  };

  return (
    <Paper sx={{ height: '95dvh', width: '100%' }}>
      <div className='w-full flex justify-end p-3' style={{ height: '5dvh' }}>
        <Button onClick={handleCreate} variant="contained">Create</Button>
      </div>
      <DataGrid
        rows={instructors}
        columns={columns}
        getRowId={(row) => row._id.toString()}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Instructors;
