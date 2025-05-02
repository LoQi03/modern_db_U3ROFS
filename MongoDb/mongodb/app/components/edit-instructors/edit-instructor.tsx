'use client'
import { Instructor } from "@/app/models/instructor"; 
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "../providers/modal-provider";
import { CreateInstructor } from "@/app/api/instructors/route";


export interface EditInstructorProps {
  id?: string; 
  d_id:string
  load: () => Promise<void>; 
}

export const EditInstructor = (props: EditInstructorProps) => {
  const [instructor, setInstructor] = useState({
    name: '',
    phone: '',
    salary: 0,
  } as Instructor);
  const modalContext = useModal();

  useEffect(() => {
    if (!props.id) return;

    const fetchData = async () => {
      const { data } = await axios.get<Instructor>(`/api/instructors/${props.id}`);
      setInstructor(data);
    };

    fetchData();
  }, [props]);

  const update = async () => {
    await axios.put<Instructor>(`/api/instructors/${props.id}`, instructor);
    await props.load();
    modalContext.closeModal();
  };

  const create = async () => {
    const createInstructor : CreateInstructor =
    {
      name:instructor.name,
      salary:instructor.salary,
      phone: instructor.phone,
      d_id: props.d_id
    }
    await axios.post<Instructor>('/api/instructors', createInstructor);
    await props.load();
    modalContext.closeModal();
  };

  const handleInputChange = (key: keyof Instructor, value: string) => {
    setInstructor((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-between h-100">
      {props.id !== undefined && <p>ID: {props.id.toString()}</p>}
      <TextField
        InputLabelProps={{ shrink: instructor.name?.length > 0 }}
        label="Name"
        variant="standard"
        value={instructor.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <TextField
        InputLabelProps={{ shrink: instructor.phone?.length > 0 }}
        label="Phone"
        variant="standard"
        value={instructor.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      <TextField
        InputLabelProps={{ shrink: instructor.salary > 0 }}
        label="Salary"
        variant="standard"
        value={instructor.salary}
        onChange={(e) => handleInputChange('salary', e.target.value)}
      />
      <Button onClick={() => (props.id !== undefined ? update() : create())} variant="contained">
        Save
      </Button>
    </div>
  );
};
