// "use client"
// import React, { useState, useEffect } from 'react';
// import YouTube from 'react-youtube';
import axios from 'axios'
import VideoPlayer from '@/components/VideoPlayer';


async function video({ params }: {
    params: { myId: string, }
}) {

    // const [nomeAula, setNomeAula] = useState('');
    // const [idVideo, setIdVideo] = useState('');

    let setVideoId = ''
    let setNomeAula = ''


    // useEffect(() => {
        const fetchData = async () => {
            const url = "/api/video/2";
            try {
                // const response = await axios.get(url);

                const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6IkNhc3RybyIsImV4cCI6MTY5OTE0OTcxOSwiY29tcGFueSI6Mn0.iLfeX0ZrCkbTvKlOkP_VuCQKKmS62Okh_YzW-D74wuI";

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
                        'Content-Type': 'application/json'
                    }
                });
                
                setNomeAula = response.data.name
                setVideoId = response.data.url
                console.log('response.data', setVideoId)



                
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    // }, []);
    const videoId = 'b8JX94mkwio'

    const opts = {
        height: '620',
        width: '1150',
    };

    const parametros = {
        videoId: setVideoId
    }

    return (
        <>
            <div className="content">
                <div className="video-place">
                    <VideoPlayer params={parametros} />
                    <h1 className="titulo-aula"> {setNomeAula} </h1>
                </div>
                <div className="note-area">
                    <span className="titulo-nota"> Anotações da aula: </span>
                    <textarea className="note" placeholder="Digite uma anotação para aula..."></textarea>
                </div>
            </div>

            <div className="content">
                <div className="note-area">
                    <span className="titulo-nota"> Todos os videos: </span>
                </div>
            </div>
        </>
    );
}

export default video;
