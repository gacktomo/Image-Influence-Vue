<style lang="scss" scoped>
.page-title {
  text-align: center;
}
.body {
  margin-top: 100px;
}
</style>

<template>
  <v-ons-page>
    <navbar></navbar>
  <div class="page-content">
    <p class="page-title"> おにくの画像を点数化します </p>
    <img style="width:100%;" v-show="meatImage" :src="meatImage" />
    <input style="margin-left:20px;" type="file" v-on:change="upload($event.target.files)" accept="image/*" />
    <loading-indicator :is-loading="isLoading"></loading-indicator>
    <br>
    <h2 style="text-align:center;">{{rounded}}</h2>
  </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import Navbar from '../../components/navbar/Navbar';
import Config from '../../config/Config';

export default {
  name: 'posts-page',
  components: {
    LoadingIndicator,
    Navbar,
  },
  data() {
    return {
      config: Config,
      isLoading: false,
      result: {},
      meatImage: '',
    };
  },
  methods: {
    upload(file) {
      const apiURL = 'https://api.a3rt.recruit-tech.co.jp/image_influence/v1/meat_score';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.append('imagefile', file[0]);
      formData.append('apikey', 'pecUAOmUgV8vOCyIAtrMn5OH45fIg15q');
      formData.append('predict', 1);
      this.isLoading = true;
      this.meatImage = window.URL.createObjectURL(file[0]);

      axios.post(apiURL, formData, config)
      .then((res) => {
        this.isLoading = false;
        this.result = res.data.result;
        console.log(res);
      })
      .catch(err => console.log(err));
    },
  },
  computed: {
    rounded() {
      return this.result.score == null ? null : `${Math.round(this.result.score) + 1}/10点`;
    },
  },
};
</script>
