import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const LoginForm = ({
  login,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>Login</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={login.title}
        onChange={onChange}
        error={errors.title}
      />
      <TextInput
        name="category"
        label="Category"
        value={login.category}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default LoginForm;
