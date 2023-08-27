<script lang="ts" setup>
  import { useModal } from 'vue-final-modal'

  import { Cocktail, StateType } from '@/common/types/global.types';
  import CocktailModal from '@/components/CocktailModal.vue'


  const config = useRuntimeConfig()
  const router = useRouter();
  const { open, close } = useModal({
    component: CocktailModal,
    attrs: {
      cocktailId: router.currentRoute.value.query.cocktail as string,
      onClose: () => close()
    },
  })

  /** State */
  const categories = ref<string[]>([])
  const currentCategory = ref<string | null>(null);
  const cocktailName = ref<string | null>(null);
  const cocktails = ref<Array<Cocktail> | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>('');
  const hasSearchHappened = ref<boolean>(false);
  
  /** Computed properties */
  const isEmpty = computed<boolean>(() => !cocktails.value?.length)
  const state = computed<StateType | undefined>(() => {
    if(isLoading.value) return StateType.LOADING
    if(error.value) return StateType.ERROR
    if(isEmpty.value) return StateType.EMPTY
  })
  
  const stateMessage = computed<string>(() => { 
    if(error.value) return error.value

    return hasSearchHappened.value ? 'No cocktails found in these search' : 'Select a category and click on search';
  })

  /** Lifecycle hooks  */
  onBeforeMount(() => fetchCocktailsCategories())
  onMounted(() => {
    const { category, cocktail, cocktail_name } = router.currentRoute.value.query;
    
    if(category) {
      currentCategory.value = category as string;
      fetchCocktailsByCategory();
    }

    if(cocktail_name) { 
      cocktailName.value = cocktail_name as string;
      fetchCocktailByName();
    }

    if(cocktail) { 
      open();
    }
  })

  /** Methods */
  const fetchCocktailsCategories = async () => {
    try {
      const response = await $fetch<{ drinks: Partial<Cocktail>[] }>(`${config.public.apiBaseUrl}/list.php?c=list`)
    
      if(!response || !response.drinks) {
        throw new Error('No drinks found')
      }

      categories.value = response.drinks.map((drink) => drink.strCategory as string)
    } catch (e) {
     error.value = 'An error has occurred when fetching cocktails categories. Try again later.'
    }
  }

  const onSelectChange = (data: string): void => {
    currentCategory.value = data

    fetchCocktailsByCategory()
  }
  
  const fetchCocktailsByCategory = async (): Promise<void> => {
    if(!currentCategory.value) return;

    cocktails.value = [];
    hasSearchHappened.value = true;
    isLoading.value = true;
    router.replace({ query: { category: currentCategory.value }})

    try {
      const response = await $fetch<{ drinks: Cocktail[] }>(`${config.public.apiBaseUrl}/filter.php?c=${currentCategory.value}`);

      if(!response || !response.drinks) {
        // if don't have drinks, should clean the list
        cocktails.value = []
      }

      cocktails.value = response.drinks;
    } catch (e) {
      error.value = error.value = 'An error has occurred when fetching cocktails. Try again later.';
    } finally { 
      isLoading.value = false;
    }
  }

  const onTextInputChange = (data: string): void => {
    cocktailName.value = data;
  }

  const fetchCocktailByName = async (): Promise<void> => {
    if(!cocktailName.value || !cocktailName.value.trim()) return;

    cocktails.value = [];
    hasSearchHappened.value = true;
    isLoading.value = true;
    router.replace({ query: { cocktail_name: cocktailName.value }})

    try {
      const response = await $fetch<{ drinks: Cocktail[] }>(`${config.public.apiBaseUrl}/search.php?s=${cocktailName.value}`);

      if(!response || !response.drinks) {
        // if don't have drinks, should clean the list
        cocktails.value = []
      }

      cocktails.value = response.drinks;
    } catch (e) {
     error.value = error.value = 'An error has occurred when fetching cocktails. Try again later.';
    } finally { 
      isLoading.value = false;
    }
  }
</script>

<template>  
  <section class="search-container">
    <Select :options="categories" @change="onSelectChange"/> 

    <div class="search-by-term">
      <TextInput @change="onTextInputChange" />
      <button class="cs-button" @click="fetchCocktailByName" :disabled="!cocktailName?.trim()">
        Search <Icon name="material-symbols:search" />
      </button>
    </div>
  </section>
  <State 
      v-if="isEmpty || isLoading || error" 
      :type="state"
      :message="stateMessage"
    /> 
  <section v-else>
    <CocktailCard 
      v-for="(cocktail) in cocktails" 
      :cocktail="cocktail" 
      :key="cocktail.idDrink" 
    /> 
  </section>
</template>


<style lang="scss" scoped>
  section.search-container { 
    width: 100%;
    background-color: var(--violet-5);

    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.20);

    &, div.search-by-term { 
      display: flex;
      align-items: flex-end;
      gap: 12px;
    }
  }
  
  section { 
    height: 100%;
    overflow: auto;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-auto-rows: 100px;
    justify-items: center;
    gap: 12px;
    
    padding: 24px;
  }
</style>