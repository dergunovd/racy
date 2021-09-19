import {useCallback, useState} from 'react';
import {EventUserLocation, LatLng} from 'react-native-maps';
import {LapTotal} from './store.types';
import {isSameCoords, msTokmh} from '../utils/utils';
import {distanceTo} from 'geolocation-utils';

enum RaceState {
  NOT_READY,
  READY,
  RACE,
}

export const useStore = () => {
  const [startPoint, setStartPoint] = useState<LatLng>();
  const [state, setState] = useState<RaceState>(RaceState.NOT_READY);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [curSpeed, setCurSpeed] = useState<number>(0);
  const [lapStartTime, setLapStartTime] = useState<number>();
  const [distance, setDistance] = useState<number>(0);
  const [coords, setCoords] = useState<LatLng>();
  const [path, setPath] = useState<LatLng[]>([]);
  const [laps, setLaps] = useState<LapTotal[]>([]);

  const startLap = useCallback(() => {
    setLapStartTime(Date.now());
  }, []);

  const endLap = useCallback(() => {
    const time = Date.now() - (lapStartTime ?? Date.now());
    const timeInSeconds = time / 1000;
    setLaps([
      ...laps,
      {
        avgSpeed: timeInSeconds > 0 ? msTokmh(distance / timeInSeconds) : 0,
        distance,
        maxSpeed,
        time: Date.now() - (lapStartTime ?? Date.now()),
      },
    ]);
    setLapStartTime(undefined);
  }, [distance, lapStartTime, laps, maxSpeed]);

  const stop = useCallback(() => {
    setPath([]);
    setDistance(0);
    setMaxSpeed(0);
  }, []);

  const update = useCallback(
    (coordinates: EventUserLocation['nativeEvent']['coordinate']) => {
      const prevCoords = path[path.length - 1];
      const isSamePrevCoords = isSameCoords(prevCoords, coordinates);
      const isSameStartCoords = isSameCoords(startPoint, coordinates);
      switch (state) {
        case RaceState.NOT_READY:
          if (isSameStartCoords) {
            setState(RaceState.READY);
          }
          setCoords({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          });
          setCurSpeed(coordinates.speed);
          break;
        case RaceState.READY:
          if (!isSameStartCoords) {
            setState(RaceState.RACE);
            startLap();
          }
          setCoords({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          });
          setCurSpeed(coordinates.speed);
          setPath(
            path.length > 0 && isSamePrevCoords
              ? path
              : [
                  ...path,
                  {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                  },
                ],
          );
          setDistance(
            !prevCoords || isSamePrevCoords
              ? distance
              : distance + distanceTo(prevCoords, coordinates),
          );
          break;
        case RaceState.RACE:
          if (isSameStartCoords) {
            setState(RaceState.READY);
            endLap();
          }
          setCoords({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          });
          setCurSpeed(coordinates.speed);
          setMaxSpeed(Math.max(maxSpeed ?? 0, coordinates.speed ?? 0));
          setPath(
            path.length > 0 && isSamePrevCoords
              ? path
              : [
                  ...path,
                  {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                  },
                ],
          );
          setDistance(
            !prevCoords || isSamePrevCoords
              ? distance
              : distance + distanceTo(prevCoords, coordinates),
          );
      }
    },
    [distance, endLap, maxSpeed, path, startLap, startPoint, state],
  );

  return {
    startLap,
    endLap,
    stop,
    update,
    startPoint,
    setStartPoint,
    state,
    maxSpeed,
    curSpeed,
    lapStartTime,
    distance,
    coords,
    path,
    laps,
  };
};
