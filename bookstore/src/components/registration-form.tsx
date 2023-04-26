import { Box, TextField, Select, MenuItem, SelectChangeEvent} from "@mui/material"
import { useState } from "react"
import React from "react"
import { User } from "../model/user"

interface Props {
  onSubmit: (user: User) => void
}

const RegistrationForm = ({onSubmit}: Props) => {
  const [data, setData] = useState<User>({})
  const [gender, setGender] = React.useState<string>('0');


  const handleSubmit = (e: any) => {
    if(data.gender == null || data.gender == undefined)
    data.gender = 0;
    console.log(data)
    e.preventDefault();
    onSubmit(data)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    data.gender = +event.target.value
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid">
        <TextField
          required
          label="First name"
          onChange={(e) => setData({...data, firstname: e.target.value})}
          />
        <TextField
          required
          label="Last name"
          onChange={(e) => setData({...data, lastname: e.target.value})}
        />
        <Select
            value={gender}
            label="Gender"
            onChange={handleChange}>
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
        </Select>
        <TextField
          required
          label="Phone number"
          onChange={(e) => setData({...data, phone: e.target.value})}
        />
        <TextField
          required
          label="National id"
          onChange={(e) => setData({...data, nationalId: e.target.value})}
        />
        <TextField
          required
          label="Occupation"
          onChange={(e) => setData({...data, occupation: e.target.value})}
          multiline
        />
        <TextField
          required
          label="Informations"
          onChange={(e) => setData({...data, information: e.target.value})}
          multiline
        />
        <TextField
          required
          label="Country"
          onChange={(e) => setData({...data, address: {...data.address, country: e.target.value}})}
        />
        <TextField
          required
          label="City"
          onChange={(e) => setData({...data, address: {...data.address, city: e.target.value}})}
        />
        <TextField
          required
          label="Street"
          onChange={(e) => setData({...data, address: {...data.address, street: e.target.value}})}
        />
        <TextField
          required
          type='number'
          label="Street number"
          onChange={(e) => setData({...data, address: {...data.address, number: e.target.value}})}
        />
        <TextField
          required
          label="Email"
          onChange={(e) => setData({...data, email: e.target.value})}
        />
        <TextField
          required
          label="Password"
          type="password"
          onChange={(e) => setData({...data, password: e.target.value})}
        />

      </div>
      <Box marginTop="20px">
        <div>
        <button className="secondary-button">Register</button>
        </div>
      </Box>
    </form>
  )
}

export default RegistrationForm