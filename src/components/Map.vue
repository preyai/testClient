<script setup lang="ts">
import L from "leaflet";
import {onMounted, onUnmounted, ref} from "vue";
import {IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, modalController} from "@ionic/vue";
import {LIcon, LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {LMarkerClusterGroup} from 'vue-leaflet-markercluster'
import {LatLngBoundsExpression, Map, Point, PointExpression} from "leaflet";
import "leaflet/dist/leaflet.css"


export interface Marker {
  lat: number;
  lon: number;
  label?: string;
  handler?: () => void;
}

const {markers} = defineProps<{ markers?: Marker[] }>()

const zoom = ref(10);
const map = ref<Map | null>(null);
const TILE_SERVER = 'https://tile.lanta.me/osm/{z}/{x}/{y}.png';
const CRS = 'EPSG3857';

const getCenter = (): PointExpression => {
  if (!markers)
    return [0,0];
  const length = markers.length;
  const sum = markers.reduce(
      (prev, marker) => [
        Number(marker.lat) + prev[0],
        Number(marker.lon) + prev[1],
      ],
      [0, 0]
  );
  return [sum[0] / length, sum[1] / length];
};

const cancel = () => modalController.dismiss(null, 'cancel');

onMounted(() => {
  globalThis.L = L;
})

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">{{ $t('base.close') }}</IonButton>
      </IonButtons>
      <IonTitle>map</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <LMap
        ref="map"
        v-model:zoom="zoom"
        :center="getCenter()"
        :useGlobalLeaflet="true"
        :options="{ attributionControl: false }"
        :crs="CRS"
        style="z-index: 10"
    >
      <LTileLayer :url="TILE_SERVER"/>
      <LMarkerClusterGroup :showCoverageOnHover="false">
        <LMarker
            v-for="(marker,index) in markers"
            :key="index"
            :latLng="[Number(marker.lat), Number(marker.lon)]"
            :name="marker.label"
            @click="marker.handler"
        />
      </LMarkerClusterGroup>
    </LMap>

  </IonContent>
</template>

<style scoped>

</style>