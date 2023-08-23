

<template>
  <div>
    <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ja3RhaWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />

    <h1>Cocktail name</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi earum obcaecati, placeat sed incidunt tenetur eius provident nam dolor aspernatur odio omnis molestias delectus, facere cumque ab reprehenderit distinctio laudantium.</p>

    <button class="cs-button--small">
      Ver detalhes 
      <Icon name="ic:baseline-arrow-forward" /> 
    </button>
  </div>  
</template>

<style scoped lang="scss">
  div { 
    height: 370px;
    width: 325px;

    background: var(--violet-3);
    border-radius: 12px;  
    border: 1px solid var(--violet-7);

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    overflow: hidden;
    gap: 8px;

    img { 
      max-width: 100%;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    p { 
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: center;

      margin-bottom: 8px;
    }

    h1 {
      margin-bottom: 8px;
    }
  }
</style>