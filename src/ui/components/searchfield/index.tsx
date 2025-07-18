import { Alert, FlatList, Modal, View, ActivityIndicator } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { TextComponent } from "../text";
import { SearchfieldProps } from "./@types";
import * as Styles from "./styles";
import { ButtonComponent } from "../button";
import { EnumButtonVariant } from "../button/@types";
import { TextInputComponent } from "../textInput";

export function Searchfield<T>({
  IsOpen,
  OnList,
  OnSelect,
  OnClose,
  RenderItem,
  Title,
}: SearchfieldProps<T>) {
  const [itens, setItens] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const LIMIT = 20;

  const fetchItens = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const currentPage = reset ? 1 : page;
        const result = await OnList(currentPage, LIMIT, search);
        if (result.Success) {
          const data = result.Content || [];
          if (reset) {
            setItens(data);
            setPage(2);
          } else {
            setItens((prev) => [...prev, ...data]);
            setPage((prev) => prev + 1);
          }
          setHasMore(data.length === LIMIT);
        } else {
          Alert.alert("Erro", result.Message || "Erro ao buscar itens");
        }
      } finally {
        setLoading(false);
        if (refreshing) setRefreshing(false);
      }
    },
    [OnList, LIMIT, loading, page, refreshing, search]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchItens(true);
  }, [fetchItens]);

  useEffect(() => {
    if (IsOpen) {
      setItens([]);
      setPage(1);
      setHasMore(true);
      setSearch("");
      setInput("");
      fetchItens(true);
    }
  }, [IsOpen]);

  const onEndReached = () => {
    if (!loading && hasMore) {
      fetchItens();
    }
  };

  const onSearch = async () => {
    setItens([]);
    setPage(1);
    setHasMore(true);
    setSearch(input);
    setLoading(true);
    try {
      const result = await OnList(1, LIMIT, input);
      if (result.Success) {
        setItens(result.Content || []);
        setPage(2);
        setHasMore((result.Content || []).length === LIMIT);
      } else {
        Alert.alert("Erro", result.Message || "Erro ao buscar itens");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: T) => {
    OnSelect(item);
    handleClose();
  };

  const handleClose = () => {
    OnClose();
  };

  return (
    <Modal visible={IsOpen}>
      <Styles.Background>
        <Styles.Container>
          <Styles.Header>
            <TextComponent text={Title} textAlign="start" />
            <ButtonComponent
              onPress={handleClose}
              variant={EnumButtonVariant.Transparent}
              icon="close"
              iconColor="red"
              iconSize={18}
            />
          </Styles.Header>

          <Styles.RowWrapper>
            <TextInputComponent
              placeholder="Pesquisar"
              width="100%"
              style={{ flex: 1 }}
              value={input}
              onChangeText={setInput}
            />
            <ButtonComponent
              onPress={onSearch}
              variant={EnumButtonVariant.Transparent}
              icon="search"
              iconFamily="Feather"
              iconSize={18}
            />
          </Styles.RowWrapper>

          <FlatList
            data={itens}
            renderItem={({ item }) =>
              RenderItem ? (
                <Styles.PlantButton onPress={() => handleSelect(item)}>
                  {RenderItem(item)}
                </Styles.PlantButton>
              ) : null
            }
            keyExtractor={(_, idx) => String(idx)}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              loading && !refreshing ? (
                <ActivityIndicator style={{ margin: 16 }} />
              ) : null
            }
          />
        </Styles.Container>
      </Styles.Background>
    </Modal>
  );
}
