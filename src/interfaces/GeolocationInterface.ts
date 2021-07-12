/* eslint-disable camelcase */
type AdressComponentsType = {
  long_name: string,
  short_name: string,
  types: string[]
}

type GeometryType = {
  bounds: {
    northeast: {
      lat: string,
      lng: string
    },
    southwest: {
      lat: string,
      lng: string
    }
  },
  location: {
    lat: string,
    lng: string
  },
  location_type: string,
  viewport: {
    northeast: {
      lat: string,
      lng: string
    },
    southwest: {
      lat: string,
      lng: string
    }
  },
}

type GeolocationTypes = {
  address_components : AdressComponentsType[],
  formatted_address : string,
  geometry : GeometryType,
  place_id : string,
  types : string[]
}

export interface GeolocationInterface {
  results: GeolocationTypes[]
}
