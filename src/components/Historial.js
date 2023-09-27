import React from 'react';

function Historial({ data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Fecha y Hora</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.dateTime && item.dateTime.toLocaleString()}</td>
            <td>{item.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Historial;
