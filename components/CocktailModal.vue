<script setup lang="ts">
  import { Cocktail, StateType } from '@/common/types/global.types';
  import { VueFinalModal } from 'vue-final-modal'

  const config = useRuntimeConfig();
  const props = defineProps({
    cocktailId: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['close'])

  const cocktail = ref<Cocktail | null>(null)
  const ingredients = ref<string[]>([])
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>('');
  
  const state = computed<StateType | undefined>(() => {
    if(isLoading.value) return StateType.LOADING
    if(error.value) return StateType.ERROR
  })

  onBeforeMount(() => fetchCocktail())

  const fetchCocktail = async () => {
    isLoading.value = true

    try {
      const response = await $fetch<{ drinks: Cocktail[] }>(`${config.public.apiBaseUrl}/lookup.php?i=${props.cocktailId}`)

      if (!response || !response.drinks || !response.drinks[0]) {
        throw new Error('Cocktail not found')
      }

      cocktail.value = response.drinks[0]

      setCocktailIngredients()
    } catch (e) {
      console.error(e)
      error.value = 'An error has occurred when fetching cocktail. Try again later.'
    } finally { 
      isLoading.value = false
    }
  }

  const setCocktailIngredients = () => { 
    if(!cocktail.value) return;

    Object.keys(cocktail.value).forEach((key) => { 
      if(!key.includes('strIngredient')) return;

      const ingredient = cocktail.value?.[key as keyof Cocktail]

      ingredient && ingredients.value.push(ingredient)
    })
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
            <h2>
              {{ cocktail?.strDrink }}
            </h2>
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
          <button class="cs-button--small" @click="emit('close')">
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
  }
</style>