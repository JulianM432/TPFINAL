function Form({ handleSubmit, contentReserva }) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label htmlFor="nombre">
        Nombre:{" "}
        <input
          name="nombre"
          type="text"
          id="nombre"
          placeholder="Nombre"
          required
          defaultValue={contentReserva?.nombre}
        />
      </label>

      <label htmlFor="telefono">
        Telefono:{" "}
        <input
          name="telefono"
          type="text"
          id="telefono"
          placeholder="Telefono"
          required
          defaultValue={contentReserva?.telefono}
        />
      </label>
      {contentReserva && (
        <label htmlFor="date">
          Seleccione Fecha:{" "}
          <input
            name="date"
            type="date"
            id="date"
            defaultValue={contentReserva?.dia_hora.split("T")[0]}
            required
          />
        </label>
      )}

      <label htmlFor="duration">
        Duración:{" "}
        <input
          name="duration"
          type="number"
          id="duration"
          placeholder="Duración"
          required
          defaultValue={contentReserva?.duracion}
          min={1}
        />
      </label>

      <label htmlFor="hora">
        Hora:{" "}
        <input
          name="hora"
          type="time"
          id="hora"
          placeholder="Hora"
          required
          defaultValue={contentReserva?.dia_hora.split("T")[1].slice(0, 5)}
        />
      </label>
      <button type="submit">Reservar</button>
    </form>
  );
}

export default Form;
