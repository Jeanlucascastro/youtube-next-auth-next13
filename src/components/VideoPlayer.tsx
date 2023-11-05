"use client"
import YouTube from 'react-youtube';


async function VideoPlayer({ params }: {
    params: { videoId: string, }
}) {

    const videoId = params.videoId

    const opts = {
        height: '620',
        width: '1150',
    };

    return (
        <>
            <YouTube className="video" videoId={videoId} opts={{ ...opts, width: '100%', height: '100%' }} />
        </>
    );
}

export default VideoPlayer;
