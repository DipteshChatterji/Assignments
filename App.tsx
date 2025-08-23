import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ColorModeProvider } from './appModule/component/ColorModeContext';
import MusicCarousel from './appModule/component/MusicCarousel';
import TodoListScreen from './appModule/screens/TodoListScreen';
import '@/global.css';
import { musicSampleAlbums } from './appModule/constants/MusicSampleData';
import { styles } from './appModule/styles/mainComponentStyle';
import { ArrowLeftIcon, Icon, Pressable } from './components/ui';

export default function App() {
  const [selectedAssignment, setSelectedAssignment] = useState<
    'music' | 'todo' | null
  >(null);

  return (
    <ColorModeProvider>
      <OverlayProvider>
        <GluestackUIProvider mode="light">
          <View style={styles.container}>
            <Pressable style={{ flex: 0.1, paddingLeft: 20, flexDirection:'row', }} onPress={() => setSelectedAssignment(null)}>
              <Icon as={ArrowLeftIcon} size='xl' />
              <Text style={{marginLeft: 8}}>Back</Text>
            </Pressable>
            {selectedAssignment === null && (
              <View style={styles.buttonContainer}>
                <Button
                  title="Show Music Assignment"
                  onPress={() => setSelectedAssignment('music')}
                />
                <Button
                  title="Show Todo Assignment"
                  onPress={() => setSelectedAssignment('todo')}
                />
              </View>
            )}

            {selectedAssignment === 'music' && (
              <MusicCarousel albums={musicSampleAlbums} />
            )}
            {selectedAssignment === 'todo' && <TodoListScreen />}
          </View>
        </GluestackUIProvider>
      </OverlayProvider>
    </ColorModeProvider>
  );
}


