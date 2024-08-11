import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ComponentLoading from "../ComponentLoading";
import { MESSAGE, REGEX } from "@/constant/validate";
import { useAuthenContext } from "@/contexts/AuthenContext";

const LoginForm = () => {
  
  const { handleLogin} = useAuthenContext()
  const [loading , setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState : {errors},
  } = useForm();


  const onSubmit = async (data) => {
    
         if(data && !loading){
          setLoading(true);
          try{
            handleLogin(data, () => {
              setTimeout(() => {
                setLoading(false)
                  document.body.style.overflow = "auto"
              },300)
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
        label="Username or email address"
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
          label="Password"
          type="password"
          required
          {...register("password", {
            required: MESSAGE.required,
            
          })}
          error={errors?.password?.message || ""}
        />
        <div className="form-footer">
          <button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="signin-remember"
            />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div>
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>
        <div className="form-choice">
          <p className="text-center">or sign in with</p>
          <div className="row">
            <div className="col-sm-6">
              <a href="#" className="btn btn-login btn-g">
                <i className="icon-google" />
                Login With Google
              </a>
            </div>
            <div className="col-sm-6">
              <a href="#" className="btn btn-login btn-f">
                <i className="icon-facebook-f" />
                Login With Facebook
              </a>
            </div>
          </div>
        </div>
      </form>
      {loading && <ComponentLoading />} {/* Show loading indicator if needed */}
    </>
    )
}

export default LoginForm;