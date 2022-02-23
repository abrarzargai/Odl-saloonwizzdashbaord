import React from 'react';
import { RightOutlined } from '@ant-design/icons';
var imgurl1 ='https://media.istockphoto.com/vectors/document-with-alert-or-error-notification-bubble-vector-id1192449401?k=20&m=1192449401&s=612x612&w=0&h=eG076te_eO6mmpQ_uPxfl-ORKqQ7p5HxKi-bHrS3hpQ='
var imgurl2 ='https://image.freepik.com/free-vector/online-art-tutorial-concept-distance-study-art-class-people-learning-draw-digital-program-online-vector-illustration-cartoon-style_277904-6899.jpg'
var imgurl3 ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvp4upGmcvdq4SOdUHQR2dgBs_Z0r-tHxDS4XKmz1isqsHT_JqbCKgYtNbUB2aX8Vymk&usqp=CAU'

function KnowledgedBase() {
    return (
        <>
            <h2>Knowledged Base</h2>
            <div className='container-fluid'>
                <div className='row'>

                    {/* card */}
                    <div class=" col-xl-4 col-lg-4 col-sm-12 col-xs-6 ">
                        <div class="card">
                            <img class="card-img-top" src={imgurl1} height={180} alt="Card image cap" />
                            <div class="card-body">
                                <a href="#" class="">FAQ
                                
                                    <RightOutlined className='RightOutlined' />
                                    
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div class="col-sm-4 col-xl-4 col-lg-4 col-sm-12 col-xs-6 ">
                        <div class="card">
                            <img class="card-img-top" src={imgurl2} height={180} alt="Card image cap" />
                            <div class="card-body">
                                <a href="#" class="">Articles

                                    <RightOutlined className='RightOutlined' />

                                </a>
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div class="col-sm-4 col-xl-4 col-lg-4 col-sm-12 col-xs-6 ">
                        <div class="card">
                            <img class="card-img-top" src={imgurl3} height={180} alt="Card image cap" />
                            <div class="card-body">
                                <a href="#" class="">Tutorials

                                    <RightOutlined className='RightOutlined' />

                                </a>
                            </div>
                        </div>
                    </div>
                   

                </div>
            </div>
        </>
    );
}

export default KnowledgedBase;
