<script>

export default {
  name: 'FileUploadComponent',
  methods: {
    onUpload(event) {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
      // Log the entire event object to the console
      console.log(event);
      // Adjust this line according to your server's response structure
      let imageUrl = event.files[0].response.url;
      this.$emit('image-uploaded', imageUrl);
    }
  }
}
</script>

<template>
  <div class="card flex justify-content-center">
    <Toast />
    <pv-fileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" class="custom-file-upload">
      <span class="pi pi-cloud-upload"></span>
      <span>Upload</span>
    </pv-fileUpload>
  </div>
</template>

<style scoped>
.card {
  width: 80%;
  height: 30vh;
  padding: 20px;
  background-color: #D9D9D9;
  border-radius: 12px;
  border: 1px solid #ced4da;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
}

</style>

