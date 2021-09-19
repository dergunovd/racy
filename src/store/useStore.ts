import {useCallback, useState} from 'react';
import {EventUserLocation, LatLng} from 'react-native-maps';
import {LapTotal} from './store.types';
import {isSameCoords, msTokmh} from '../utils/utils';
import {distanceTo} from 'geolocation-utils';

enum RaceState {
  START,
  RACE,
}

export const useStore = () => {
  const [startPoint, setStartPoint] = useState<LatLng>();
  const [state, setState] = useState<RaceState>(RaceState.START);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [curSpeed, setCurSpeed] = useState<number>(0);
  const [lapStartTime, setLapStartTime] = useState<number>();
  const [distance, setDistance] = useState<number>(0);
  const [coords, setCoords] = useState<LatLng>();
  const [prevCoords, setPrevCoords] = useState<LatLng>();
  const [path, setPath] = useState<LatLng[]>([]);
  const [laps, setLaps] = useState<LapTotal[]>([]);
  const [isStart, setStart] = useState<boolean>(false);

  const startLap = useCallback(() => {
    setLapStartTime(Date.now());
    setPath([]);
    setDistance(0);
    setMaxSpeed(0);
  }, []);

  const endLap = useCallback(() => {
    if (!lapStartTime) {
      return;
    }
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
      setPrevCoords(coords);
      setCoords({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
      setCurSpeed(msTokmh(coordinates.speed));

      if (startPoint && prevCoords) {
        const isSamePrevCoords = isSameCoords(
          prevCoords,
          coordinates,
          coordinates.accuracy,
        );
        const distanceToPrevCoords = distanceTo(prevCoords, coordinates);
        const isSameStartCoords = isSameCoords(
          startPoint,
          coordinates,
          distanceToPrevCoords + coordinates.accuracy,
        );

        switch (state) {
          case RaceState.START:
            setStart(isSameStartCoords);
            if (isSameStartCoords) {
              setState(RaceState.RACE);
            }
            break;
          case RaceState.RACE:
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
                : distance + distanceToPrevCoords,
            );

            if (isSameStartCoords) {
              endLap();
            } else if (isStart) {
              startLap();
            }
            setStart(isSameStartCoords);
        }
      }
    },
    [
      coords,
      distance,
      endLap,
      isStart,
      maxSpeed,
      path,
      prevCoords,
      startLap,
      startPoint,
      state,
    ],
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
