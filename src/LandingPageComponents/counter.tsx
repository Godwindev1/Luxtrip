import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Counter({PropertyName, onChangeProperty, DefaultValue }) {
  
    const [count, setCount] = useState(DefaultValue);

    
  return (
    <div className='flex items-center justify-between pl-3 pr-3 text-[#0b1c0ea8] font-semibold box-border'>
        <div>
            <p> {PropertyName}  </p>
        </div>

        <div className='w-[50%] flex items-center justify-between  box-border'>
        
        <IconButton onClick={() => 
            {
                 onChangeProperty(count - 1);

                 setCount((prev) => Math.max(0, prev - 1));
                     
            }
        }>
            <RemoveIcon />
        </IconButton>
        
           <div>  <p> {count} </p> </div>

        <IconButton onClick={() => 
            { 
                  onChangeProperty(count + 1);
               setCount((prev) => prev + 1);
             
            } 
        }>
            <AddIcon />
        </IconButton>
        </div>
    </div>
  );
}
