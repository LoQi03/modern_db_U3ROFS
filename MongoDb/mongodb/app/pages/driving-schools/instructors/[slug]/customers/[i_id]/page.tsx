'use client';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Button } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/app/components/providers/modal-provider';
import { Customer } from '@/app/models/customer';
import { EditCustomer } from '@/app/components/edit-customer/edit-customer';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();
  const params = useParams();
  const modalContext = useModal();

  const i_id = params.i_id

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 2 },
    { field: 'lastName', headerName: 'Last Name', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 2 },
    { field: 'address', headerName: 'Address', flex: 2 },
    { field: 'birthDate', headerName: 'Birth Date', flex: 2, valueGetter: (params) => new Date(params).toLocaleDateString() },
    {
      field: 'update',
      headerName: 'Update',
      flex: 1,
      renderCell: ({ row }) => (
        <Button variant="contained" onClick={() => handleUpdate(row)}>Update</Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 1,
      renderCell: ({ row }) => (
        <Button variant="contained" color="secondary" onClick={() => handleDelete(row._id.toString())}>Delete</Button>
      ),
    },
  ];

  const loadCustomers = async () => {
    if (!i_id) return;
    try {
      const res = await axios.get<Customer[]>(`/api/instructors/${i_id}/customers`);
      setCustomers(res.data);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [i_id]);

  const handleUpdate = (customer: Customer) => {
    if (!customer._id || !i_id) return;
    modalContext.openModal(
      <EditCustomer i_id={i_id} id={customer._id.toString()} load={loadCustomers} />,
      `Update ${customer.firstName} ${customer.lastName}`
    );
  };

  const handleCreate = () => {

    if (!i_id) return;
    modalContext.openModal(
      <EditCustomer i_id={i_id} load={loadCustomers} />,
      'Create Customer'
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await axios.delete(`/api/customers/${id}`);
      setCustomers(customers.filter(c => c._id.toString() !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Paper sx={{ height: '95dvh', width: '100%' }}>
       <div className='w-full flex justify-between p-3' style={{height:'5dvh'}}>
        <h1 className='font-bold text-4xl'>Customers</h1>
        <Button onClick={()=> handleCreate()} variant="contained">Create</Button>
      </div>
      <DataGrid
        rows={customers}
        columns={columns}
        getRowId={(row) => row._id.toString()}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Customers;
