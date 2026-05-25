export interface WeatherData {
  current: {
    weather: Array<{ main: string; description: string; icon: string }>;
    main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
    wind: { speed: number; deg: number };
    clouds: { all: number };
    sys: { country: string };
    name: string;
  };
  forecast: {
    list: Array<{
      dt: number;
      dt_txt: string;
      main: { temp: number; humidity: number };
      weather: Array<{ main: string; description: string; icon: string }>;
      wind: { speed: number };
      pop: number;
    }>;
  };
  isMock: boolean;
  lat?: number;
  lon?: number;
}
