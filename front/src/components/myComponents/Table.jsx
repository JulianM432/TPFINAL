function Table({ head, data, onRowSelect, onRowEdit, onRowDelete }) {
  if (!data || data.length === 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td colSpan="100%">No se encontraron</td>
          </tr>
        </tbody>
      </table>
    );
  }

  const keys = Object.keys(data[0]).filter((key) => key !== "id");
  const headers = head || keys;

  const handleRowSelect = (id) => {
    onRowSelect?.(id); // Notifica al padre el ID seleccionado
  };
  const handleRowDelete = (id) => {
    onRowDelete?.(id); // Notifica al padre el ID seleccionado
  };
  const handleRowEdit = (id) => {
    onRowEdit?.(id); // Notifica al padre el ID seleccionado
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {keys.map((key) => (
              <td key={key}>
                {typeof row[key] === "boolean"
                  ? row[key]
                    ? "Sí"
                    : "No"
                  : row[key]}
              </td>
            ))}
            <td>
              {onRowSelect && (
                <input
                  style={{
                    background: "transparent",
                    borderRadius: "50%",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  type="button"
                  value="🗓️"
                  name="rowSelect"
                  onClick={() => handleRowSelect(row.id)}
                />
              )}
            </td>
            <td>
              {onRowEdit && (
                <input
                  style={{
                    background: "transparent",
                    borderRadius: "50%",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  type="button"
                  value="🖊️"
                  name="rowEdit"
                  onClick={() => handleRowEdit(row.id)}
                />
              )}
            </td>
            <td>
              {onRowDelete && (
                <input
                  style={{
                    background: "transparent",
                    borderRadius: "50%",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  type="button"
                  value="🗑️"
                  name="rowDelete"
                  onClick={() => handleRowDelete(row.id)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
