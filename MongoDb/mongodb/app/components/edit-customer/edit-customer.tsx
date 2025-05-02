'use client';
import { Customer } from "@/app/models/customer";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "../providers/modal-provider";

export interface EditCustomerProps {
  id?: string;
  i_id: string | string[];
  load: () => Promise<void>;
}

export const EditCustomer = ({ id, i_id, load }: EditCustomerProps) => {
  const [customer, setCustomer] = useState<Customer>({
    _id: undefined as any,
    i_id: undefined as any,
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    birthDate: new Date()
  });

  const modalContext = useModal();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data } = await axios.get<Customer>(`/api/customers/${id}`);
      setCustomer({ ...data, birthDate: new Date(data.birthDate) });
    };

    fetchData();
  }, [id]);

  const update = async () => {
    await axios.put(`/api/customers/${id}`, customer);
    await load();
    modalContext.closeModal();
  };

  const create = async () => {
    const newCustomer = {
      ...customer,
      i_id,
    };
    await axios.post('/api/customers', newCustomer);
    await load();
    modalContext.closeModal();
  };

  const handleInputChange = (key: keyof Customer, value: any) => {
    setCustomer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {id && <p>ID: {id}</p>}
      <TextField
        label="First Name"
        variant="standard"
        value={customer.firstName}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => handleInputChange('firstName', e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="standard"
        value={customer.lastName}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => handleInputChange('lastName', e.target.value)}
      />
      <TextField
        label="Phone"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        value={customer.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      <TextField
        label="Address"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        value={customer.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
      />
      <TextField
        label="Birth Date"
        type="date"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        value={customer.birthDate.toISOString().split('T')[0]}
        onChange={(e) => handleInputChange('birthDate', new Date(e.target.value))}
      />
      <Button onClick={() => (id ? update() : create())} variant="contained">
        Save
      </Button>
    </div>
  );
};
