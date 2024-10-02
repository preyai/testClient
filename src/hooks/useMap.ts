import useModal from "@/hooks/useModal";
import Map, {Marker} from "@/components/Map.vue";


const useMap = () => {

    const {openModal} = useModal()

    const showModal = (markers: Marker[]) => {
        openModal(Map, {markers: markers})
    }

    return {showModal}
}

export default useMap;