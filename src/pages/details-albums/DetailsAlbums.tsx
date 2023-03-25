import {Box, Container} from "@chakra-ui/react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import AudioPlayer from "../../components/audio-player/AudioPlayer";
import BottomPlayer from "../../components/bottom-audio-player/BottomPLayer";
import ExcerptTrackList from "../../components/excerptTrackList/ExcerptTrackList";
import {useAppDispatch, useAppSelector} from "../../hooks/Index";
import {fetchAlbumsDetails} from "./action-creators";
import Footer from "../../components/footer/Footer";

export default function DetailsAlbums() {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {albums} = useAppSelector((state) => state.reducerDetailsAlbums);

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAlbumsDetails(id));
        localStorage.setItem("id-album", JSON.stringify(id));
    }, []);

    const styles = {
        backgroundImage: `url("${albums.image}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: '100% 50%',
        backgroundColor: '#1D1D20'
    };
    return (
        <>
            <section style={styles}>
                <Box style={{backdropFilter:"blur(23.5px)"}}>
                    <Container maxW="1220px" pt="140px">
                        <Box pl={{base: "0", md: "4%", lg: "2%", xl: "1%"}}>
                            <AudioPlayer listTruck={albums.music}/>
                            <ExcerptTrackList tracks={albums.music} allTracks/>
                        </Box>
                        <BottomPlayer/>
                    </Container>
                </Box>
            </section>
            <Footer/>
        </>
    );
}
