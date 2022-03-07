import { Divider, message } from 'antd';
import { useForm } from "react-hook-form";
import { UserApi } from "../../../Services/Api";
import '../../Css/Forms.css';


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

         <Divider style={{color: '#9e1068' }} > Update Password </Divider>
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
                         <input type="submit" className='addButton' value="Update Password" />
                    </form>
                    </div>
                    </div>
                    </div>
                  
              

        </>
    );
}

export default Password;

