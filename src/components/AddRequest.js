import React from "react";
import { useForm } from "react-hook-form";



export default function AddRequest() {
//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm();
//     const onSubmit = (data) => console.log(data);
  
//     return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input {...register("firstName")} /> {/* register an input */}
//         <input {...register("lastName", { required: true })} />
//         {errors.lastName && <p>Last name is required.</p>}
//         <input {...register("age", { pattern: /\d+/ })} />
//         {errors.age && <p>Please enter number for age.</p>}
//         <input type="submit" />
//       </form>
//     );
//   }




    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />
        
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit" />
      </form>
    );
  }
