import { useState } from 'react';

import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
 
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

type Incident = {
  name: string;
  title: string;
  value: number;
}

export function Incidents() {
  const { navigate } = useNavigation();

  const [incidents, setIncidents] = useState<Incident[]>([]);

  const [totalIncidents, setTotalIncidents] = useState(0);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading)
      return;

    if (totalIncidents > 0 && incidents.length === totalIncidents)
      return;

    setLoading(true);

    api.get('incidents', {
      params: { page }
    }).then(response => {
      setIncidents([...incidents, ...response.data]);
      setTotalIncidents(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
    });
  }

  useFocusEffect(() => {
    loadIncidents();
  });

  function handleToDetailPage(incident: Incident) {
    navigate('Detail', { incident });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalIncidents} casos.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>

      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        data={incidents}
        style={styles.incidentsContainer}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => handleToDetailPage(incident)}>
              <Text style={styles.buttonText}>
                Ver mais detalhes
                <Feather name="arrow-right" size={17} color="#e02041" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
