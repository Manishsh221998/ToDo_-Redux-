 import './App.css';
 import React from 'react';
 import TableList from './components/table/Table';
import { Typography } from '@mui/material';
    
  function App() {
 
   return (
     <div className="App">
<Typography 
        variant="h3" 
        component="h3" 
        sx={{
          fontWeight: 'bold',
          color: '#00796b',  
          fontSize: '3rem',  
          textTransform: 'uppercase', 
          letterSpacing: '4px',  
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.1)', 
          borderBottom: '4px solid #00796b', 
          marginBottom: '40px', 
          paddingBottom: '10px',  
          mt:6
        }}
      >
        ToDo List
      </Typography>    
          <TableList/>
          </div>
   );
}

export default App;
