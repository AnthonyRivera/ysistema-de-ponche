import React, { useState } from 'react';
import Historial from './Historial';//Import table component for history 

function NameInput() {
  const [name, setName] = useState(''); // Initialize name state
  const [savedName, setSavedName] = useState(''); // Initialize savedName state
  const [savedDateTime, setSavedDateTime] = useState(null); // Initialize savedDateTime state
  const [isEditing, setIsEditing] = useState(true); // Initialize editing state
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(true); // Initialize the save button state
  const [breakButton, setBreakButtonEnabled] = useState(false); // Initialize the break button state
  const [almuerzoButton, setAlmuerzoButton] = useState(false); // Initialize the almuerzo button state
  const [salidaButton, setSalidaButton] = useState(false); // Initialize the salida button state
  const [breakButtonCount, setBreakButtonCount] = useState(0); // Initialize a counter for the break button
  const [almuerzoButtonCount, setAlmuerzoButtonCount] = useState(0); // Initialize a counter for the almuerzo button
  const [savedData, setSavedData] = useState([]); // Store the saved data in an array
  const [currentAction, setCurrentAction] = useState(''); //Track which button is being used
 
  const handleNameChange = (e) => {
    // Allow name input only when not editing
    if (!isEditing) {
      return;
    }

    // Update the name state when the input value changes
    setName(e.target.value);

    // Enable or disable buttons based on whether the input is empty
    const isEmpty = e.target.value.trim() === '';
    setSaveButtonEnabled(!isEmpty);
    setBreakButtonEnabled(currentAction !== 'Entrada' && !isEmpty);
    setAlmuerzoButton(currentAction !== 'Entrada' && !isEmpty);
    setSalidaButton(currentAction === 'Salida' && !isEmpty);
  };

  const handleSave = () => {
    if (!isEditing) {
      return;
    }

    setCurrentAction('Entrada'); //Set current action to 'Entrada'

    // Save the name to the savedName state
    setSavedName(name);

    // Save the current date and time to the savedDateTime state
    const currentDate = new Date();
    setSavedDateTime(currentDate);

    const newItem = {
      action: 'Entrada',
      name: name,
      dateTime: currentDate,
    };

    // Save the new data to the array
    setSavedData([...savedData, newItem]);



    // Disable editing
    setIsEditing(false);

    // Disable the save button and enable the other buttons
    setSaveButtonEnabled(false);
    // Enable the save button and disable the break button when the button has been clicked twice
    if (breakButtonCount >= 2) {
        setBreakButtonEnabled(false);
      }
    // Enable the save button and disable the almuerzo button when the button has been clicked twice
    if (almuerzoButtonCount >= 1) {
        setAlmuerzoButton(false);
      }
    setSalidaButton(true); 
  };

  const handleBreak = () => {
     // Increment the button click count
     setBreakButtonCount(breakButtonCount + 1);

     setCurrentAction('Break'); //Set current action to 'Break'

     // Save the name to the savedName state
     setSavedName(name);
 
     // Save the current date and time to the savedDateTime state
     const currentDate = new Date();
     setSavedDateTime(currentDate);
 
     const newItem = {
       action: 'Break',
       name: name,
       dateTime: currentDate,
     };
 

    // Save the new data to the array
    setSavedData([...savedData, newItem]);

    // Enable editing
    setIsEditing(true);

    // Enable the save button and disable the break button
    setSaveButtonEnabled(true);
    // Enable the save button and disable the break button when the button has been clicked twice
    if (breakButtonCount >= 2) {
        setBreakButtonEnabled(false);
      }
   // Enable the save button and disable the almuerzo button when the button has been clicked twice
   if (almuerzoButtonCount >= 1) {
    setAlmuerzoButton(false);
  }
    setSalidaButton(true); 
  };

  const handleAlmuerzo = () => {
    // Increment the button click count
    setAlmuerzoButtonCount(almuerzoButtonCount + 1);
    
    setCurrentAction('Almuerzo'); //Set current action to 'Almuerzo'

    // Save the name to the savedName state
    setSavedName(name);

    // Save the current date and time to the savedDateTime state
    const currentDate = new Date();
    setSavedDateTime(currentDate);

    const newItem = {
      action: 'Almuerzo',
      name: name,
      dateTime: currentDate,
    };


    // Save the new data to the array
    setSavedData([...savedData, newItem]);

    // Enable editing
    setIsEditing(true);

    // Enable the save button and disable the other buttons
    setSaveButtonEnabled(true);
     // Enable the save button and disable the break button when the button has been clicked twice
     if (breakButtonCount >= 2) {
        setBreakButtonEnabled(false);
      }
    // Enable the save button and disable the almuerzo button when the button has been clicked twice
    if (almuerzoButtonCount >= 1) {
        setAlmuerzoButton(false);
      } 
    setSalidaButton(true);
  };

  const handleSalida = () => {
    setCurrentAction('Salida'); //Set current action to 'Salida'

    // Save the name to the savedName state
    setSavedName(name);

    // Save the current date and time to the savedDateTime state
    const currentDate = new Date();
    setSavedDateTime(currentDate);

    const newItem = {
      action: 'Salida',
      name: name,
      dateTime: currentDate,
    };


    // Save the new data to the array
    setSavedData([...savedData, newItem]);

    // Clear the name input field
    setName('');

    // Enable editing
    setIsEditing(true);

    // Enable the save button and disable the other buttons
    setSaveButtonEnabled(true);
    setBreakButtonEnabled(true);
    setAlmuerzoButton(true); 
    setSalidaButton(false); 

     // Reset the button click count
     setBreakButtonCount(0);
     setAlmuerzoButtonCount(0);

     setCurrentAction(''); //Erase current action
  };

  const handleClose = () => {
    // Clear the savedName and savedDateTime states
    setSavedName('');
    setSavedDateTime(null);

    // Enable editing
    setIsEditing(true);

    // Enable the save button and disable the new name button
    setSaveButtonEnabled(true);
    setBreakButtonEnabled(true);
    setAlmuerzoButton(true); 
    setSalidaButton(true); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre de empleado"
        value={name}
        onChange={handleNameChange}
        disabled={!isEditing} // Disable input when not editing
      />
    <button onClick={handleSave} disabled={!isSaveButtonEnabled || name.trim() === ''}>Entrada</button>
    <button onClick={handleBreak} disabled={!breakButton || name.trim() === '' || currentAction===''|| currentAction==='Break'|| currentAction==='Almuerzo'}>Break</button>
    <button onClick={handleAlmuerzo} disabled={!almuerzoButton || name.trim() === '' || currentAction===''|| currentAction==='Almuerzo'|| currentAction==='Break'}>Almuerzo</button>
    <button onClick={handleSalida} disabled={!salidaButton || name.trim() === ''|| currentAction===''}>Salida</button>

      {savedName && (
        <div>
          <p>Empleado: {savedName}</p>
          <p>Fecha y hora: {savedDateTime && savedDateTime.toLocaleString()}</p>
          <p>Acción: {currentAction}</p>
        </div>
      )}
       {/* Display the DataTable component with saved data */}
       <Historial data={savedData} />
    </div>
  );
}

export default NameInput;
