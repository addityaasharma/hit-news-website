<!-- Link sharing panel -->
<div 
v-if="isVisible" 
class="mt-2 p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg flex justify-between items-center"
>
<span class="truncate flex-grow">{{ link }}</span>
<button 
  @click="toggleLinkVisibility"
  class="ml-2 p-1 text-gray-500 hover:text-gray-700"
  aria-label="Close link sharing"
>
  <span class="pi pi-times"></span>
</button>
</div>



 this is for icons
<div class="flex gap-3">
    <div
      v-for="icon in newsCardStore.icons"
      :key="icon.name"
      :class="icon.name"
      class="text-xl text-[#ADADAD] hover:text-gray-900 cursor-pointer"
      @click.prevent.stop="toggleLinkVisibility($event)"
    ></div>
  </div>





// Toggle link sharing panel visibility
const toggleLinkVisibility = (event) => {
  // Prevent event propagation to avoid triggering card click
  if (event) {
    event.stopPropagation()
    event.preventDefault()
  }
  isVi