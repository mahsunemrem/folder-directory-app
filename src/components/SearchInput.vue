<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Arama yapın"
      aria-label="Search..."
      aria-describedby="basic-addon2"
      v-model="inputValue"
      @input="handleInput"
    />
    <span class="input-group-text" id="basic-addon2">
      <i class="fa-brands fa-searchengin"></i>
    </span>

    <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    <span class="spinner-border spinner-border-sm" aria-hidden="true" v-if="isLoading"></span>
  </div>

  <template>
  <div>
    <!-- Button -->
    <button type="button" class="btn btn-primary" @click="openModal">Popup Aç</button>
    
    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" :aria-labelledby="modalTitle" aria-hidden="true" ref="myModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal içeriği buraya gelecek.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
            <button type="button" class="btn btn-primary">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
</template>


<script>
export default {
  data() {
    return {
      inputValue: "",
      isLoading: false,
    };
  },
  methods: {
    handleInput() {
     
    },
  },
};
</script>

<style>
</style>