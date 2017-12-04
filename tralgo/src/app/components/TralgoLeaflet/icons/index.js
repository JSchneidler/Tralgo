import L from 'leaflet';

import './style.css';

export const markerIcon = L.divIcon({
    className: 'marker',
    iconSize: [24, 24],
    html: '<div></div>'
});

export const activeMarkerIcon = L.divIcon({
    className: 'marker marker-active',
    iconSize: [24, 24],
    html: '<div></div>'
});

export const startMarkerIcon = L.divIcon({
    className: 'marker marker-end',
    iconSize: [24, 24],
    html: '<div></div>'
});

export const endMarkerIcon = L.divIcon({
    className: 'marker marker-start',
    iconSize: [24, 24],
    html: '<div></div>'
});

export const startAndEndMarkerIcon = L.divIcon({
    className: 'marker marker-start-end',
    iconSize: [24, 24],
    html: `
        <div class="half-circle marker-start"></div>
        <div class="half-circle marker-end"></div>
    `
});