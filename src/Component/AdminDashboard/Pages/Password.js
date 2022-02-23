import React, { useState } from 'react';
import { message, Button, Modal } from 'antd';
import '../../Css/Forms.css'
import { useForm } from "react-hook-form";
import { Tag, Divider } from 'antd';
import { UserApi } from "../../../Services/Api";


function Password() {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();

  async function onSubmit(data) {
      const User = JSON.parse(localStorage.getItem('profile'))
        console.log(data)
        console.log(User.Email)
        try {
            const Response = await UserApi.UpdatePassword({...data,Email:User.Email})
            console.log("Response :", Response)
            message.success("Password Updated Successfully")
        } catch (error) {
            console.log("error :", error)
            message.error("Invalid current password")
        }
       
    }
    return (
        <>

         <Divider  > Update Password </Divider>
                    <div className='container-fluid '>
                    <div className='row'>
                    <div className='col-6 mx-auto text-center '>

                      <form onSubmit={handleSubmit(onSubmit)} >
                        <div class="inputbox form-group">
                                <input type="text" required="required" {...register("OldPassword", { required: true })} class="form-control"/>
                                <span>CurrentPassword</span>
                        </div>
                        <div class="inputbox form-group mt-3">
                                <input type="text" required="required"  {...register("NewPassword", { required: true })} class="form-control" />
                                <span>NewPassword</span>
                        </div>
                         <input type="submit" style={buttonstyle} value="Update Password" />
                    </form>
                    </div>
                    </div>
                    </div>
                  
              

        </>
    );
}

export default Password;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "5px 35px",
    borderRadius: '8px',
};