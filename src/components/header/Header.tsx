import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";

import { WeatherData, UserLocation } from "./types";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

// For Toggle Button
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));


function Header() {
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState<UserLocation | object>({});

  const [weatherData, setweatherData] = useState<WeatherData | object>({});
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);

  // Get the User's Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(
            "Error occurred while getting location:",
            error.message
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Get Weather Data
  useEffect(() => {
    setWeatherDataLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        (userLocation as UserLocation).lat
      }&lon=${(userLocation as UserLocation).lon}&appid=${
        import.meta.env.VITE_WEATHERAPI_ID
      }&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        setweatherData({
          temperature: res.main?.temp,
          condition: res.weather[0]?.main,
          icon: res.weather[0]?.icon,
        });
        setWeatherDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setWeatherDataLoading(false);
      });
  }, [(userLocation as UserLocation).lat, (userLocation as UserLocation).lon]);

  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginTop: "1em", marginBottom: "0.5em" }}
      >
        Unify Task
      </Typography>

      <div style={{ position: "absolute", right: "10em" }}>
        <FormGroup>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} />}
            label=""
            onChange={(_, checked) => dispatch(toggleTheme(checked))}
          />
        </FormGroup>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
        }}
      >
        {!weatherDataLoading ? (
          <div
            style={{
              display: "inline-block",
              border: "1px solid #f2f2f1",
              borderRadius: "10px",
              padding: "0.5em",
            }}
          >
            <Typography variant="h6">
              {(weatherData as WeatherData).temperature} °C
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                {(weatherData as WeatherData).condition}
              </Typography>

              <img
                src={`http://openweathermap.org/img/wn/${
                  (weatherData as WeatherData).icon
                }@2x.png`}
                style={{ width: "60px" }}
              />
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
}

export default Header;
