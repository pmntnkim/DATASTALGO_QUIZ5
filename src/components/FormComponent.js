function FormComponent({ title, fields, values, onChange, onSubmit, submitLabel }) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <label key={field.name} className="form-field">
          <span>{field.label}</span>
          <input
            type={field.type}
            name={field.name}
            value={values[field.name] || ''}
            onChange={onChange}
            required={field.required}
            placeholder={field.placeholder}
          />
        </label>
      ))}
      <button type="submit" className="button-primary">
        {submitLabel}
      </button>
    </form>
  );
}

export default FormComponent;
