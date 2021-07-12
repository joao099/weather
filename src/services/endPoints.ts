export default {
  geocode: {
    url: (lat: string, long: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=AIzaSyCStSyMkXQU-23hS61b4yuwADAHQOCyEKo`,
    apiKey: 'AIzaSyCStSyMkXQU-23hS61b4yuwADAHQOCyEKo'
  },
  openWeather: {
    url: (lat: string, long: string) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&lang=pt_br&units=metric&appid=4965df5842c75ded4d64bee2698f0424`,
    urlImage: (nameImage: string) => `http://openweathermap.org/img/wn/${nameImage}@2x.png`,
    apiKey: '4965df5842c75ded4d64bee2698f0424'
  }
}
