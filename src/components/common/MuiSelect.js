import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MuiSelect = ({ label, value, items, handleChange, name }) => {
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-disabled-label">
                    {label}
                </InputLabel>
                <Select
                    name={name}
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={value}
                    label="Age"
                    onChange={handleChange}
                >
                    {items &&
                        items.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
};
export default MuiSelect;
