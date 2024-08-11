import { useAuthenContext } from "@/contexts/AuthenContext";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MESSAGE } from "@/constant/validate";
import { REGEX } from "@/constant/validate";
const RegisterForm = () => {

  const { handleRegister} =  useAuthenContext();

  const {
    register,
    handleSubmit,
    watch,
    formState : {errors},

  } = useForm();

  const password = watch('password');
 

  const [loading, setLoading] = useState(false)

  const onSubmit = async(data) => {
   console.log('data', data)

    if(data && !loading){
      setLoading(true);
      try{
        handleRegister(data, () => {
             setLoading(false)
             document.body.style.overflow = "auto"
        })
      } catch(error){
        console.log('error', error)
        setLoading(false)
      }
     }

  }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
         <Input
          label="Your email address"
          required
          {...register('email', {
            required: MESSAGE.required,
            pattern: {
              value: REGEX.email,
              message: MESSAGE.email,
            },
          })}
          error={errors?.email?.message || ""}

         />
           <Input
          label="Your name"
          required
          {...register('name', {
            required: MESSAGE.required,
          
          })}
          error={errors?.name?.message || ""}

         />
          {/* End .form-group */}
        <Input
         label="Your password"
         type = "password"
         required
         {...register('password', {
           required: MESSAGE.required,
          
         })}
         error={errors?.password?.message || ""}

        />
         <Input
          label="Your confirm password"
           type = "password"
          required
          {...register('confirmPassword', {
            required: MESSAGE.required,
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={errors?.confirmPassword?.message || ""}

         />
          {/* End .form-group */}
          <div className="form-footer">
            <button
              type="submit"
              className="btn btn-outline-primary-2"
            >
              <span>SIGN UP</span>
              <i className="icon-long-arrow-right" />
            </button>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="register-policy"
               
                {...register("isAgree", {
                  required : MESSAGE.policy
                } )}

              />
              <label
                className="custom-control-label"
                htmlFor="register-policy"
              >
              
              I agree to the   <a href="privacy-policy.html">privacy policy</a> *
              </label>
              {errors?.isAgree?.message && <p className="form-error">{errors?.isAgree?.message}</p>}
            </div>
            {/* End .custom-checkbox */}
          </div>
          {/* End .form-footer */}
        </form>
        <div className="form-choice">
          <p className="text-center">or sign in with</p>
          <div className="row">
            <div className="col-sm-6">
              <a href="#" className="btn btn-login btn-g">
                <i className="icon-google" />
                Login With Google
              </a>
            </div>
            {/* End .col-6 */}
            <div className="col-sm-6">
              <a href="#" className="btn btn-login  btn-f">
                <i className="icon-facebook-f" />
                Login With Facebook
              </a>
            </div>
          </div>
        </div>
      </>
    )
}

export default RegisterForm;