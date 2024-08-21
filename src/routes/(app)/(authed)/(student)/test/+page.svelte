<script>
import {eventStore} from "$lib/stores"; 


</script>

<div>
  
  {#each $eventStore as msg}
      <p>{msg}</p>
  {/each}
  </div>


<style>
</style>
