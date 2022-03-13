import { Divider, message, Modal, Radio, Select } from 'antd';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import UrlImageDownloader from 'react-url-image-downloader';
import { UserutilitiesApi } from '../../../Services/Api';

function UtilitiesModelLogin(props) {
    console.log(props)


    return (
        <>
            <div class="col-sm-3 mt-4 " >
                <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                    <div class="card-body">


                        <img class="card-img-top" src={props.image} alt="" style={{ height: '50px' }} />
                        <h5 class="card-title">{props.name}</h5>
                    </div>

                </div>
            </div>

          
        </>

    );
}

export default UtilitiesModelLogin;







