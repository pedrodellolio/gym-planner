import {
  FlatList,
  HStack,
  VStack,
  Pressable,
  Actionsheet,
  useDisclose,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import db from "@react-native-firebase/database";
import { useAuth } from "../../../context/auth";
import { formatDataSnapshot } from "../../../utils/utils";
import { Stack, useRouter } from "expo-router";
import Dictionary from "../../../models/dictionary";
import { Split, Workout } from "../../../models/workout";
import { Text } from "../../../components/themed/Text";
import { FlatListItem } from "../../../components/themed/FlatListItem";
import { useTheme } from "../../../context/theme";
import { Button } from "../../../components/themed/Button";

interface WorkoutData {
  id: string;
  name: string;
  splits: Dictionary<Split>;
}

export default function Playlists() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclose();
  const [playlists, setPlaylists] = useState<Workout[]>([]);
  const [qryLimit, setQryLimit] = useState(20);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>();

  useEffect(() => {
    const refPath = `/users/${user.uid}/workouts`;
    db()
      .ref(refPath)
      .orderByKey()
      .limitToLast(qryLimit)
      .on("value", onWorkoutChange);

    return () => db().ref(refPath).off("value", onWorkoutChange);
  }, [qryLimit]);

  const onWorkoutChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    const dictionary: Dictionary<Workout> = snapshot.val();
    if (dictionary) {
      const values = formatDataSnapshot(dictionary) as Workout[];
      setPlaylists(values);
    } else setPlaylists([]);
  };

  const deleteWorkout = async (id: string) => {
    const refPath = `/users/${user.uid}/workouts/${id}`;
    await db().ref(refPath).remove();
    onClose();
  };

  const showDetails = (id: string) => {
    setSelectedPlaylistId(id);
    onOpen();
  };

  const disableCurrentActiveWorkout = async () => {
    const refPath = `/users/${user.uid}/workouts/`;
    const snapshot = await db()
      .ref(refPath)
      .orderByChild("active")
      .equalTo(true)
      .limitToFirst(1)
      .once("value");

    // const document: any = Object.values(snapshot.val())[0];
    // const activeWorkout: Workout = {
    //   id: document.id,
    //   active: document.active,
    //   name: document.name,
    //   splits:

    // }
    // console.log(document.id);
  };

  const setActiveWorkout = (workout: Workout) => {
    disableCurrentActiveWorkout().then(() => {
      const refPath = `/users/${user.uid}/workouts/${workout.id}`;
      db()
        .ref(refPath)
        .remove()
        .then(() =>
          db()
            .ref(refPath)
            .update({ ...workout, active: true })
        );
    });
  };

  return (
    <View py={5} px={6}>
      {playlists.length > 0 ? (
        <FlatList
          alwaysBounceVertical={true}
          // mt={4}
          data={playlists}
          renderItem={({ item }) => (
            <>
              <FlatListItem
                item={item}
                onPress={() => router.push(`/playlists/${item.id}`)}
                onLongPress={() => showDetails(item.id)}
              />
              {/* <Button
                onPress={() => setActiveWorkout(item)}
                title="Active"
                variant={"solid"}
              /> */}
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Nothing to see here!</Text>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor={theme.background[500]}>
          {/* <Actionsheet.Item onPress={() => router.push("")}>Edit</Actionsheet.Item> */}
          <Actionsheet.Item
            bgColor={theme.background[500]}
            onPress={() => deleteWorkout(selectedPlaylistId)}
          >
            Delete
          </Actionsheet.Item>
          <Actionsheet.Item
            bgColor={theme.background[500]}
            color={theme.text}
            onPress={onClose}
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

const styles = StyleSheet.create({});
