import { DrivingSchool } from "@/app/models/driving_school";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "../providers/modal-provider";


export interface EditDrivingSchoolProps {
  id?: ObjectId; 
  load: () => Promise<void>; 
}

export const EditDrivingSchool = (props : EditDrivingSchoolProps) =>{
    const [school, setSchool] = useState<DrivingSchool>({name:'', phone:'', address: ''} as DrivingSchool);
    const modalContext = useModal()

    useEffect(() => {
    if (!props.id) return;

    const fetchData = async () => {
        const {data} = await axios.get<DrivingSchool>(`/api/driving-schools/${props.id}`); 
        setSchool(data)
    };

    fetchData(); 
    }, [props.id]); 

    const update = async () =>{
        await axios.put<DrivingSchool>(`/api/driving-schools/${props.id}`, school); 
        await props.load()
        modalContext.closeModal()
    }

    const create = async () =>{
        await axios.post<DrivingSchool>(`/api/driving-schools`, school); 
        await props.load()
        modalContext.closeModal()
    }




    const handleInputChange = (key: keyof DrivingSchool, value: string) => {
    setSchool(prev => ({
        ...prev,
        [key]: value,
    }));
    };

    return(
        <div className="flex flex-col justify-between h-100">
            {props.id !== undefined && <p>ID: {props.id.toString()}</p>}
            <TextField InputLabelProps={{ shrink: school.name?.length > 0 }} label="Name" variant="standard"  value={school.name} onChange={(e) => handleInputChange('name', e.target.value)}/>
            <TextField InputLabelProps={{ shrink: school.phone?.length > 0 }} label="Phone" variant="standard"  value={school.phone} onChange={(e) => handleInputChange('phone', e.target.value)}/>
            <TextField InputLabelProps={{ shrink: school.address?.length > 0 }} label="Address" variant="standard"  value={school.address} onChange={(e) => handleInputChange('address', e.target.value)}/>
            <Button  onClick={()=> props.id !== undefined ? update() : create()} variant="contained">Save</Button>
        </div>
    )
}