const Input = ({ label, required, err, renderInput, ...rest }) => {

    // renderInput is a functional component was called outside 
    // then excute at Input component and push out parameter (rest, err)
    console.log('err', err)
    return (
      <div className="form-group ">
        <label className="label">
          {label} {required && <span>*</span>}
        </label>
        {renderInput?.({ ...rest, err}) || (
          <input
          type="text"
            {...rest}
            className={`form__input ${err ? "formerror" : ""}`}
          />
        )}
        {err && <p className="error">{err}</p>}
      </div>
    );
  };
  
  export default Input;