import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAplicEnvironments } from "../../../../../application/environments/factory";
import { getAplicPlants } from "../../../../../application/plants/factory";

import { Environments } from "../../../../../infra/database/entities/Environments";
import { ButtonComponent } from "../../../../components/button";
import { TextComponent } from "../../../../components/text";
import { EnumTextVariant } from "../../../../components/text/@types";
import { EnumButtonVariant } from "../../../../components/button/@types";
import * as Styles from "./styles";
import { Plants } from "../../../../../infra/database/entities/Plants";
import { GetImagePickerImplementation } from "../../../../../infra/implementations/imagePicker/factory";
import { ImagePickMethod } from "../../../../../infra/implementations/imagePicker/IImagePicker";
import { useRoute } from "@react-navigation/native";
import { lightTheme } from "../../../../themes/lightTheme";

interface ICreatePlantForm {
  name: string;
  about: string;
  environments: Environments[];
  imageUri: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Informe o nome da planta"),
  about: Yup.string().required("Informe a descrição"),
  environments: Yup.array().of(Yup.object()).min(1, "Selecione pelo menos um ambiente"),
  imageUri: Yup.string().required("A imagem da planta é obrigatória"),
});

type RouteParams = {
  plantId?: number;
};

export function PlantCreate() {
  const navigation = useNavigation();

  const aplicPlants = getAplicPlants();
  const aplicEnvironments = getAplicEnvironments();
  const imagePickerImplementation = GetImagePickerImplementation();

  const route = useRoute();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ICreatePlantForm>({
    resolver: yupResolver(schema),
  });

  const watchedFields = watch();

  const [environments, setEnvironments] = useState<Environments[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPlant();
    getEnvironments();
  }, []);

  async function getPlant() {
    setIsLoading(true);
    const params = route.params as RouteParams;

    if (params?.plantId) {
      const { plantId } = params;

      const res = await aplicPlants.get({
        relations: ["environments"],
        where: {
          id: plantId
        }
      });

      if (!res.Success) {
        return Alert.alert("Erro", res.Message);
      }

      const plant = res.Content[0];

      setValue("name", plant.name);
      setValue("about", plant.about);
      setValue("environments", plant.environments);
      setValue("imageUri", plant.imageUri || "");
    }

    setIsLoading(false);
  }

  async function getEnvironments() {
    try {
      const res = await aplicEnvironments.get();
      if (!res.Success) return Alert.alert("Erro", res.Message);
      setEnvironments(res.Content);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  function handleSelectEnvironment(env: Environments) {
    try {
      const environmentsSelected = watch("environments") as Environments[] || [];

      if (environmentsSelected?.some((e) => e.id === env.id)) {
        setValue("environments", environmentsSelected?.filter((e) => e.id !== env.id));
      } else {
        setValue("environments", [...environmentsSelected, env]);
      }

    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  }

  function handlePickImage() {
    Alert.alert(
      "Selecionar imagem",
      "Escolha uma opção:",
      [
        {
          text: "Câmera",
          onPress: async () => {
            const res = await imagePickerImplementation.pickImage(ImagePickMethod.CAMERA);

            if (!res.Success) {
              return Alert.alert("Atenção!", res.Message);
            }

            setValue("imageUri", res.Content);
          },
        },
        {
          text: "Galeria",
          onPress: async () => {
            const res = await imagePickerImplementation.pickImage(ImagePickMethod.GALLERY);

            if (!res.Success) {
              return Alert.alert("Atenção!", res.Message);
            }

            setValue("imageUri", res.Content);
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  async function onSubmit(values: ICreatePlantForm) {
    try {
      const params = route.params as RouteParams;

      const plant = new Plants();

      plant.name = values.name
      plant.about = values.about
      plant.environments = values.environments as Environments[]
      plant.imageUri = values.imageUri

      if (params?.plantId) {
        plant.id = params.plantId;
      }

      const res = await aplicPlants.save(plant);

      if (!res.Success) {
        return Alert.alert("Erro ao salvar", res.Message);
      }

      Alert.alert("Sucesso", "Planta salva com sucesso!");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  const getProgress = () => {
    let progress = 0;
    if (watchedFields.name && watchedFields.name.trim()) progress += 25;
    if (watchedFields.about && watchedFields.about.trim()) progress += 25;
    if (watchedFields.imageUri && watchedFields.imageUri.trim()) progress += 25;
    if (watchedFields.environments?.length > 0) progress += 25;
    return progress;
  };

  return (
    <Styles.Container>
      {isLoading && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
          <ActivityIndicator size="large" color={lightTheme.colors.primary} />
        </View>
      )}

      <Styles.Header>
        <Styles.TitleSection>
          <Styles.IconContainer>
            <TextComponent text="🌱" variant={EnumTextVariant.Heading} />
          </Styles.IconContainer>
          <TextComponent text="Nova Planta" variant={EnumTextVariant.Heading} />
          <Styles.Subtitle>
            Adicione uma nova planta ao seu jardim virtual
          </Styles.Subtitle>
        </Styles.TitleSection>

        <Styles.ProgressBar>
          <Styles.ProgressFill progress={getProgress()} />
        </Styles.ProgressBar>
      </Styles.Header>

      <Styles.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Styles.FloatingCard>
          <Styles.Formulario>

            <Styles.InputGroup>
              <Styles.Label>
                <TextComponent text="Nome da planta" variant={EnumTextVariant.Paragraph} />
              </Styles.Label>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Styles.Input
                    placeholder="Digite o nome da planta"
                    value={value}
                    onChangeText={onChange}
                    hasError={!!errors.name}
                  />
                )}
              />
              {errors.name?.message && (
                <Styles.ErrorText>{errors.name.message}</Styles.ErrorText>
              )}
            </Styles.InputGroup>

            {/* Descrição */}
            <Styles.InputGroup>
              <Styles.Label>
                <TextComponent text="Descrição" variant={EnumTextVariant.Paragraph} />
              </Styles.Label>
              <Controller
                name="about"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Styles.TextArea
                    placeholder="Descreva sua planta, cuidados especiais, características..."
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    hasError={!!errors.about}
                  />
                )}
              />
              {errors.about?.message && (
                <Styles.ErrorText>{errors.about.message}</Styles.ErrorText>
              )}
            </Styles.InputGroup>

            {/* Ambiente */}
            <Styles.InputGroup>
              <Styles.SectionTitle>
                <TextComponent text="Ambientes ideais" variant={EnumTextVariant.Paragraph} />
              </Styles.SectionTitle>
              <Styles.EnvironmentGrid>
                {environments.map((env) => (
                  <ButtonComponent
                    key={env.id}
                    text={env.name}
                    onPress={() => handleSelectEnvironment(env)}
                    variant={watch("environments")?.some((e: Environments) => e.id === env.id) ? EnumButtonVariant.Primary : EnumButtonVariant.Secondary}
                    padding="12px 16px"
                    height="44px"
                    buttonStyle={{
                      marginRight: 8,
                      marginBottom: 8,
                      borderRadius: 22,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  />
                ))}
              </Styles.EnvironmentGrid>
              {watchedFields.environments?.length > 0 && (
                <Styles.Label>
                  <TextComponent
                    text={`${watchedFields.environments?.length} ambiente(s) selecionado(s)`}
                    variant={EnumTextVariant.Paragraph}
                    color="#4CAF50"
                  />
                </Styles.Label>
              )}
              {errors.environments?.message && (
                <Styles.ErrorText>{errors.environments.message}</Styles.ErrorText>
              )}
            </Styles.InputGroup>

            {/* Seleção de Imagem */}
            <Styles.InputGroup>
              <Styles.SectionTitle>
                <TextComponent text="Foto da planta" variant={EnumTextVariant.Paragraph} />
              </Styles.SectionTitle>

              <Styles.ImagePickerButton onPress={handlePickImage}>
                <TextComponent text="📷" variant={EnumTextVariant.Paragraph} />
                <Styles.ImagePickerText>
                  {watch("imageUri") ? "Alterar foto" : "Adicionar foto (opcional)"}
                </Styles.ImagePickerText>
              </Styles.ImagePickerButton>

              {
                errors.imageUri?.message && (
                  <Styles.ErrorText>{errors.imageUri.message}</Styles.ErrorText>
                )
              }

              {watch("imageUri") && (
                <Styles.ImagePreview>
                  <Styles.ImagePreviewImage
                    source={{ uri: watch("imageUri") }}
                    resizeMode="cover"
                  />
                </Styles.ImagePreview>
              )}
            </Styles.InputGroup>

          </Styles.Formulario>
        </Styles.FloatingCard>
      </Styles.Content>

      <Styles.Footer>
        <ButtonComponent
          onPress={handleSubmit(onSubmit)}
          text="Salvar planta"
          variant={EnumButtonVariant.Primary}
          buttonStyle={{
            borderRadius: 16,
            height: 56,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
        />
      </Styles.Footer>
    </Styles.Container>
  );
}