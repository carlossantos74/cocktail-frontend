<script setup lang="ts">
  import { Cocktail, StateType } from '@/common/types/global.types';
  import { VueFinalModal } from 'vue-final-modal'

  const router = useRouter();
  const config = useRuntimeConfig();
  const props = defineProps({
    cocktailId: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['close'])

  const favorites = ref<Cocktail[]>([])
  const cocktail = ref<Cocktail | null>(null)
  const ingredients = ref<string[]>([])
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>('');
  
  const state = computed<StateType | undefined>(() => {
    if(isLoading.value) return StateType.LOADING
    if(error.value) return StateType.ERROR
  })

  const isFavorite = computed<boolean>(() => {
    return favorites.value.some((favorite) => favorite.idDrink === cocktail.value?.idDrink)
  })

  onBeforeMount(() => {
    fetchCocktail()
    fetchFavorites()
  })

  const fetchCocktail = async () => {
    isLoading.value = true

    try {
      const response = await $fetch<{ drinks: Cocktail[] }>(`${config.public.apiBaseUrl}/lookup.php?i=${props.cocktailId}`)

      if (!response || !response.drinks || !response.drinks[0]) {
        throw new Error('Cocktail not found')
      }

      cocktail.value = response.drinks[0]

      router.replace({ query: { 
        cocktail: props.cocktailId,
        category: cocktail.value?.strCategory
      }})

      setCocktailIngredients()
    } catch (e) {
      console.error(e)
      error.value = 'An error has occurred when fetching cocktail. Try again later.'
    } finally { 
      isLoading.value = false
    }
  }

  const fetchFavorites = () => { 
    const favoritesList = localStorage.getItem('favorites');

    if(!favoritesList) return;

    favorites.value = JSON.parse(favoritesList);
  }

  const addToFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify([...favorites.value, cocktail.value]));
    fetchFavorites();
  }

  const removeFromFavorites = () => { 
    const newFavorites = favorites.value.filter((favorite) => favorite.idDrink !== cocktail.value?.idDrink);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    fetchFavorites()
  }

  const toggleFavorite = () => { 
    isFavorite.value ? removeFromFavorites() : addToFavorites();
  }

  const setCocktailIngredients = () => { 
    if(!cocktail.value) return;

    Object.keys(cocktail.value).forEach((key) => { 
      if(!key.includes('strIngredient')) return;

      const ingredient = cocktail.value?.[key as keyof Cocktail]

      ingredient && ingredients.value.push(ingredient)
    })
  }

  const closeModal = () => { 
    router.replace({ query: { 
      category: cocktail.value?.strCategory
    }})

    emit('close')
  }
</script>

<template>
  <VueFinalModal class="modal" content-class="modal__content">     
      <div class="cocktail-modal">
        <div class="state" v-if="isLoading || error">
          <State 
            :type="state" 
            message="An error has occurred when fetching cocktail. Try again later." 
          />
        </div>
        <template v-else>
          <img :src="cocktail?.strDrinkThumb" :alt="cocktail?.strDrink">
          <header>
            <span>
              <h2>
              {{ cocktail?.strDrink }} 
              <button class="fav-button" @click="toggleFavorite">
                <Icon :name="isFavorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'" /> 
              </button>
              </h2>
            </span>
            <p>{{ cocktail?.strAlcoholic }}</p>
          </header>
          <section>
            <h3>
              Instructions
            </h3>
            <p>{{ cocktail?.strInstructions  }}</p>
          </section>
          <section>
            <h3>
              Ingredients
            </h3>
            <p>{{ ingredients.join(", ") }}</p>
          </section>
        </template>

        <footer>
          <button class="cs-button--small" @click="closeModal">
            Close
          </button>
        </footer>
      </div>
  </VueFinalModal>
</template>

<style lang="scss">
  .modal__content, .state { 
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cocktail-modal { 
    background: var(--gray-3);
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.20);
    padding: 24px;

    width: 100%;
    max-width: 600px;
    min-height: 400px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    img { 
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }

    h2 { 
      margin-bottom: 6px;
    }

    h3 { 
      margin-bottom: 4px;
    }

    .state { 
      flex: 1 0
    }

    button.fav-button { 
      display: inline-block;
      background: none;
      border: none;

      cursor: pointer;
      font-size: 24px;
      color: var(--violet-12);

      transition: color 200ms;

      &:hover { 
        color: var(--violet-10);
      }

      &:focus { 
        color: var(--violet-9);
        outline: none;
      }
    }
  }
</style>